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
    public class MonthService : BaseService
    {
        private DayService _dayService;

        public MonthService(IUnitOfWork uow, DayService dayService) : base(uow)
        {
            _dayService = dayService;
        }

        public MonthInfo GetMonthInfo(int Year, int Month, int UserId)
        {
            if (Month < 1 || Month > 12) return null;
            IEnumerable<Dia> diasDoMes = _uow.Dias.GetDaysFromMonthAndUser(Year, Month, UserId);
            
            IEnumerable<DayInfo> diasMesComInfo = Enumerable.Range(1, DateTime.DaysInMonth(Year, Month))
                                                        .Select(day => 
                                                            _dayService.GetDayInfoFromMonth(new DateTime(Year, Month, day), diasDoMes)
                                                        );

            diasMesComInfo = diasMesComInfo.OrderBy(d => d.Dia);

            MonthInfo mesInfo = new MonthInfo
            {
                diasMes = diasMesComInfo,
                DiasAindaSemInformacao = diasMesComInfo.Last().DiasAindaSemInformacao + (diasMesComInfo.Last().ValidDay ? 0 : 1),
                SaldoDeHorasDoMes = diasMesComInfo.Last().SaldoDeHorasDoMes
            };

            return mesInfo;
        }
    }
}
