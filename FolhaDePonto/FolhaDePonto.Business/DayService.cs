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

        public DayInfo GetDayInfo(DateTime day, int userId)
        {
            IEnumerable<Dia> diasDoMes = _uow.Dias.Get(d => d.Mes == day.Month && d.Ano == day.Year && d.Usuario.Id == userId);
            Dia dia = diasDoMes.FirstOrDefault(d => d.DiaDoMes == day.Day);

            //if (dia == null) {
            //    return null;
            //}

            DayInfo dayInfo = new DayInfo();

            if (dia != null)
            {
                dayInfo.InicioAlmoco = dia.InicioAlmoco;
                dayInfo.FimAlmoco = dia.FimAlmoco;
                dayInfo.FimExpediente = dia.FimExpediente;
                dayInfo.InicioExpediente = dia.InicioExpediente;
                dayInfo.Tipo = dia.Tipo;
            }

            IEnumerable<Dia> diasValidos = diasDoMes.Where(d => d.DiaDoMes < day.Day
                                                                  && d.FimAlmoco.HasValue
                                                                  && d.FimExpediente.HasValue
                                                                  && d.InicioAlmoco.HasValue);

            dayInfo.DiasAindaSemInformacao = (day.Day - 1) - diasValidos.Count();

            IEnumerable<TimeSpan> totalHorasExtras = diasValidos
                                                        .Where(d => d.Tipo == TipoDia.UTIL)
                                                        .Select(d => 
                                                            (d.FimExpediente.Value - d.InicioExpediente) 
                                                            - (d.FimAlmoco.Value - dia.InicioAlmoco.Value) 
                                                            - new TimeSpan(8, 0, 0)
                                                        );

            dayInfo.SaldoDeHorasDoMes = new TimeSpan(totalHorasExtras.Sum(d => d.Ticks));

            //TODO estatísticas

            return dayInfo;
        }
    }
}
