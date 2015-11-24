using FolhaDePonto.Business.Base;
using FolhaDePonto.Domain.DBModels;
using FolhaDePonto.Domain.Models;
using FolhaDePonto.Repository.Base;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FolhaDePonto.Business
{
    public class DayService : BaseService
    {
        public DayService(IUnitOfWork uow) : base(uow)
        {
        }

        public IEnumerable<Dia> GetDaysFromMonthAndUser(int year, int month, int userId)
        {
            return _uow.Dias.GetDaysFromMonthAndUser(year, month, userId);
        }


        public DayInfo GetDayInfo(DateTime day, int UserId)
        {
            return GetDayInfoFromMonth(day, this.GetDaysFromMonthAndUser(day.Year, day.Month, UserId));
        }


        public DayInfo GetDayInfoFromMonth(DateTime day, IEnumerable<Dia> diasDoMesCorrespondente)
        {
            if (diasDoMesCorrespondente.FirstOrDefault(d => d.Mes != day.Month) != null) return null;

            Dia dia = diasDoMesCorrespondente.FirstOrDefault(d => d.DiaDoMes == day.Day);

            diasDoMesCorrespondente = diasDoMesCorrespondente.OrderBy(d => d.DiaDoMes);

            DayInfo dayInfo = new DayInfo(day.Year, day.Month, day.Day);
            dayInfo.IsWeekend = day.DayOfWeek == DayOfWeek.Saturday || day.DayOfWeek == DayOfWeek.Sunday;
            //try
            //{
            if (dia != null)
            {

                dayInfo.InicioAlmoco = dia.InicioAlmoco;

                dayInfo.FimAlmoco = dia.FimAlmoco;

                dayInfo.FimExpediente = dia.FimExpediente;

                dayInfo.InicioExpediente = dia.InicioExpediente;

                dayInfo.Tipo = dia.Tipo;

                dayInfo.ValidDay = dia.FimAlmoco.HasValue && dia.FimExpediente.HasValue && dia.InicioAlmoco.HasValue;
            }

            IEnumerable<Dia> diasValidos = diasDoMesCorrespondente.Where(d => d.DiaDoMes <= day.Day
                                                                          && d.FimAlmoco.HasValue
                                                                          && d.FimExpediente.HasValue
                                                                          && d.InicioAlmoco.HasValue);

            IEnumerable<Dia> diasValidosOuFinalDeSemana = diasDoMesCorrespondente.Where(d =>
            {
                var diaDaSemana = new DateTime(d.Ano, d.Mes, d.DiaDoMes).DayOfWeek;
                bool retorno = d.DiaDoMes <= day.Day
                        && (d.FimAlmoco.HasValue
                        && d.FimExpediente.HasValue
                        && d.InicioAlmoco.HasValue
                        || diaDaSemana == DayOfWeek.Saturday
                        || diaDaSemana == DayOfWeek.Sunday);
                return retorno;
            });

            int diasValidosOuFinalDeSemanaCount = diasValidosOuFinalDeSemana.Count();

            int ultimoDiaDaSequencia = 0;

            if (diasValidosOuFinalDeSemana.Count() > 1)
            {
                ultimoDiaDaSequencia = diasValidosOuFinalDeSemana.Last().DiaDoMes;
            }

            for (int i = ultimoDiaDaSequencia + 1; i <= DateTime.DaysInMonth(day.Year, day.Month) || i <= day.Day; ++i)
            {
                DateTime diaNaoContabilizado = new DateTime(day.Year, day.Month, i);

                if (diaNaoContabilizado.DayOfWeek == DayOfWeek.Saturday || diaNaoContabilizado.DayOfWeek == DayOfWeek.Sunday)
                {
                    ++diasValidosOuFinalDeSemanaCount;
                }
            }

            dayInfo.DiasAindaSemInformacao = (day.Day) - diasValidosOuFinalDeSemanaCount;

            if (dayInfo.ValidDay)
            {
                dayInfo.SaldoDeHoras = ((dayInfo.FimExpediente.Value - dayInfo.InicioExpediente)
                                                                - (dayInfo.FimAlmoco.Value - dayInfo.InicioAlmoco.Value)
                                                                - new TimeSpan(8, 0, 0)).Value;
            }

            IEnumerable<TimeSpan> totalHorasExtras = diasValidos
                                                        .Where(d => d.Tipo == TipoDia.UTIL || d.Tipo == TipoDia.NA)
                                                        .Select(d =>
                                                            (d.FimExpediente.Value - d.InicioExpediente)
                                                            - (d.FimAlmoco.Value - d.InicioAlmoco.Value)
                                                            - new TimeSpan(8, 0, 0)
                                                        );


            dayInfo.SaldoDeHorasDoMes = new TimeSpan(totalHorasExtras.Sum(d => d.Ticks));

            //}
            //catch { }

            return dayInfo;
        }

        private bool TimeSpanIsValid(TimeSpan timeSpan)
        {
            return timeSpan != null && timeSpan.Ticks > 0;
        }

        private TimeSpan GetOnlyHoursAndMinutes(TimeSpan timeSpan) {
            return new TimeSpan(timeSpan.Hours, timeSpan.Minutes, 0);
        }

        public void EditDay(DateTime day, TimeSpan inicioExpediente, TimeSpan inicioAlmoco, TimeSpan fimAlmoco, TimeSpan fimExpediente, int UserId)
        {
            Dia dia = GetOrCreateDay(day, UserId);

            if (TimeSpanIsValid(inicioExpediente))
            {
                dia.InicioExpediente = GetOnlyHoursAndMinutes(inicioExpediente);
            }

            if (TimeSpanIsValid(inicioAlmoco))
            {
                dia.InicioAlmoco = GetOnlyHoursAndMinutes(inicioAlmoco);
            }

            if (TimeSpanIsValid(fimAlmoco))
            {
                dia.FimAlmoco = GetOnlyHoursAndMinutes(fimAlmoco);
            }

            if (TimeSpanIsValid(fimExpediente))
            {
                dia.FimExpediente = GetOnlyHoursAndMinutes(fimExpediente);
            }

            _uow.Save();
        }

        private Dia GetOrCreateDay(DateTime day, int UserId)
        {
            Dia dia = _uow.Dias.GetDay(day, UserId);

            if (dia != null)
            {
                return dia;
            }

            Usuario usuario = _uow.Usuarios.GetByID(UserId);

            if (usuario != null)
            {
                dia = new Dia
                {
                    Ano = day.Year,
                    DiaDoMes = day.Day,
                    Mes = day.Month,
                    Usuario = usuario,
                    InicioExpediente = DateTime.Now.TimeOfDay
                };

                _uow.Dias.Insert(dia);
                _uow.Save();

                dia = _uow.Dias.GetDay(day, UserId);
            }

            return dia;
        }
    }
}
