public class User
{
    public int Id {get;set;}
    public string? Email {get;set;}
    public string? Password {get;set;}
    public string? UserName {get;set;}
    public List<Crossword> Crosswords {get;set;} = new();
    public User() { }
    public User(string email,string password)
    {
        Email = email;
        Password = password;
    }
}