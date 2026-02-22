using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    [HttpPost]
    void Register([FromBody] string userData)
    {
        
    }

    [HttpGet]
    void Login()
    {
        
    }
}