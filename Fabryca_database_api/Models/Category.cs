using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Fabryca_database_api.Models;

public class Category 
{
  [Key]
  public int Id { get; set; }
  public string Name { get; set; }
}