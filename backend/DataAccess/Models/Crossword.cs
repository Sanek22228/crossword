using System.ComponentModel.DataAnnotations.Schema;

public class Crossword
{
    public int CrosswordId {get;set;}
    public int UserId {get;set;}
    public DateTime CreatedAt {get;set;}
    public int WordAmount {get;set;}
    [Column(TypeName = "jsonb")]
    public string? Grid {get;set;}
}