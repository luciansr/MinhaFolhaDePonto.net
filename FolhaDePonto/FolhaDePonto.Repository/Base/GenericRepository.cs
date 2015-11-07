using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace FolhaDePonto.Repository.Base
{
    public class GenericRepository<TEntity> : IRepository<TEntity>
           where TEntity : class
    {
        internal DbContext context;
        internal DbSet<TEntity> dbSet;

        public GenericRepository(DbContext context)
        {
            this.context = context;
            this.dbSet = context.Set<TEntity>();
        }

        public IQueryable<TEntity> queryGet(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = "",
            int? take = null,
            int? skip = null)
        {
            IQueryable<TEntity> query = dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (includeProperties == null)
                includeProperties = "";

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                query = orderBy(query);
            }

            if (take.HasValue)
            {
                query = query.Take(take ?? 0);
            }

            if (skip.HasValue)
            {
                query = query.Skip(skip ?? 0);
            }

            return query;
        }

        public virtual IEnumerable<TEntity> Get(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = "",
            int? take = null,
            int? skip = null)
        {
            IQueryable<TEntity> query = queryGet(filter, orderBy, includeProperties, take, skip);

            return query.ToList();
        }

        public virtual IQueryable<TEntity> GetSet(
            string includeProperties = "")
        {
            IQueryable<TEntity> query = dbSet;

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            return query.AsQueryable();

        }

        public virtual TEntity GetByID(params object[] id)
        {
            return dbSet.Find(id);
        }

        public virtual TEntity Insert(TEntity entity)
        {
            if (context.Entry(entity).State == EntityState.Detached)
                return dbSet.Add(entity);

            return entity;
        }

        public virtual void Delete(params object[] id)
        {
            TEntity entityToDelete = dbSet.Find(id);
            Delete(entityToDelete);
        }

        public virtual void Delete(TEntity entityToDelete)
        {
            if (context.Entry(entityToDelete).State == EntityState.Detached)
            {
                dbSet.Attach(entityToDelete);
            }

            dbSet.Remove(entityToDelete);
        }

        public virtual void Update(TEntity entityToUpdate)
        {
            dbSet.Attach(entityToUpdate);
            context.Entry(entityToUpdate).State = EntityState.Modified;
        }

        public virtual IEnumerable<TEntity> GetWithRawSql(string query, params object[] parameters)
        {
            return dbSet.SqlQuery(query, parameters).ToList();
        }

        public virtual void ExecuteSqlCommand(string query, params object[] parameters)
        {
            context.Database.ExecuteSqlCommand(query, parameters);
        }

        public int Count(Expression<Func<TEntity, bool>> filter = null)
        {
            if (filter != null)
                return dbSet.Count(filter);
            else
                return dbSet.Count();
        }

        public void InsertOrUpdate(TEntity entity)
        {
            if (context.Entry(entity).State == EntityState.Detached)
                dbSet.Add(entity);
        }
    }
}
