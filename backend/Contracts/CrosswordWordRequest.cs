namespace backend.Contracts;
public record CrosswordWordRequest(string text, int startRow, int startCol, bool isSkipped, Direction direction, int wordOrder);