using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FolhaDePonto.Domain.DBModels
{
    public enum TipoDia { UTIL = 1, FERIADO = 2, FOLGA = 3, FERIAS = 4 }

    public class Dia
    {
        public int Id { get; set; }
        public TipoDia Tipo { get; set; }
        public TimeSpan InicioExpediente { get; set; }
        public TimeSpan InicioAlmoco { get; set; }
        public TimeSpan FimAlmoco { get; set; }
        public TimeSpan FimExpediente { get; set; }
        
        public virtual Usuario usuario { get; set; }
    }
}
