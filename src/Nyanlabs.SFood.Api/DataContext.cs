using Microsoft.EntityFrameworkCore;
using Nyanlabs.SFood.Api.Models;

namespace Nyanlabs.SFood.Api;

public class DataContext : DbContext
{
    public DbSet<IncidentSubmission> Submissions => Set<IncidentSubmission>();

    protected override void OnModelCreating(ModelBuilder mb)
    {
        base.OnModelCreating(mb);

        mb.Entity<IncidentSubmission>().HasIndex(s => new { s.SubmitterAddress, s.Producer });
    }
}
