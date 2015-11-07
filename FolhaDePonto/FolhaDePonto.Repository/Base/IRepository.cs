using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FolhaDePonto.Repository.Base
{
    public interface IRepository<TEntity>
           where TEntity : class
    {
        void Delete(params object[] id);
        void Delete(TEntity entityToDelete);
        System.Collections.Generic.IEnumerable<TEntity> Get(System.Linq.Expressions.Expression<Func<TEntity, bool>> filter = null, Func<System.Linq.IQueryable<TEntity>, System.Linq.IOrderedQueryable<TEntity>> orderBy = null, string includeProperties = "", int? take = null, int? skip = null);
        System.Linq.IQueryable<TEntity> queryGet(System.Linq.Expressions.Expression<Func<TEntity, bool>> filter = null, Func<System.Linq.IQueryable<TEntity>, System.Linq.IOrderedQueryable<TEntity>> orderBy = null, string includeProperties = "", int? take = null, int? skip = null);
        TEntity GetByID(params object[] id);
        System.Linq.IQueryable<TEntity> GetSet(string includeProperties = "");
        System.Collections.Generic.IEnumerable<TEntity> GetWithRawSql(string query, params object[] parameters);
        TEntity Insert(TEntity entity);
        void ExecuteSqlCommand(string query, params object[] parameters);
        void Update(TEntity entityToUpdate);
        int Count(System.Linq.Expressions.Expression<Func<TEntity, bool>> filter = null);
    }
}
