using FolhaDePonto.Domain.DBModels;
using FolhaDePonto.Repository.Custom;
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

        private GenericRepository<Usuario> _usuarios;

        public IRepository<Usuario> Usuarios
        {
            get
            {
                return _usuarios ?? (_usuarios = new GenericRepository<Usuario>(context));
            }
        }

        private DayRepository _dias;

        public DayRepository Dias
        {
            get
            {
                return _dias ?? (_dias = new DayRepository(context));
            }
        }
    }
}
