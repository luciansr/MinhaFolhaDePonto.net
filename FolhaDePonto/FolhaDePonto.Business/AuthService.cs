using FolhaDePonto.Business.Base;
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
        public AuthService(IUnitOfWork uow) : base(uow) { }

        public ClaimsIdentity FindUser(OAuthGrantResourceOwnerCredentialsContext context)
        {
            UnitOfWork IdentityContext = new UnitOfWork();

            try
            {
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
            finally
            {
                IdentityContext.Dispose();
            }
        }
    }
}
