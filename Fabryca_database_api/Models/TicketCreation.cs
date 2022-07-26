namespace Fabryca_database_api.Models;

public class TicketCreation
{
  public TicketCreation(TicketToApi ticket)
  {
    Title = ticket.Title;
    Status = ticket.Status;
    Description = ticket.Description;
    CreatedBy = ticket.CreatedBy;
    AssignedTo = ticket.AssignedTo;
    ProjectName = ticket.ProjectName;
  }
  public TicketCreation() {}

  public string Title { get; set; }
  public string Status { get; set; }
  public string Description { get; set; }

  public string CreatedBy { get; set; }

  public string AssignedTo { get; set; }

  public string ProjectName { get; set; }
}