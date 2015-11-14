using FolhaDePonto.Domain.DBModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FolhaDePonto.Domain.Models
{
    public class AuthenticatedUser : Usuario
    {
        public string Role { get; set; }
    }
}
