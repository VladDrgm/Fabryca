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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryToApi>>> GetCategories()
        {
          if (_context.Category == null)
          {
              return NotFound();
          }
          var res =  DbToCatDTO(await _context.Category.ToListAsync());
          return res;
        }
    }
}