using FolhaDePonto.Domain.DBModels;
using System;
//using FolhaDePonto.Repository.Custom;

namespace FolhaDePonto.Repository.Base
{
    public class UnitOfWork : IUnitOfWork
    {
        private AppContext context = new AppContext();

        public void Save()
        {
            context.SaveChanges();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }

            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        //private GenericRepository<TFolhaDePontoSOL0> _solicitacoes;

        //public IRepository<TFolhaDePontoSOL0> Solicitacoes
        //{
        //    get
        //    {
        //        return _solicitacoes ?? (_solicitacoes = new GenericRepository<TFolhaDePontoSOL0>(context));
        //    }
        //}
        
    }
}
