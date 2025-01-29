using Microsoft.EntityFrameworkCore;
using TodosBackEnd.Models;

namespace TodosBackEnd.Seeders
{
    public static class DataBaseSeeder
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Todo>().HasData(
                new Todo() { Id = 1, Name = "NV1", IsComplete = false },
                new Todo() { Id = 2, Name = "NV2", IsComplete = false },
                new Todo() { Id = 3, Name = "NV3", IsComplete = false }
            );
        }
    }
}
