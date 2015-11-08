using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FolhaDePonto.Domain.Models
{
    public class GoogleUserInfo
    {
        public string iss { get; set; }
        public string at_hash { get; set; }
        public string aud { get; set; }
        public string sub { get; set; }
        public bool email_verified { get; set; }
        public string azp { get; set; }
        public string email { get; set; }
        public string iat { get; set; }
        public string exp { get; set; }
        public string name { get; set; }
        public string picture { get; set; }
        public string given_name { get; set; }
        public string family_name { get; set; }
        public string locale { get; set; }
        public string alg { get; set; }
        public string kid { get; set; }
    }
}
