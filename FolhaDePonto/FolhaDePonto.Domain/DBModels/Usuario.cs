using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FolhaDePonto.Domain.DBModels
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public string NomeCompleto { get; set; }
        public string Email { get; set; }
        public string UrlImagem { get; set; }

        public virtual List<Dia> Dias { get; set; }
    }
}
