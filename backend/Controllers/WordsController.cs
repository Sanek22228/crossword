using backend.Contracts;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class WordsController : ControllerBase
{
    string[] dictionary = ["собака", "кошка"];

    [HttpPost]
    public IActionResult Validate([FromBody] ValidateWordsRequest request) // переделать позже под async, когда подключу api словаря и буду проверять слова через него
    {
        string[] words = request.Words;
        var skippedWords = new List<string>();
        foreach (var word in words)
        {
            if (!dictionary.Contains(word))
            {
                skippedWords.Add(word);
            }
        }
        return skippedWords.Count == 0 ? Ok(null) : Ok(skippedWords);
    }

    [HttpGet]
    public async Task<IActionResult> GetDefinition()
    {
        return Ok();
    }
}