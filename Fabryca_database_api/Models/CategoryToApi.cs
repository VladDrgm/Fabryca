namespace Fabryca_database_api.Models;

public class CategoryToApi 
{
  public CategoryToApi(Category category)
  {
    Name = category.Name;
  }
  public string Name { get; set; }
}