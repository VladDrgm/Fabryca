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
    public class ProjectsController : ControllerBase
    {
        private readonly FabrycaContext _context;

        public ProjectsController(FabrycaContext context)
        {
            _context = context;
        }

        private List<ProjectToApi> DbToDTO(List<Project> projects)
        {
          var result = new List<ProjectToApi>();

          foreach (var project in projects)
          {
            var temp = new ProjectToApi(project);
            result.Add(temp);
          }
          return result;
        }
        // private bool TicketExists(int id) => (_context.Ticket?.Any(e => e.Id == id)).GetValueOrDefault();

        // GET: api/FabrukaDb
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectToApi>>> GetProjects()
        {
          if (_context.Projects == null)
          {
              return NotFound();
          }
          var res =  DbToDTO(await _context.Projects.ToListAsync());
          return res;
        }

        [HttpPost]
        public async Task<ActionResult<Project>> PostProject(ProjectCreation project)
        {
          if (String.IsNullOrEmpty(project.Name)) return BadRequest("Please choose a unique title for the project.");
          var tick = await _context.Projects.FirstOrDefaultAsync(x => x.Name == project.Name);

          if (tick != null)
          {
            return BadRequest("Please choose a unique title for the project.");
          }

          var DbProject = new Project();

          if (!string.IsNullOrEmpty(project.Name))
          {
            DbProject = new Project { 
                                        Name = project.Name
                                      };
            if (_context.Projects == null)
            {
                return Problem("Entity set 'FabrycaContext.Projects'  is null.");
            }
              _context.Projects.Add(DbProject);
              await _context.SaveChangesAsync();
          }
            return Ok(project);
        }

    //     }

        // DELETE: api/FabrukaDb/5
        [HttpDelete("{name}")]
        public async Task<IActionResult> DeleteTicket(string name)
        {
            if (_context.Projects == null) return NotFound();

            var project = await _context.Projects.FirstOrDefaultAsync(x => x.Name == name);
            if (project == null) return NotFound();

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
