using FolhaDePonto.Domain.DBModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FolhaDePonto.Domain.Models
{
    public class MonthInfo
    {
        public IEnumerable<DayInfo> diasMes { get; set; }
        public int DiasAindaSemInformacao { get; set; }
        public TimeSpan SaldoDeHorasDoMes { get; set; }
    }
}
