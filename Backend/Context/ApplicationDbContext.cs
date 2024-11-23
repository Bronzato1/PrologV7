using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PrologV7.Models;

namespace PrologV7
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Post> Posts { get; set; }

        private readonly ILogger<ApplicationDbContext> _logger;

        //public ApplicationDbContext()
        //{
        //    // Constructor parameterless will be used for...
        //    // dotnet ef migrations add...
        //    // dotnet ef database update...
        //}

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, ILogger<ApplicationDbContext> logger) : base(options)
        {
            _logger = logger;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            Console.WriteLine("██ ApplicationDbContext.OnConfiguring");

            /*****************************************************

                OnConfiguring called to configure the db context.
                
                When?
                Whenever you execute code like below:
                - dotnet ef migrations add InitialCreate
                - dotnet ef database update
                
                Warning! 
                Don't forget to set environment variable first like below:
                $env: .... = ....
                
                Why? 
                Because local.settings.json is not accessible when executing from the terminal.
                
                *****************************************************
                
                Etapes pour la création de la base de données (à exécuter dans le terminal):
                
                -> $env:AZURE_FUNCTIONS_ENVIRONMENT='Development'
                -> $env:database_path='Data\database.db'

                -> dotnet ef migrations add InitialCreate --project .\Backend.csproj --startup-project .\Backend.csproj --verbose

                Rem: le répertoire Migrations sera créé automatiquement

                créer le répertoire Data ou sera stockée la database (il n'est pas créé automatiquement)

                -> dotnet ef database update --project .\Backend.csproj --startup-project .\Backend.csproj

                Rem: maintenant la database existe dans le répertoire Data

                Adapter le Backend.csproj pour copier la database dans le répertoire de sortie

                <None Update="Data\database.db">
                    <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
                </None>
                
                Instruction pour ajouter une nouvelle étape de migration:
                -> dotnet ef migrations add AddSomeTables --project .\Backend --startup-project .\Backend --verbose
                
                Instruction pour revenir à une migration précédente:
                -> dotnet ef database update InitialCreate --project .\Backend --startup-project .\Backend
                
                !!! Supprimer le fichier de la migration et d'éditer manuellement le fichier ApplicationDbContextModelSnapshot.cs
                
            *************************************************/


            bool isDevEnv = Environment.GetEnvironmentVariable("AZURE_FUNCTIONS_ENVIRONMENT") == "Development" ? true : false;

            string? database_path = Environment.GetEnvironmentVariable("database_path"); // Data\database.db
            if (database_path is null) throw new Exception(">>> database_path value not found");
            string? azure_D_path = @"D:\home"; // RW access - where Azure function store his content per deployment
            string? azure_D_DB_path = Path.Combine(azure_D_path, database_path);

            if (_logger != null)
            {
                _logger.LogInformation($">>> Called OnConfiguring in class ${ nameof(ApplicationDbContext)}");
                _logger.LogInformation($">>> Data Source={(isDevEnv ? database_path : azure_D_DB_path)}");
            }

            Console.WriteLine($">>> AZURE_FUNCTIONS_ENVIRONMENT: {Environment.GetEnvironmentVariable("AZURE_FUNCTIONS_ENVIRONMENT")}");

            optionsBuilder.UseSqlite($"Data Source={(isDevEnv ? database_path : azure_D_DB_path)}");
        }
    }

}

