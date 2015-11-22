﻿using FolhaDePonto.Business.Base;
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

            DayInfo dayInfo = new DayInfo(day.Year, day.Month, day.Day);

            if (dia != null)
            {
                dayInfo.InicioAlmoco = dia.InicioAlmoco;
                dayInfo.FimAlmoco = dia.FimAlmoco;
                dayInfo.FimExpediente = dia.FimExpediente;
                dayInfo.InicioExpediente = dia.InicioExpediente;
                dayInfo.Tipo = dia.Tipo;

                dayInfo.ValidDay = dia.FimAlmoco.HasValue && dia.FimExpediente.HasValue && dia.InicioAlmoco.HasValue;
            }

            IEnumerable<Dia> diasValidos = diasDoMesCorrespondente.Where(d => d.DiaDoMes < day.Day
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

            return dayInfo;
        }

        public void EditDay(DateTime day, TimeSpan inicioExpediente, TimeSpan inicioAlmoco, TimeSpan fimAlmoco, TimeSpan fimExpediente, int UserId)
        {
            Dia dia = GetOrCreateDay(day, UserId);

            dia.InicioExpediente = inicioExpediente;
            dia.InicioAlmoco = inicioAlmoco;
            dia.FimAlmoco = fimAlmoco;
            dia.FimExpediente = fimExpediente;

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
