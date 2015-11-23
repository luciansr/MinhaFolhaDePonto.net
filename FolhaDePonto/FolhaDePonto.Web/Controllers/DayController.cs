using FolhaDePonto.Business;
using FolhaDePonto.Domain.Models;
using FolhaDePonto.Web.Controllers.Base;
using FolhaDePonto.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FolhaDePonto.Web.Controllers
{
    [Authorize]
    public class DayController : BaseController
    {

        private DayService _dayService { get; set; }

        public DayController(DayService dayService)
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

        [HttpPost]
        public IHttpActionResult EditDay(EditDayParamViewModel param)
        {
            try
            {
                _dayService.EditDay(param.day, 
                                    param.InicioExpediente,
                                    param.InicioAlmoco,
                                    param.FimAlmoco,
                                    param.FimExpediente,
                                    AuthenticatedUser.Id);
                return Ok(true);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
