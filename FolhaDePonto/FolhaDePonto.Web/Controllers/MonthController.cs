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
    [Authorize]
    public class MonthController : BaseController
    {
        private MonthService _monthService { get; set; }

        public MonthController(MonthService monthService)
        {
            _monthService = monthService;
        }

        [HttpGet]
        public IHttpActionResult GetMonthInfo(int Year, int Month)
        {
            try
            {
                MonthInfo monthInfo = _monthService.GetMonthInfo(Year, Month, AuthenticatedUser.Id);
                return Ok(monthInfo);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
