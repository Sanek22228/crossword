using System.ComponentModel.DataAnnotations;

public class CrosswordWord
{
    [Key]
    public Guid Id {get;set;} = Guid.NewGuid();
    public string WordText {get;set;} = null!; // null-forgiving operator отключает предупреждение
    public int StartRow {get;set;}
    public int StartCol {get;set;}
    public bool IsSkipped {get;set;}
    public Direction Direction {get;set;}
    public int WordOrder {get;set;}
    public string Question {get; set;} = null!;
    public Guid CrosswordId {get;set;}
    public Crossword Crossword {get;set;} = null!;
}

public enum Direction: int
{
    Vertical = 0,
    Horizontal = 1
}