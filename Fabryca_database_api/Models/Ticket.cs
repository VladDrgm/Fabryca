using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Fabryca_database_api.Models;

[Table("Tickets")]
public class Ticket
{
  [Key]
  public int? Id { get; set; }
  public string Title { get; set; }
  public string Status { get; set; }

  [DataType(DataType.Date)]
  public DateTime CreatedAt { get; set; }

  [StringLength(1000000)]
  public string Description { get; set; }
  
  [ForeignKey("Category")]
  public int CategoryId { get; set; }
  public Category Category { get; set; }

  public string CreatedBy { get; set; }
  public string AssignedTo { get; set; }
}