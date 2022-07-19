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
    public class FabrykaDbController : ControllerBase
    {
        private readonly FabrycaContext _context;

        public FabrykaDbController(FabrycaContext context)
        {
            _context = context;
        }

        private List<TicketToApi> DbToDTO(List<Ticket> tickets)
        {
          var result = new List<TicketToApi>();

          foreach (var ticket in tickets)
          {
            var temp = new TicketToApi(ticket);
            result.Add(temp);
          }
          return result;
        }

        private List<CategoryToApi> DbToCatDTO(List<Category> categories)
        {
          var result = new List<CategoryToApi>();

          foreach (var cat in categories)
          {
            var temp = new CategoryToApi(cat);
            result.Add(temp);
          }
          return result;
        }

        // GET: api/FabrukaDb
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TicketToApi>>> GetTicket()
        {
          if (_context.Ticket == null)
          {
              return NotFound();
          }
          var res =  DbToDTO(await _context.Ticket.Include(x => x.Category).ToListAsync());
          return res;
        }

        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<CategoryToApi>>> GetCategories()
        {
          if (_context.Category == null)
          {
              return NotFound();
          }
          var res =  DbToCatDTO(await _context.Category.ToListAsync());
          return res;
        }

        // GET: api/FabrukaDb/5
        [HttpGet("{title}")]
        public async Task<ActionResult<TicketToApi>> GetTicket(string title)
        {
          if (_context.Ticket == null) return NotFound();

          var ticket = await _context.Ticket.Include(x => x.Category).FirstOrDefaultAsync(x => x.Title == title);

          if (ticket == null) return NotFound();

          return new TicketToApi(ticket);
        }

        // PUT: api/FabrukaDb/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{oldTitle}/title")]
        public async Task<IActionResult> PutTicketTitle(string oldTitle, string newTitle)
        {
          var ticketToChange = await _context.Ticket.FirstOrDefaultAsync(x => x.Title == oldTitle);
          if (ticketToChange == null) return BadRequest();

          ticketToChange.Title = newTitle;
          _context.Entry(ticketToChange).State = EntityState.Modified;

          await _context.SaveChangesAsync();

          return NoContent();
        }

        [HttpPut("{title}/description")]
        public async Task<IActionResult> PutTicketDescription(string title, string description)
        {
          var ticketToChange = await _context.Ticket.FirstOrDefaultAsync(x => x.Title == title);
          if (ticketToChange == null) return BadRequest();

          ticketToChange.Description = description;
          _context.Entry(ticketToChange).State = EntityState.Modified;

          await _context.SaveChangesAsync();

          return NoContent();
        }

        [HttpPut("{title}/status")]
        public async Task<IActionResult> PutTicketStatus(string title, string status)
        {
          var ticketToChange = await _context.Ticket.FirstOrDefaultAsync(x => x.Title == title);
          if (ticketToChange == null) return BadRequest();

          ticketToChange.Status = status;
          _context.Entry(ticketToChange).State = EntityState.Modified;

          await _context.SaveChangesAsync();

          return NoContent();
        }

        // POST: api/FabrykaDb
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Ticket>> PostTicket(TicketToApi ticket)
        {
          Category category = null;
          //add a clause to not add a ticket with the same title as an existing one
          if (ticket.CategoryName == "Completed" || ticket.CategoryName == "Planned" || ticket.CategoryName == "Ongoing")
          {
            category = await _context.Category.FirstOrDefaultAsync(c => c.Name == ticket.CategoryName);
          }
          else
          {
            return BadRequest();
          }

          var DbTicket = new Ticket { Id = null, Category = category, Title = ticket.Title, Description = ticket.Description, Status = ticket.Status, CreatedAt = ticket.CreatedAt, CategoryId = category.Id};
          if (_context.Ticket == null)
          {
              return Problem("Entity set 'FabrycaContext.Ticket'  is null.");
          }
            _context.Ticket.Add(DbTicket);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTicket", new { title = ticket.Title }, ticket);
        }

        // DELETE: api/FabrukaDb/5
        [HttpDelete("{title}")]
        public async Task<IActionResult> DeleteTicket(string title)
        {
            if (_context.Ticket == null)
            {
                return NotFound();
            }
            var ticket = await _context.Ticket.FirstOrDefaultAsync(x => x.Title == title);
            if (ticket == null)
            {
                return NotFound();
            }

            _context.Ticket.Remove(ticket);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TicketExists(int id)
        {
            return (_context.Ticket?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
