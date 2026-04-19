namespace backend.Contracts;

public record CrosswordResponse(
    Guid UserId,
    int WordAmount, 
    List<List<object>> Grid, 
    DateTime CreatedAt, 
    List<CrosswordWordResponse> CrosswordWords
);