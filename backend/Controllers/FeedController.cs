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
            crosswords = crosswords
                .Include(c => c.CrosswordWords)
                .Include(c => c.User)
                .Where(c => c.UserId != id);
        
        crosswords = crosswords.OrderByDescending(c => c.CreatedAt);
        return Ok(new {
        crosswords = await crosswords.Select(c => new {
            createdAt = c.CreatedAt, 
            name = c.Name, 
            grid = c.Grid, 
            id = c.Id, 
            completed = c.CompletedByUsers.Any(u => u.Id == id),
            user = new{
                userName = c.User.UserName,
                id = c.UserId},
            words = c.CrosswordWords.Select(w => new {
                wordText = w.WordText,
                startRow = w.StartRow,
                startCol = w.StartCol,
                direction = w.Direction,
                order = w.WordOrder,
                question = w.Question
            })
        }).ToListAsync(ct)
        });
    }
}