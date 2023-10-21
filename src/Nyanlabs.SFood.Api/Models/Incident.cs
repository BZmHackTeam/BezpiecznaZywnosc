using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Nyanlabs.SFood.Api.Models;

public class IncidentSubmission
{
    //TODO: Validation
    public required string Name { get; set; }
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime Submitted { get; set; } = DateTime.Now;
    [EmailAddress]
    public required string SubmitterAddress { get; set; }
    public required string ProductName { get; set; }
    public required string Producer { get; set; }
    public required string Description { get; set; }
    public required string Location { get; set; }
}
