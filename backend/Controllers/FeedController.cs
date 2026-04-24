using Microsoft.AspNetCore.Mvc;
using backend.Contracts;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class FeedController : ControllerBase
{
    private readonly AppDbContext _context;
    public FeedController(AppDbContext context)
    {
        _context = context;
    }
    [HttpGet("{id:guid?}")]
    public async Task<IActionResult> GetCrosswords(Guid? id, CancellationToken ct)
    {
        IQueryable<Crossword> crosswords = _context.Crosswords;
        if(id.HasValue)
            crosswords = crosswords.Where(c => !c.CompletedByUsers.Any(u => u.Id==id));
        
        crosswords = crosswords.OrderByDescending(c => c.CreatedAt);
        var result = await crosswords.ToListAsync(ct);
        return Ok(result);
    }
}