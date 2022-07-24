using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Fabryca_database_api.Models;

    public class FabrycaContext : DbContext
    {
        public FabrycaContext (DbContextOptions<FabrycaContext> options)
            : base(options)
        {
        }

        public DbSet<Fabryca_database_api.Models.Ticket> Ticket { get; set; } = default!;
        public DbSet<Fabryca_database_api.Models.Category> Category { get; set; } = default!;
        public DbSet<Fabryca_database_api.Models.Project> Projects { get; set; } = default!;
    }
