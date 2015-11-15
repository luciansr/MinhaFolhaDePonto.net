using FolhaDePonto.Business;
using FolhaDePonto.Domain.Models;
using FolhaDePonto.Web.Controllers.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FolhaDePonto.Web.Controllers
{
    public class MonthController : BaseController
    {
        private DayService _dayService { get; set; }

        public MonthController(DayService dayService)
        {
            _dayService = dayService;
        }

        [HttpGet]
        public IHttpActionResult GetDayInfo(DateTime day)
        {
            try
            {
                DayInfo dayInfo = _dayService.GetDayInfo(day, AuthenticatedUser.Id);
                return Ok(dayInfo);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
