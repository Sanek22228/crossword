using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Crossword
{
    [Key]
    public Guid Id {get;set;} = Guid.NewGuid();
    public Guid UserId {get;set;}
    public DateTime CreatedAt {get;set;}
    public int WordAmount {get;set;}
    [Column(TypeName = "jsonb")]
    public List<List<string>> Grid {get;set;} = new();
    public User User {get;set;} = null!;
    public List<CrosswordWord> CrosswordWords {get;set;} = new();
}