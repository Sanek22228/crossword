using System.Collections.Concurrent;
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
    // private readonly string? _yandexApiKey;
    // public WordsController(IConfiguration configuration)
    // {
    //     _yandexApiKey = configuration["YandexApiKey"];
    // }

    [HttpPost("validate")]
    public async Task<ActionResult> Validate([FromBody] ValidateWordsRequest request)
    {
        // string? uri = $"https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key={_yandexApiKey}"; // &lang={lang}&text=
        string? uri = $"https://freedictionaryapi.com/api/v1/entries/ru"; // /lang/word
        string[] words = request.Words;
        ConcurrentBag<string> skippedWords = new ConcurrentBag<string>();
        using (var httpClient = new HttpClient())
        {
            var semaphore = new SemaphoreSlim(5); // допускает 5 параллельных операций
            var tasks = words.Select(word => ProcessValidation(httpClient, uri, word, skippedWords, semaphore));
            await Task.WhenAll(tasks);
        }
        return skippedWords.Count > 0 ? Ok(skippedWords) : Ok("");
    }

    private async Task ProcessValidation(HttpClient client, string uri, string word, ConcurrentBag<string> skippedWords, SemaphoreSlim semaphore)
    {
        await semaphore.WaitAsync(); // ждем, пока освободится слот
        try
        {
            var json = await client.GetStringAsync($"{uri}/{word}");
            using var doc = JsonDocument.Parse(json);
            if(!doc.RootElement.TryGetProperty("entries", out var defArray) || defArray.GetArrayLength() == 0)
            {
                skippedWords.Add(word);
            }
        }
        catch
        {
            skippedWords.Add(word);
        }
        finally
        {
            semaphore.Release(); // совобождает слот
        }
    }

    [HttpGet]
    public async Task<ActionResult> GetDefinitions()
    {
        return Ok("definitions");
    }
}