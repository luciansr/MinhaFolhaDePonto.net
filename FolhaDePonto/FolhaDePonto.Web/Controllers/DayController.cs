using FolhaDePonto.Business;
using FolhaDePonto.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FolhaDePonto.Web.Controllers
{
    public class DayController : ApiController
    {
        private DayService _dayService { get; set; }

        public DayController(DayService dayService)
        {
            _dayService = dayService;
        }

        public IHttpActionResult GetDayInfo(DateTime day)
        {
            try
            {
                DayInfo dayInfo = _dayService.GetDayInfo(day);
                return Ok(dayInfo);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
