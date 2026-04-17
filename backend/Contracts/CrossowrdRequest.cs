namespace backend.Contracts;

public record CrosswordRequest(Guid userId, int wordAmount, List<List<object>> grid, List<CrosswordWordRequest> crosswordWords);

