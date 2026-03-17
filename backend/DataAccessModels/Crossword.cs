using System.ComponentModel.DataAnnotations.Schema;

public class Crossword
{
    public int Id {get;set;}
    public int UserId {get;set;}
    public DateTime CreatedAt {get;set;}
    public int WordAmount {get;set;}
    [Column(TypeName = "jsonb")]
    public string? Grid {get;set;}
    public User User {get;set;}
}