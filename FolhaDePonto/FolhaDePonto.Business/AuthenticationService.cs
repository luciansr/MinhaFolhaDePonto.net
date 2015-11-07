using FolhaDePonto.Business.Base;
using FolhaDePonto.Repository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FolhaDePonto.Business
{
    public class AuthenticationService : BaseService
    {
        public AuthenticationService(IUnitOfWork uow) : base(uow) { }
    }
}
