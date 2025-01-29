
using Microsoft.EntityFrameworkCore;
using TodosBackEnd.Data;
using TodosBackEnd.Service.Todos;

namespace TodosBackEnd
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<TodosDbContext>(option =>
            {
                option.UseSqlServer(builder.Configuration.GetConnectionString("TodosDatabase"));
            });

            builder.Services.AddTransient<ITodosService, TodosService>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // Thể hiện cách sử dụng UseCors with CorsPolicyBuilder

            app.UseCors( builder =>
                {
                    builder
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader(); 
                }
            );

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
