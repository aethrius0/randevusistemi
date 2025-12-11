using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MainRandevuBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddCarWashName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CarWashName",
                table: "Appointments",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CarWashName",
                table: "Appointments");
        }
    }
}
