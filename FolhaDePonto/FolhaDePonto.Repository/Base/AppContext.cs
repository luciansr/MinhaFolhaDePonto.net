using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FolhaDePonto.Domain.DBModels;
using System.Data.Entity;

namespace FolhaDePonto.Repository.Base
{
    public class AppContext : DbContext
    {
        public AppContext()
            : base("name=AppDBConn")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<AppContext, FolhaDePonto.Repository.Migrations.Configuration>("AppDBConn"));
        }

        public void Save()
        {
            base.SaveChanges();
        }

        //public DbSet<TFolhaDePontoSOL0> Solicitacoes { get; set; }
        //public DbSet<TFolhaDePontoDIC0> Discos { get; set; }
        //public DbSet<TFolhaDePontoDOC0> Documentos { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<TFolhaDePontoCLA0>().HasRequired(c => c.TFolhaDePontoMAT0).WithMany(m => m.TFolhaDePontoCLA0).WillCascadeOnDelete(false);

            base.OnModelCreating(modelBuilder);
        }
    }
}
