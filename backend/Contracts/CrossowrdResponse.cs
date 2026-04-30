namespace backend.Contracts;

public record CrosswordResponse(
    Guid UserId,
    string? Name, 
    List<List<object>> Grid, 
    DateTime CreatedAt, 
    List<CrosswordWordResponse> CrosswordWords
);