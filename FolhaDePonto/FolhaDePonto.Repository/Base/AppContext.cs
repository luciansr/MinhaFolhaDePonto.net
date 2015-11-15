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

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Dia> Dias { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Dia>()
                .HasRequired(d => d.Usuario)
                .WithMany(u => u.Dias)
                .WillCascadeOnDelete(true);

            base.OnModelCreating(modelBuilder);
        }
    }
}
