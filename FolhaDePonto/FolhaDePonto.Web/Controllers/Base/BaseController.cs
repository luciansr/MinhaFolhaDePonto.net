using FolhaDePonto.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FolhaDePonto.Web.Controllers.Base
{
    public class BaseController : ApiController
    {
        protected AuthenticatedUser AuthenticatedUser
        {
            get
            {
                return new AuthenticatedUser
                {
                    Id = Authentication.AuthenticationHelper.GetKeyFromUser<int>("ID", Request.GetOwinContext()),
                    UrlImagem = Authentication.AuthenticationHelper.GetKeyFromUser<string>("ImageUrl", Request.GetOwinContext()),
                    Email = Authentication.AuthenticationHelper.GetKeyFromUser<string>("Email", Request.GetOwinContext()),
                    Sobrenome = Authentication.AuthenticationHelper.GetKeyFromUser<string>("Lastname", Request.GetOwinContext()),
                    NomeCompleto = Authentication.AuthenticationHelper.GetKeyFromUser<string>("Fullname", Request.GetOwinContext()),
                    Nome = Authentication.AuthenticationHelper.GetKeyFromUser<string>("Nome", Request.GetOwinContext()),
                    Role = Authentication.AuthenticationHelper.GetKeyFromUser<string>("Role", Request.GetOwinContext())
                };
            }
        }
    }
}
