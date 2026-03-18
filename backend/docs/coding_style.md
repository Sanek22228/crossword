# Coding Style

## General Naming Conventions (C#)

| Element         | Style      | Example                           |
| --------------- | ---------- | --------------------------------- |
| Classes         | PascalCase | `User`, `Crossword`, `Word`       |
| Properties      | PascalCase | `Email`, `UserName`, `Crosswords` |
| Fields          | _camelCase | `_value`, `_definition`           |
| Local variables | camelCase  | `wordCount`, `currentUser`        |
| Methods         | PascalCase | `CreateUser()`, `AddWord()`       |

---

# Example: Class with Fields and Properties

```csharp
public class Word
{
    private string _value;

    public Word(string val)
    {
        _value = val;
    }

    public string Value
    {
        get => _value;
        set => _value = value;
    }

    public string Definition { get; set; } = string.Empty;
}
```

---

# Example: Entity Framework Model

```csharp
public class User
{
    public int Id { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }

    public string? UserName { get; set; }

    public List<Crossword> Crosswords { get; set; } = new();

    public User() { }

    public User(string email, string password)
    {
        Email = email;
        Password = password;
    }
}
```

---

# Entity Framework Notes

* Entity properties use **PascalCase**
* Navigation properties also use **PascalCase**
* Collections are usually initialized with `= new();`

Example navigation property:

```csharp
public List<Crossword> Crosswords { get; set; } = new();
```
