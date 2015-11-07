using Microsoft.Owin;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FolhaDePonto.Web.Authentication
{
    public static class AuthenticationHelper
    {
        public static T GetKeyFromUser<T>(string type, IOwinContext _context)
        {
            if (_context != null && _context.Authentication.User.Identity.IsAuthenticated)
            {
                try
                {
                    var user = _context.Authentication.User;

                    T result = (T)TypeDescriptor.GetConverter(typeof(T)).ConvertFrom(user.Claims.FirstOrDefault(c => c.Type == type).Value);

                    return result;
                }
                catch { }
            }

            return default(T);
        }
    }
}
