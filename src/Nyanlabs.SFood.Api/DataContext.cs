using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Nyanlabs.SFood.Api.Models;

namespace Nyanlabs.SFood.Api;

public class DataContext : DbContext
{
    public DbSet<IncidentSubmission> Submissions => Set<IncidentSubmission>();

    protected override void OnModelCreating(ModelBuilder mb)
    {
        base.OnModelCreating(mb);

        
    }
}
