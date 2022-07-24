namespace Fabryca_database_api.Models;

public class ProjectToApi
{
  public ProjectToApi(Project project)
  {
    Name = project.Name;
  }
  public string Name { get; set; }
} 