using FolhaDePonto.Domain.DBModels;

namespace FolhaDePonto.Repository.Base
{
    public interface IUnitOfWork
    {
        IRepository<Usuario> Usuarios { get; }
        IRepository<Dia> Dias { get; }

        void Save();
        void Dispose();
    }
}
