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

        public DayInfo GetDayInfo(DateTime day)
        {
            return null;
        }
    }
}
