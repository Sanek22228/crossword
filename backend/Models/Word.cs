namespace backend.Models;

public class Word
{
    public Word(string value)
    {
        Value = value;
    }
    public string Value {get; set;} = string.Empty;
    public string Definition {get; set;} = string.Empty;
}