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

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 50, nullable: true),
                    Email = table.Column<string>(maxLength: 255, nullable: true),
                    Password = table.Column<string>(maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
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

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Name", "Password" },
                values: new object[,]
                {
                    { 1, "admin@mail.com", "admin", "$2a$11$O6Ny8ifYB4X0II0RtkThr.U8GZW3sh9ZCCOFXI9iy/Vjy8bcKqCqu" },
                    { 2, "user1@mail.com", "user1", "$2a$11$vA9nbT0sVqRkEC9rXWQr7.uSzCBysQ7o9TzjUYVnyVBByOoluVVvK" },
                    { 3, "user2@mail.com", "user2", "$2a$11$knfAhGe93VlWvmzfTAX5tOVoCamda00YcEAwrgrjozAAJcOSY/ssi" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
