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
    public class CategoriesController : ControllerBase
    {
        private readonly FabrycaContext _context;

        public CategoriesController(FabrycaContext context)
        {
            _context = context;
        }

        private List<CategoryToApi> DbToCategoriesDTO(List<Category> categories)
        {
          var result = new List<CategoryToApi>();

          foreach (var cat in categories)
          {
            var temp = new CategoryToApi(cat);
            result.Add(temp);
          }
          return result;
        }

        private List<TicketToApi> DbTicketsToDTO(List<Ticket> tickets)
        {
          var result = new List<TicketToApi>();

          foreach (var ticket in tickets)
          {
            var temp = new TicketToApi(ticket);
            result.Add(temp);
          }
          return result;
        }

        private CategoryToApi DbToCategoryDTO(Category category) => new CategoryToApi(category);

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryToApi>>> GetCategories()
        {
          if (_context.Category == null)
          {
              return NotFound();
          }
          var res =  DbToCategoriesDTO(await _context.Category.ToListAsync());
          return res;
        }

        [HttpGet("{categoryName}/tickets")]
        public async Task<ActionResult<IEnumerable<TicketToApi>>> GetTicketsForCategory(string categoryName)
        {
          if (_context.Category == null || _context.Ticket == null)
          {
              return NotFound();
          }
          var res =  DbTicketsToDTO(await _context.Ticket.Include(x => x.Category).Where(x => x.Category.Name == categoryName).Select(x => x).ToListAsync());
          return res;
        }

        [HttpGet("{name}")]
        public async Task<ActionResult<CategoryToApi>> GetCategory(string name)
        {
          if (_context.Category == null)
          {
              return NotFound();
          }
          var res =  DbToCategoryDTO(await _context.Category.FirstOrDefaultAsync(x => x.Name == name));
          return res;
        }

        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory(string categoryName)
        {
          var isCategoryInDb = await _context.Category.FirstOrDefaultAsync(x => x.Name == categoryName);

          if (isCategoryInDb == null)
          {
            var newCategory = new Category { Name = categoryName };
            _context.Category.Add(newCategory);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetCategory", new { name = newCategory.Name }, newCategory);
          }
          return NoContent();

        }

        [HttpDelete("{name}")]
        public async Task<IActionResult> DeleteCategory(string name)
        {
            if (_context.Category == null)
            {
                return NotFound();
            }
            var ticket = await _context.Category.FirstOrDefaultAsync(x => x.Name == name);
            if (ticket == null)
            {
                return NotFound();
            }

            _context.Category.Remove(ticket);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}