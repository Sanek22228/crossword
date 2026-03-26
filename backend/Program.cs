using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
}

builder.Services.AddHealthChecks()
    .AddNpgSql(connectionString);

builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseNpgsql(connectionString));
// 2-ой способ
// builder.Services.AddScoped<AppDbContext>();

builder.Services.AddSingleton<PasswordHasher>();    

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("http://localhost:3000");
            policy.AllowAnyHeader();
            policy.AllowAnyMethod();
        });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
        app.UseSwaggerUI(c => 
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    });
}

app.UseCors(); 

app.MapControllers();

app.MapHealthChecks("/health");

app.Map("/", (AppDbContext context) => {return context.Database.CanConnect();});

app.Run();