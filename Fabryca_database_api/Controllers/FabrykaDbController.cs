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

        private TicketToApi TicketToDTO(Ticket ticket) => new TicketToApi(ticket);

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

        // GET: api/FabrukaDb/5
        [HttpGet("{title}")]
        public async Task<ActionResult<TicketToApi>> GetTicket(string title)
        {
          if (_context.Ticket == null)
          {
              return NotFound();
          }
            var ticket = await _context.Ticket.Include(x => x.Category).FirstOrDefaultAsync(x => x.Title == title);

            if (ticket == null)
            {
                return NotFound();
            }

            return new TicketToApi(ticket);
        }

        // PUT: api/FabrukaDb/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTicket(int id, TicketToApi ticket)
        {
          var category = await _context.Category.FirstOrDefaultAsync(c => c.Name == ticket.CategoryName);
           
          var DbTicket = new Ticket { Id = id, Category = category, Title = ticket.Title, Description = ticket.Description, Status = ticket.Status, CreatedAt = ticket.CreatedAt};
          if (id != DbTicket.Id)
          {
              return BadRequest();
          }

          _context.Entry(DbTicket).State = EntityState.Modified;

          try
          {
              await _context.SaveChangesAsync();
          }
          catch (DbUpdateConcurrencyException)
          {
              if (!TicketExists(id))
              {
                  return NotFound();
              }
              else
              {
                  throw;
              }
          }

          return NoContent();
        }

        // POST: api/FabrykaDb
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Ticket>> PostTicket(TicketToApi ticket)
        {
          Category category = null;
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

            // return CreatedAtAction("GetTicket", new { title = ticket.Title }, ticket);
            return null;
        }

        // DELETE: api/FabrukaDb/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            if (_context.Ticket == null)
            {
                return NotFound();
            }
            var ticket = await _context.Ticket.FindAsync(id);
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
