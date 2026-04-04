using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: true),
                    Password = table.Column<string>(type: "text", nullable: true),
                    UserName = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Crosswords",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    WordAmount = table.Column<int>(type: "integer", nullable: false),
                    Grid = table.Column<List<List<string>>>(type: "jsonb", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Crosswords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Crosswords_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CrosswordWords",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    WordText = table.Column<string>(type: "text", nullable: false),
                    StartRow = table.Column<int>(type: "integer", nullable: false),
                    StartCol = table.Column<int>(type: "integer", nullable: false),
                    IsSkipped = table.Column<bool>(type: "boolean", nullable: false),
                    Direction = table.Column<int>(type: "integer", nullable: false),
                    WordOrder = table.Column<int>(type: "integer", nullable: false),
                    CrosswordId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CrosswordWords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CrosswordWords_Crosswords_CrosswordId",
                        column: x => x.CrosswordId,
                        principalTable: "Crosswords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Crosswords_UserId",
                table: "Crosswords",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_CrosswordWords_CrosswordId",
                table: "CrosswordWords",
                column: "CrosswordId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CrosswordWords");

            migrationBuilder.DropTable(
                name: "Crosswords");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
