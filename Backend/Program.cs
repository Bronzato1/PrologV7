using Microsoft.Azure.Functions.Worker.Builder;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Azure.Functions.Worker;
using PrologV7;
using PrologV7.Interfaces;
using PrologV7.Repositories;

string database_path = Environment.GetEnvironmentVariable("database_path") ?? string.Empty; // Data\database.db
string azure_C_path = @"C:\home\site\wwwroot"; // RO access - where Azure function is running - no permissions at all here
string azure_D_path = @"D:\home";              // RW access - where Azure function store his content per deployment
string azure_C_DB_path = Path.Combine(azure_C_path, database_path);
string azure_D_DB_path = Path.Combine(azure_D_path, database_path);

void CopyAzureDB()
{
    Console.WriteLine("▀▄▀▄▀▄ Called CopyAzureDB");

	// to avoid 'dabatase is locked' we copy the DB to D drive which allows R/W

	var dir = Path.GetDirectoryName(azure_D_DB_path) ?? string.Empty;

	if (!Directory.Exists(dir))
		Directory.CreateDirectory(dir);

	File.Copy(azure_C_DB_path, azure_D_DB_path);
	File.SetAttributes(azure_D_DB_path, FileAttributes.Normal);
}

bool isDevEnv = Environment.GetEnvironmentVariable("AZURE_FUNCTIONS_ENVIRONMENT") == "Development" ? true : false;

Console.WriteLine("▀▄▀▄▀▄ Configuring applicatin for " + (isDevEnv ? "Development" : "Production"));

// One time copy of the DB (per deployment)
if (!isDevEnv && !File.Exists(azure_D_DB_path)) CopyAzureDB();

var builder = FunctionsApplication.CreateBuilder(args);

builder.ConfigureFunctionsWebApplication();

builder.Services
    .AddApplicationInsightsTelemetryWorkerService()
    .ConfigureFunctionsApplicationInsights()
    .AddDbContextFactory<ApplicationDbContext>(options => options.UseSqlite($"Data Source={(isDevEnv ? database_path : azure_D_DB_path)}"))
    .AddDbContextFactory<ApplicationDbContext>(options => options.UseSqlite($"Data Source={(isDevEnv ? database_path : azure_D_DB_path)}"))
    .AddScoped<IPostRepository, PostRepository>();

builder.Build().Run();
