namespace backend.Contracts;
public record CrosswordWordResponse(
    string wordText, 
    int startRow, 
    int startCol, 
    Direction direction, 
    int wordOrder, 
    string question
);