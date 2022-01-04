using Microsoft.EntityFrameworkCore.Migrations;

namespace webbshop2.Migrations
{
    public partial class initialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 50, nullable: true),
                    Price = table.Column<float>(nullable: false),
                    Antal = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Antal", "Name", "Price" },
                values: new object[,]
                {
                    { 1, 20, "Hammare", 100f },
                    { 2, 3, "Borrmaskin", 2000f },
                    { 3, 120, "Såg", 300f },
                    { 4, 300, "Skruvmejsel", 250f }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
