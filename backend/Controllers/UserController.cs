using Microsoft.AspNetCore.Mvc;
using backend.Contracts;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]

public class UserController : ControllerBase
{
    private readonly AppDbContext _context;
    public UserController(AppDbContext context)
    {
        _context = context;
    }
    [HttpPost]
    public async Task<IActionResult> Hello()
    {
        return Ok("hello");
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRequest request, CancellationToken ct)
    {
        var user = await GetUser(request, ct);
        if(user == null)
        {
            var newUser = new User(request.Email, request.Password);
            await _context.Users.AddAsync(newUser, ct);
            await _context.SaveChangesAsync(ct);
            newUser.UserName = $"user{newUser.Id}";
            await _context.SaveChangesAsync(ct);
            return Ok(new
            {
                Email = newUser.Email,
                Id = newUser.Id,
                UserName = newUser.UserName
            });
        }
        return Unauthorized();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserRequest request, CancellationToken ct)
    {
        var user = await GetUser(request, ct);
        if (user?.Password != request.Password) {
            return Unauthorized();
        }
        return Ok(new User()
        {
            Id = user.Id,
            Email = user.Email, 
            UserName = user.UserName
        });
    }

    // возможно вместо UserRequest request передавать только string email
    async Task<User?> GetUser(UserRequest request, CancellationToken ct)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == request.Email, ct);
        return user;
    }
}