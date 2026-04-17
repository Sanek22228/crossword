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
        var user = await GetUser(request.Email, ct);
        if(user == null)
        {
            var newUser = new User()
            {
                Email = request.Email,
                Password = _hasher.HashPassword(request.Password),
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
        var user = await GetUser(request.Email, ct);
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

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UserUpdateRequest userUpdateData, CancellationToken ct)
    {
        try
        {    
            User? user = await GetUser(id, ct);
            if(user != null)
            {  
                if(user.UserName != userUpdateData.userName)
                {
                    user.UserName = userUpdateData.userName;
                    await _context.SaveChangesAsync(ct);
                }
                // if(user.IconPath != userUpdateData.iconPath)
                //     user.IconPath = userUpdateData.iconPath;
                // return Ok({user.UserName, user.IconPath});
                return Ok(user.UserName);
            }
            else
            {
                throw new Exception($"Couldn't find user by id: {id}");
            }
        }
        catch(Exception e)
        {
            return NotFound(e);
        }
    }
    // возможно вместо UserRequest request передавать только string email
    async Task<User?> GetUser(string email, CancellationToken ct)
    {
        return await _context.Users.FirstOrDefaultAsync(x => x.Email == email, ct);
    }
    async Task<User?> GetUser(Guid id, CancellationToken ct)
    {
        return await _context.Users.FirstOrDefaultAsync(x => x.Id == id, ct);
    }
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetStats(Guid id, CancellationToken ct)
    {
        try
        {
            var user = await _context.Users
                .Include(u => u.Crosswords)
                .ThenInclude(c => c.CrosswordWords)
                .FirstOrDefaultAsync(u => u.Id == id, ct);
            var crosswords = user?.Crosswords.Select(c => new {
                c.Id, 
                c.CreatedAt, 
                c.Grid, 
                Words = c.CrosswordWords.Select(w => new
                {
                    w.Id,
                    w.WordText,
                    w.WordOrder,
                    w.IsSkipped,
                    w.Direction,
                    w.StartCol,
                    w.StartRow
                })
            });
            var completed = user?.CompletedCrosswords;
            return Ok(new
            {
                Crosswords = crosswords,
                Completed = completed
            });
        }
        catch
        {
            return BadRequest("Неверный идентификатор");
        }
    }
}