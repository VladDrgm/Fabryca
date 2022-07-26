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

        [HttpGet("{projectName}")]
        public async Task<ActionResult<IEnumerable<CategoryToApi>>> GetCategories(string projectName)
        {
          if (_context.Category == null)
          {
              return NotFound();
          }
          var res =  DbToCategoriesDTO(await _context.Category.Include(x => x.Project).Where(x => x.Project.Name == projectName).ToListAsync());
          return res;
        }

        [HttpGet("{projectName}/{name}")]
        public async Task<ActionResult<CategoryToApi>> GetCategory(string projectName, string name)
        {
          if (_context.Category == null)
          {
              return NotFound();
          }
          var res =  DbToCategoryDTO(await _context.Category.Include(x => x.Project).Where(x => x.Project.Name == projectName).FirstOrDefaultAsync(x => x.Name == name));
          return res;
        }

        [HttpPost("{projectName}/{categoryName}")]
        public async Task<ActionResult<Category>> PostCategory(string categoryName, string projectName)
        {
          var project = await _context.Projects.FirstOrDefaultAsync(x => x.Name == projectName);
          var isCategoryInDb = await _context.Category.Include(x  => x.Project).Where(x => x.Project == project).FirstOrDefaultAsync(x => x.Name == categoryName);

          if (isCategoryInDb == null)
          {
            var newCategory = new Category { Name = categoryName, Project = project };
            _context.Category.Add(newCategory);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetCategory", new { projectName = newCategory.Name, name = projectName }, newCategory);
          }
          return NoContent();

        }

        [HttpDelete("{projectName}/{name}")]
        public async Task<IActionResult> DeleteCategory(string projectName, string name)
        {
            if (_context.Category == null)
            {
                return NotFound();
            }
            var ticket = await _context.Category.Include(x => x.Project).Where(x => x.Project.Name == projectName).FirstOrDefaultAsync(x => x.Name == name);
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