// using backend.Contracts;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;

// namespace backend.Controllers;

// [ApiController]
// [Route("[controller]")]

// public class CrosswordController : ControllerBase
// {
//     private readonly AppDbContext _context;
//     public CrosswordController(AppDbContext context)
//     {
//         _context = context;
//     }
//     [HttpPost]
//     public async Task<IActionResult> PublishCrossword([FromBody] CrosswordRequest request)
//     {
//         User? user = await _context.Users.FirstOrDefaultAsync(x => x.Id == request.userId);
//         if(user == null)
//         {
//             return Unauthorized("user not found");
//         }
//         await _context.Crosswords.AddAsync(new Crossword()
//         {
//            UserId = request.userId,
//            CreatedAt = DateTime.Now,
//            WordAmount = request.wordAmount,
//            Grid = request.grid, 
//         });
//         await _context.SaveChangesAsync();
//         return Ok();
//     }
// }