namespace Fabryca_database_api.Models;

public class TicketCreation
{
  public TicketCreation(TicketToApi ticket)
  {
    Title = ticket.Title;
    Status = ticket.Status;
    Description = ticket.Description;
    CategoryName = ticket.CategoryName;
  }
  public TicketCreation() {}

  public string Title { get; set; }
  public string Status { get; set; }
  public string Description { get; set; }
  public string CategoryName { get; set; }
}