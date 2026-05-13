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
    public async Task<IActionResult> GetFeed(Guid? id, CancellationToken ct)
    {
        IQueryable<Crossword> crosswords = _context.Crosswords;
        if(id.HasValue)
            crosswords = crosswords.Include(c => c.User).Where(c => c.UserId != id);
        
        crosswords = crosswords.OrderByDescending(c => c.CreatedAt);
        var result = await crosswords.Select(c => new {
            createdAt = c.CreatedAt, 
            name = c.Name, 
            grid = c.Grid, 
            id = c.Id, 
            completed = c.CompletedByUsers.Any(u => u.Id == id),
            userId = c.UserId,
            user = new{
                userName = c.User.UserName}
        }).ToListAsync(ct);
        return Ok(result);
    }
}