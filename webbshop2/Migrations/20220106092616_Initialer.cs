using Microsoft.EntityFrameworkCore.Migrations;

namespace webbshop2.Migrations
{
    public partial class Initialer : Migration
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
                    Description = table.Column<string>(nullable: true),
                    Price = table.Column<float>(nullable: false),
                    PictureUrl = table.Column<string>(nullable: true),
                    Type = table.Column<string>(nullable: true),
                    Brand = table.Column<string>(nullable: true),
                    Quantity = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Brand", "Description", "Name", "PictureUrl", "Price", "Quantity", "Type" },
                values: new object[,]
                {
                    { 1, "brand", "description", "Hammare", "/images/products/p.png", 100f, 20, "type" },
                    { 2, "brand", "description", "Köttbulletång", "/images/products/p.png", 210f, 6, "type" },
                    { 3, "brand", "description", "Borrmaskin", "/images/products/p.png", 2000f, 3, "type" },
                    { 4, "brand", "description", "Skruvmejsel", "/images/products/p.png", 250f, 300, "type" },
                    { 5, "brand", "description", "Såg", "/images/products/p.png", 300f, 120, "type" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
