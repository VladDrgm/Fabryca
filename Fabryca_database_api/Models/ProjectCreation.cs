namespace Fabryca_database_api.Models;

public class ProjectCreation
{
  public ProjectCreation(ProjectToApi project)
  {
    Name = project.Name;
  }
  public ProjectCreation() {}
  
  public string Name { get; set; }
}