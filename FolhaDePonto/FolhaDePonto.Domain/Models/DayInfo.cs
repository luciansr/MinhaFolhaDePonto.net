using FolhaDePonto.Domain.DBModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FolhaDePonto.Domain.Models
{
    public class DayInfo
    {
        public DayInfo(int Ano, int Mes, int Dia) {
            this.Ano = Ano;
            this.Mes = Mes;
            this.Dia = Dia;
        }

        public int Ano { get; set; }
        public int Mes { get; set; }
        public int Dia { get; set; }

        public bool ValidDay { get; set; }
        public bool IsWeekend { get; set; }

        public TipoDia? Tipo { get; set; }
        public TimeSpan? InicioExpediente { get; set; }
        public TimeSpan? InicioAlmoco { get; set; }
        public TimeSpan? FimAlmoco { get; set; }
        public TimeSpan? FimExpediente { get; set; }

        public int DiasAindaSemInformacao { get; set; }
        public TimeSpan SaldoDeHorasDoMes { get; set; }
        public TimeSpan SaldoDeHoras { get; set; }
    }
}
