var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.Run(async context => {
    var response = context.Response;
    var request = context.Request;
    var path = request.Path;

    if(path == "publish" && request.Method == "POST")
    {
        
    }
    else if (true)
    {
        
    }
});

app.MapControllers();

app.Run();