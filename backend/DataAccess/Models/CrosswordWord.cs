public class CrosswordWord
{
    public int WordId {get;set;}
    public int CrosswordId {get;set;}
    public string? WordText {get;set;}
    public int StartRow {get;set;}
    public int StartCol {get;set;}
    public bool IsSkipped {get;set;}
    public Direction Direction {get;set;}
    public int WordOrder {get;set;}
}

public enum Direction
{
    Vertical,
    Horizontal
}