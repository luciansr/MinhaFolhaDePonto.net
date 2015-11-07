using FolhaDePonto.Domain.DBModels;
//using FolhaDePonto.Repository.Custom;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FolhaDePonto.Repository.Base
{
    // This project can output the Class library as a NuGet Package.
    // To enable this option, right-click on the project and select the Properties menu item. In the Build tab select "Produce outputs on build".
    public interface IUnitOfWork
    {
        //IRepository<TFolhaDePontoSOL0> Solicitacoes { get; }
        //DiskRepository Discos { get; }
        //DocumentRepository Documentos { get; }

        void Save();
        void Dispose();
    }
}
