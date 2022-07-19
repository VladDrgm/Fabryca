namespace Fabryca_database_api.Models;

public class TicketToApi
{
  public TicketToApi(Ticket ticket)
  {
    Title = ticket.Title;
    Status = ticket.Status;
    CreatedAt = ticket.CreatedAt.ToLongDateString();
    Description = ticket.Description;
    CategoryName = ticket.Category.Name;
  }
  public TicketToApi() {}

  public string Title { get; set; }
  public string Status { get; set; }
  public string CreatedAt { get; set; }
  public string Description { get; set; }
  public string CategoryName { get; set; }
}