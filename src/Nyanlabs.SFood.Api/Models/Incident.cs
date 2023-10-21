using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Nyanlabs.SFood.Api.Models;

public class IncidentSubmission
{
    //TODO: Validation
    [Key]
    public long Id { get; set; }
    public required string Name { get; set; }
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime Submitted { get; set; }
    [EmailAddress]
    public string? SubmitterAddress { get; set; }
    public required string ProductName { get; set; }
    public required string Producer { get; set; }
    public required string Description { get; set; }
    public required string Location { get; set; }
}