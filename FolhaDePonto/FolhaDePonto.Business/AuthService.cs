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
                Usuario usuario = GetUserOrCreate(googleUser);

                if (usuario != null)
                {
                    ClaimsIdentity identity = new ClaimsIdentity(context.Options.AuthenticationType);

                    identity.AddClaim(new Claim("Nome", usuario.PrimeiroNome));
                    identity.AddClaim(new Claim("ID", usuario.Id.ToString()));
                    identity.AddClaim(new Claim("Role", "User"));
                    identity.AddClaim(new Claim(ClaimTypes.Role, "User"));

                    return identity;
                }

            }

            return null;
        }

        private Usuario GetUser(string email)
        {
            return _uow.Usuarios.Get(u => u.Email == email).FirstOrDefault();
        }

        private Usuario CreateUser(GoogleUserInfo googleUser)
        {
            Usuario usuario = GetUser(googleUser.email);

            if (usuario == null) {
                usuario = new Usuario
                {
                    Email = googleUser.email,
                    Nome = googleUser.name,
                    PrimeiroNome = googleUser.given_name,
                    Sobrenome = googleUser.family_name,
                    UrlImagem = googleUser.picture
                };

                _uow.Usuarios.Insert(usuario);
                _uow.Save();

                usuario = _uow.Usuarios.Get(u => u.Email == googleUser.email).FirstOrDefault();
            }

            return usuario;
        }

        private Usuario GetUserOrCreate(GoogleUserInfo googleUser)
        {
            Usuario usuario = GetUser(googleUser.email);

            if (usuario == null)
            {
                usuario = CreateUser(googleUser);
            }

            return usuario;
        }
    }
}
