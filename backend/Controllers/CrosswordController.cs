using backend.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]

public class CrosswordController : ControllerBase
{
    private readonly AppDbContext _context;
    public CrosswordController(AppDbContext context)
    {
        _context = context;
    }
    [HttpPost]
    public async Task<IActionResult> PublishCrossword([FromBody] CrosswordRequest request, CancellationToken ct)
    {
        User? user = await _context.Users.FirstOrDefaultAsync(x => x.Id == request.userId, ct);
        if(user == null)
        {
            return Unauthorized("user not found");
        }
        Crossword curCrossword = new Crossword(){
            UserId = request.userId,
            CreatedAt = DateTime.UtcNow,
            WordAmount = request.wordAmount,
            Grid = request.grid
            // Grid = System.Text.Json.JsonSerializer.Serialize(request.grid);
        };
        curCrossword.CrosswordWords = request.crosswordWords.Select(w => new CrosswordWord()
        {
            WordText = w.text,
            StartRow = w.startRow,
            StartCol = w.startCol,
            IsSkipped = w.isSkipped,
            Direction = w.direction,
            WordOrder = w.wordOrder,
            Question = w.question
        }).ToList();

        await _context.Crosswords.AddAsync(curCrossword, ct);
        await _context.SaveChangesAsync(ct);
        return Ok();
    }
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetUserCrosswords(Guid id)
    {
        var crosswords = await _context.Crosswords.Where(crossword => crossword.UserId == id).ToListAsync();
        return Ok(crosswords);
    }
}