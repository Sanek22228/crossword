using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<User> Users {get; set;}
    public DbSet<Crossword> Crosswords {get; set;}
    public DbSet<CrosswordWord> CrosswordWords {get; set;}

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        Database.EnsureCreated();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<User>().
            HasMany(u => u.CompletedCrosswords)
            .WithMany(c => c.CompletedByUsers)
            .UsingEntity(j => j.ToTable("UserCompletedCrosswords"));
        modelBuilder.Entity<Crossword>().
            HasOne(c => c.User)
            .WithMany(u => u.Crosswords)
            .HasForeignKey(c => c.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
    // 2-ой способ. более нестандартный
    // private readonly IConfiguration _configuration;
    // public AppDbContext(IConfiguration configuration)
    // {
    //     _configuration = configuration;
    // }
    // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    // {
    //     optionsBuilder.UseNpgsql(_configuration.GetConnectionString("DefaultConnection"));
    // }
}