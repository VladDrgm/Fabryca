using Fabryca_database_api.Models;

namespace Fabryca_database_api.Controllers;

public class TicketHelper 
{
  private readonly FabrycaContext _context;

  public TicketHelper(FabrycaContext context)
  {
      _context = context;
  }
  public List<TicketToApi> DbToDTO(List<Ticket> tickets)
  {
    var result = new List<TicketToApi>();

    foreach (var ticket in tickets)
    {
      var temp = new TicketToApi(ticket);
      result.Add(temp);
    }
    return result;
  }
  public bool TicketExists(int id) => (_context.Ticket?.Any(e => e.Id == id)).GetValueOrDefault();
}