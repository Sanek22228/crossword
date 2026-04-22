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
            Direction = w.direction,
            WordOrder = w.wordOrder,
            Question = w.question
        }).ToList();

        await _context.Crosswords.AddAsync(curCrossword, ct);
        await _context.SaveChangesAsync(ct);
        return Ok();
    }
    [HttpGet("user/{id:guid}")]
    public async Task<IActionResult> GetUserCrosswords(Guid id)
    {
        var crosswords = await _context.Crosswords.Where(crossword => crossword.UserId == id).ToListAsync();
        return Ok(crosswords);
    }
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetCrosswordById(Guid id, CancellationToken ct)
    {
        // try{
            var crossword = await _context.Crosswords
                .Include(c => c.CrosswordWords)
                .FirstOrDefaultAsync(c => c.Id == id, ct) ?? throw new Exception("not found");
            var words = crossword.CrosswordWords.Select(w => new CrosswordWordResponse(
                w.WordText,
                w.StartRow,
                w.StartCol,
                w.Direction,
                w.WordOrder,
                w.Question
            )).ToList();
            var crosswordResponse = new CrosswordResponse(
                crossword.UserId,
                crossword.WordAmount,
                crossword.Grid,
                crossword.CreatedAt,
                words
            );
            return Ok(crosswordResponse);
        // } catch(Exception e)
        // {
        //     return NotFound(e.Message);
        // }
    }
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteCrossword(Guid id, CancellationToken ct)
    {
        try
        {
            var crossword = await _context.Crosswords.FirstOrDefaultAsync(c => c.Id == id, ct) ?? throw new Exception("not found");
            if (crossword != null)
            {
                _context.Crosswords.Remove(crossword);   
                await _context.SaveChangesAsync(ct);
            }
        }
        catch(Exception e)
        {
            return NotFound(e.Message);
        }
        return Ok("crossword deleted");
    }
}