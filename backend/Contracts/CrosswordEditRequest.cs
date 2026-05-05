namespace backend.Contracts;
public record CrosswordEditRequest(string? name, List<string?> questions);