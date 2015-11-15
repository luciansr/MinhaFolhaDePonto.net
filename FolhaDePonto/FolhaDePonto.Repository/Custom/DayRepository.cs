using FolhaDePonto.Domain.DBModels;
using FolhaDePonto.Repository.Base;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FolhaDePonto.Repository.Custom
{
    public class DayRepository : GenericRepository<Dia>
    {
        public DayRepository(DbContext context) : base(context) { }

        public IEnumerable<Dia> GetDaysFromMonthAndUser(int Year, int Month, int UserId) {
            return Get(d => d.Mes == Month && d.Ano == Year && d.Usuario.Id == UserId);
        }
    }
}
