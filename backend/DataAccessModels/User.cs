using System.ComponentModel.DataAnnotations;

public class User
{
    [Key]
    public Guid Id {get;init;}
    //  = Guid.NewGuid();
    public string? Email {get;set;}
    public string? Password {get;set;}
    public string? UserName {get;set;}
    public int CompletedCrosswords {get;set;} = 0;
    public List<Crossword> Crosswords {get;set;} = new();
    public User() { }
}