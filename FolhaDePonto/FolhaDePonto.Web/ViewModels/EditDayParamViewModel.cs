using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FolhaDePonto.Web.ViewModels
{
    public class EditDayParamViewModel
    {
        public DateTime day { get; set; }
        public TimeSpan InicioExpediente { get; set; }
        public TimeSpan InicioAlmoco { get; set; }
        public TimeSpan FimAlmoco { get; set; }
        public TimeSpan FimExpediente { get; set; }
    }
}
