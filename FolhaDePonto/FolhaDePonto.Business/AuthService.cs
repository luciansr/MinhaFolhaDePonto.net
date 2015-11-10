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
    public class AuthService : BaseService
    {
        private GoogleService _googleService;
        public AuthService(IUnitOfWork uow, GoogleService googleService) : base(uow)
        {
            _googleService = googleService;
        }

        public ClaimsIdentity FindUser(OAuthGrantResourceOwnerCredentialsContext context)
        {
            GoogleUserInfo googleUser = _googleService.GetUserInfo(context.Password);

            if (googleUser != null)
            {


            }
            //string username = context.UserName;
            //string password = context.Password;

            //Usuario usuario = IdentityContext.Usuarios.Get(u => u.UserID.ToLower() == username.ToLower() && u.Senha == password && !u.Bloqueado).FirstOrDefault();

            //if (usuario != null)
            //{
            //    ClaimsIdentity identity = new ClaimsIdentity(context.Options.AuthenticationType);

            //    identity.AddClaim(new Claim("Nome", usuario.Nome));
            //    identity.AddClaim(new Claim("ID", usuario.ID.ToString()));
            //    identity.AddClaim(new Claim("Role", usuario.Roles.ToString()));
            //    identity.AddClaim(new Claim(ClaimTypes.Role, usuario.Roles.ToString()));

            //    return identity;
            //}

            //return null;
            return null;
        }

        //public 
        private Usuario CreateUser(GoogleUserInfo googleUser)
        {

            return null;
        }

        private Usuario GetUserByEmail(string email) {
            return _uow.Usuarios.Get(u => u.Email == email).FirstOrDefault();
        }
    }
}
