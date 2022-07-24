namespace Fabryca_database_api.Models;

public class ProjectToApi
{
  public ProjectToApi(Project project)
  {
    Name = project.Name;
    Id = project.Id;
  }
  public string Name { get; set; }
  public int Id { get; set; }
} 