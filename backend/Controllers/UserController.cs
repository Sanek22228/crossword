using Microsoft.AspNetCore.Mvc;
using backend.Contracts;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly PasswordHasher _hasher;
    public UserController(AppDbContext context, PasswordHasher hasher)
    {
        _context = context;
        _hasher = hasher;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRequest request, CancellationToken ct)
    {
        var user = await GetUser(request, ct);
        if(user == null)
        {
            var newUser = new User()
            {
                Email = request.Email,
                Password = _hasher.HashPassword(request.Password)
            };
            newUser.UserName = $"user{newUser.Id}";
            await _context.Users.AddAsync(newUser, ct);
            await _context.SaveChangesAsync(ct);
            return Ok(new
            {
                Email = newUser.Email,
                Id = newUser.Id,
                UserName = newUser.UserName,
            });
        }
        return Unauthorized();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserRequest request, CancellationToken ct)
    {
        var user = await GetUser(request, ct);
        if(user == null || !_hasher.VerifyPassword(request.Password, user.Password ?? "")) {
            return Unauthorized();
        }
        return Ok(new User()
        {
            Id = user.Id,
            Email = user.Email, 
            UserName = user.UserName,
        });
    }

    // возможно вместо UserRequest request передавать только string email
    async Task<User?> GetUser(UserRequest request, CancellationToken ct)
    {
        return await _context.Users.FirstOrDefaultAsync(x => x.Email == request.Email, ct);
    }
    // public async Task<User?> GetUser(Guid id, CancellationToken ct)
    // {
    //     return await _context.Users.FirstOrDefaultAsync(x => x.Id == id, ct);
    // }
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetStats(Guid id, CancellationToken ct)
    {
        try
        {
            var curUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == id, ct);
            return Ok((curUser?.Crosswords.Count, curUser?.CompletedCrosswords));
        }
        catch
        {
            return BadRequest("Неверный идентификатор");
        }
    }
}