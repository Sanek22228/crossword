namespace backend.Contracts;

public record CrosswordRequest(Guid userId, int wordAmount, List<List<string>> grid, List<CrosswordWordRequest> crosswordWords);

