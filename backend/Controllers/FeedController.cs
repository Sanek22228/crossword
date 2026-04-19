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
    [HttpGet]
    public async Task<IActionResult> GetCrosswords(CancellationToken ct)
    {
        var crosswords = await _context.Crosswords.ToListAsync(ct);
        return Ok(crosswords);
    }
}