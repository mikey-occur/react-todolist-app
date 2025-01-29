using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TodosBackEnd.Models;

namespace TodosBackEnd.Configuration
{
    public class TodoConfiguration : IEntityTypeConfiguration<Todo>
    {
        public void Configure(EntityTypeBuilder<Todo> builder)
        {
            builder.ToTable("todos"); //  đặt tên table là todos
            builder.HasKey(t => t.Id); // cái này là cài mặc định id là khóa chính
            builder.Property(t => t.Name).IsRequired(); // IsRequired là bắt buộc trường này phải có dữ liệu không được để null
            builder.Property(t => t.IsComplete).IsRequired().HasDefaultValue(false);
            // HasDefaultValue(false) mặc định khi sinh trường mới sẽ là false 
        }
    }
}
