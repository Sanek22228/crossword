namespace backend.Contracts;

public record CrosswordRequest(Guid userId, List<List<object>> grid, string? name, List<CrosswordWordRequest> crosswordWords);

