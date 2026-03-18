namespace backend.Models;

public class Word
{
    public Word(string val)
    {
        Value = val;
    }
    public string Value {get; set;} = string.Empty;
    public string Definition {get; set;} = string.Empty;
}