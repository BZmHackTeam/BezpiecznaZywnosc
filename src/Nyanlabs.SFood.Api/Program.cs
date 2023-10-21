using Nyanlabs.SFood.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<EmailClientOptions>(o => builder.Configuration.GetSection("EmailClient").Bind(o));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<EmailClient>();

// builder.Services.AddDbContext<DataContext>(o =>
// {
//     if (builder.Environment.IsDevelopment())
//     {
//         o.UseSqlite("Data Source=/data/store.db;");
//     }
// });

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHttpsRedirection();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
