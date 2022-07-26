using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Fabryca_database_api.Models;

namespace Fabryca_database_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly FabrycaContext _context;
        private readonly TicketHelper _helper;


        public TicketsController(FabrycaContext context)
        {
            _context = context;
            _helper = new TicketHelper(context);
        }

        [HttpGet("project/{projectName}")]
        public async Task<ActionResult<IEnumerable<TicketToApi>>> GetTickets(string projectName)
        {

          if (_context.Ticket == null) return NotFound();

          var project = await _context.Projects.FirstOrDefaultAsync(p => p.Name == projectName);

          var result =  await _context.Ticket
                                      .Include(x => x.Category)
                                      .ThenInclude(x => x.Project)
                                      .Where(x => x.Project.Name == project.Name)
                                      .ToListAsync();

          if (result == null || result.Count == 0) return NotFound("No items found");

          return _helper.DbToDTO(result);
        }

        [HttpGet("{title}")]
        public async Task<ActionResult<TicketToApi>> GetTicket(string title)
        {
          if (_context.Ticket == null) return NotFound();

          var ticket = await _context.Ticket.Include(x => x.Category).Include(x => x.Project).FirstOrDefaultAsync(x => x.Title == title);

          if (ticket == null) return NotFound();

          return new TicketToApi(ticket);
        }

        [HttpPut("{oldTitle}/title")]
        public async Task<IActionResult> PutTicketTitle(string oldTitle, string newTitle)
        {
          if (String.IsNullOrEmpty(newTitle)) return BadRequest("Title cannot be empty");

          var ticketToChange = await _context.Ticket
                                              .Include(x => x.Category)
                                              .Include(x => x.Project)
                                              .FirstOrDefaultAsync(x => x.Title == oldTitle);
          if (ticketToChange == null) return BadRequest();

          ticketToChange.Title = newTitle;
          _context.Entry(ticketToChange).State = EntityState.Modified;

          await _context.SaveChangesAsync();

          return CreatedAtAction("GetTicket", new { title = ticketToChange.Title }, new TicketToApi(ticketToChange));
        }

        [HttpPut("{title}/description")]
        public async Task<IActionResult> PutTicketDescription(string title, string description)
        {
          var ticketToChange = await _context.Ticket
                                              .Include(x => x.Category)
                                              .Include(x => x.Project)
                                              .FirstOrDefaultAsync(x => x.Title == title);
          if (ticketToChange == null) return BadRequest();

          ticketToChange.Description = description;
          _context.Entry(ticketToChange).State = EntityState.Modified;

          await _context.SaveChangesAsync();

          return CreatedAtAction("GetTicket", new { title = ticketToChange.Title }, new TicketToApi(ticketToChange));
        }

        [HttpPut("{title}/status")]
        public async Task<IActionResult> PutTicketStatus(string title, string status)
        {
          var ticketToChange = await _context.Ticket
                                            .Include(x => x.Category)
                                            .Include(x => x.Project)
                                            .FirstOrDefaultAsync(x => x.Title == title);
          if (ticketToChange == null) return BadRequest();

          ticketToChange.Status = status;
          _context.Entry(ticketToChange).State = EntityState.Modified;

          await _context.SaveChangesAsync();

          return CreatedAtAction("GetTicket", new { title = ticketToChange.Title }, new TicketToApi(ticketToChange));
        }

        [HttpPut("{projectName}/{ticketTitle}/category")]
        public async Task<IActionResult> PutTicketCategory(string projectName, string ticketTitle,  string categoryName)
        {
          var ticketToChange = await _context.Ticket
                                    .Include(x => x.Category)
                                    .Include(x => x.Project)
                                    .FirstOrDefaultAsync(x => (x.Project.Name == projectName &&
                                                               x.Title == ticketTitle));

          if (ticketToChange == null) return BadRequest("Ticket does not exist.");

          var category = await _context.Category
                                        .Include(x => x.Project)
                                        .FirstOrDefaultAsync(x => (x.Name == categoryName &&
                                                                  x.Project.Name == projectName));

          if ( category != null)
          {
            ticketToChange.Category = category;
            _context.Entry(ticketToChange).State = EntityState.Modified;
            await _context.SaveChangesAsync();
          }

          return CreatedAtAction("GetTicket", new { title = ticketToChange.Title }, new TicketToApi(ticketToChange));
        }

        [HttpPut("{ticketTitle}/{projectName}/ticket")]
        public async Task<IActionResult> PutTicket(string ticketTitle, string projectName, string newTitle, string? newStatus, string? newCategoryName, string? newDescription)
        {
          var ticketToChange = await _context.Ticket.FirstOrDefaultAsync(x => x.Title == ticketTitle);
          if (ticketToChange == null) return BadRequest();

          var category = await _context.Category.Include(x => x.Project)
                                                .FirstOrDefaultAsync(x => (x.Name == newCategoryName && x.Project.Name == projectName));


          if (category != null) ticketToChange.Category = category;

          if (!string.IsNullOrEmpty(newTitle))
          {
            var test = await _context.Ticket.Where(x => x.Title != ticketTitle).FirstOrDefaultAsync(x => x.Title == newTitle);
            if (test != null) return BadRequest();
            ticketToChange.Title = newTitle;
          }

          if (!string.IsNullOrEmpty(newStatus)) ticketToChange.Status = newStatus;
          if (!string.IsNullOrEmpty(newDescription)) ticketToChange.Description = newDescription;

          _context.Entry(ticketToChange).State = EntityState.Modified;
          await _context.SaveChangesAsync();

          return CreatedAtAction("GetTicket", new { title = ticketToChange.Title }, new TicketToApi(ticketToChange));
        }

        [HttpPost]
        public async Task<ActionResult<Ticket>> PostTicket(TicketCreation ticket)
        {
          if (String.IsNullOrEmpty(ticket.Title)) return BadRequest("Please choose a unique title for the ticket.");

          var  project =  await _context.Projects
                                            .FirstOrDefaultAsync(x => x.Name == ticket.ProjectName);

          var category = await _context.Category
                                            .Include(x => x.Project)
                                            .Where(x => x.Project.Name == ticket.ProjectName)
                                            .FirstOrDefaultAsync(x => x.Name == "Planned");

          if (project == null || project.Name.Length == 0) return BadRequest("Please add a project to the ticket!");
          if (category == null || category.Name.Length == 0) return BadRequest("Please create <Planned> category for the ticket!");

          var tick = await _context.Ticket.FirstOrDefaultAsync(x => x.Title == ticket.Title);

          if (tick != null) return BadRequest("Please choose a unique title for the ticket.");

          var DbTicket = new Ticket();

          if (!string.IsNullOrEmpty(ticket.Title))
          {
            DbTicket = new Ticket { 
                                        Id = null, 
                                        Category = category, 
                                        Title = ticket.Title, 
                                        Description = ticket.Description, 
                                        Status = ticket.Status,
                                        CreatedAt = DateTime.Parse(DateTime.Now.ToShortDateString()),
                                        CategoryId = category.Id,
                                        CreatedBy = ticket.CreatedBy,
                                        AssignedTo  = ticket.AssignedTo,
                                        Project = project
                                      };
            if (_context.Ticket == null) return Problem("Entity set 'FabrycaContext.Ticket' is null.");

            _context.Ticket.Add(DbTicket);
            await _context.SaveChangesAsync();
          }

          return CreatedAtAction("GetTicket", new { title = ticket.Title }, ticket);
        }

        [HttpDelete("{title}")]
        public async Task<IActionResult> DeleteTicket(string title)
        {
            if (_context.Ticket == null) return NotFound();

            var ticket = await _context.Ticket.FirstOrDefaultAsync(x => x.Title == title);

            if (ticket == null) return NotFound();

            _context.Ticket.Remove(ticket);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
