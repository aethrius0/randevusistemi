using MainRandevuBackend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Controller servisleri
builder.Services.AddControllers();

// Swagger (API testleri ve kontrol için)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// MySQL veritabanı bağlantısı
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    ));

// CORS ayarı - Frontend'in backend'e erişmesini sağlar
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddRazorPages();

var app = builder.Build();

// Development ortamında Swagger açık olsun
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// HTTPS yönlendirmesi 
app.UseHttpsRedirection();

// Statik dosyalar (frontend HTML, CSS, JS için)
var defaultFilesOptions = new DefaultFilesOptions();
defaultFilesOptions.DefaultFileNames.Clear();
defaultFilesOptions.DefaultFileNames.Add("login.html");
app.UseDefaultFiles(defaultFilesOptions);
app.UseStaticFiles();

// Routing (API endpoint'leri için)
app.UseRouting();

// CORS'u aktif et - UseRouting'den sonra, UseAuthorization'dan önce olmalı
app.UseCors("AllowFrontend");

// Authorization (şimdilik pasif ama ileride JWT eklenecek)
app.UseAuthorization();

// API Controller'ları haritalandır
app.MapControllers();

// Statik varlıklar ve Razor Pages (opsiyonel)
app.MapStaticAssets();
app.MapRazorPages().WithStaticAssets();

// Uygulamayı çalıştır
app.Run();