using FolhaDePonto.Domain.DBModels;
using FolhaDePonto.Repository.Custom;

namespace FolhaDePonto.Repository.Base
{
    public interface IUnitOfWork
    {
        IRepository<Usuario> Usuarios { get; }
        DayRepository Dias { get; }

        void Save();
        void Dispose();
    }
}
