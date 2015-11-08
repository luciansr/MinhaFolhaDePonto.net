
using FolhaDePonto.Domain.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FolhaDePonto.Business
{
    public class GoogleService
    {
        public GoogleUserInfo GetUserInfo(string token)
        {
            GoogleUserInfo user = null;
            try
            {
                HttpWebRequest request = WebRequest.Create("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + token) as HttpWebRequest;
                request.ContentType = "application/json; charset=utf-8";

                HttpWebResponse response = request.GetResponse() as HttpWebResponse;
                
                using (StreamReader sr = new StreamReader(response.GetResponseStream()))
                {
                    string text = sr.ReadToEnd();
                    dynamic data = JObject.Parse(text);

                    user = new GoogleUserInfo
                    {
                        alg = data.alg,
                        aud = data.aud,
                        at_hash = data.at_hash,
                        azp = data.azp,
                        email = data.email,
                        email_verified = data.email_verified,
                        exp = data.exp,
                        family_name = data.family_name,
                        given_name = data.given_name,
                        iat = data.iat,
                        iss = data.iss,
                        kid = data.kid,
                        locale = data.locale,
                        name = data.name,
                        picture = data.picture,
                        sub = data.sub
                    };
                }
            }
            catch { }

            return user;
        }
    }
}
