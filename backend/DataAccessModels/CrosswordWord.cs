using System.ComponentModel.DataAnnotations.Schema;

public class CrosswordWord
{
    public int Id {get;set;}
    public string? WordText {get;set;}
    public int StartRow {get;set;}
    public int StartCol {get;set;}
    public bool IsSkipped {get;set;}
    public Direction Direction {get;set;}
    public int WordOrder {get;set;}
    public int CrosswordId {get;set;}
    public Crossword Crossword {get;set;}
}

public enum Direction: int
{
    Vertical,
    Horizontal
}