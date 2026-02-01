using System.Text.Json;
using System.Threading.Tasks;
using backend.Contracts;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class WordsController : ControllerBase
{
    // access to configuration to get api key
    private readonly string? _yandexApiKey;
    public WordsController(IConfiguration configuration)
    {
        _yandexApiKey = configuration["YandexApiKey"];
    }

    [HttpPost("validate")]
    public async Task<IActionResult> Validate([FromBody] ValidateWordsRequest request)
    {
        string? uri = $"https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key={_yandexApiKey}"; // &lang={lang}&text=
        string[] words = request.Words;
        var skippedWords = new List<string>();
        using (var httpClient = new HttpClient())
        {
            
            // var response = string.Empty;
            foreach(var word in words)
            {
                var json = await httpClient.GetStringAsync($"{uri}&lang=ru-ru&text={word}");
                using var doc = JsonDocument.Parse(json);

                if(!doc.RootElement.TryGetProperty("def", out var defArray) || defArray.GetArrayLength() == 0)
                {
                    skippedWords.Add(word);
                }
            }
            return skippedWords.Count > 0 ? Ok(skippedWords) : Ok(null);
        };
    }

    [HttpGet]
    public async Task<IActionResult> GetDefinitions()
    {
        return Ok();
    }
}