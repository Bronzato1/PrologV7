using Azure.Storage.Blobs;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PrologV7.Interfaces;
using PrologV7.Models;

namespace PrologV7.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ProjectRepository> _logger;

        public ProjectRepository(ApplicationDbContext context, ILogger<ProjectRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<Project>> GetProjectsAsync()
        {
            return await _context.Projects.ToListAsync();
        }
        public async Task<Project> GetProjectByIdAsync(int id)
        {
            var project = await _context.Projects.FirstOrDefaultAsync(f => f.Id == id);
            if (project == null) throw new Exception($"Project #{id} not found");
            await _context.SaveChangesAsync();
            return project;
        }
        public async Task<Project> GetProjectBySlugAsync(string slug)
        {
            var title = slug.Replace("_", " ");
            var project = await _context.Projects.FirstOrDefaultAsync(f => f.Title!.ToLower() == title.ToLower());
            if (project == null) throw new Exception($"Project {slug} not found");
            await _context.SaveChangesAsync();
            return project;
        }

        public async Task<Project> AddProjectAsync(Project project)
        {
            project.CreationDate = DateTime.Now;
            await _context.Projects.AddAsync(project);
            await _context.SaveChangesAsync();
            return project;
        }
        public async Task<bool> UpdateProjectAsync(Project project)
        {
            project.ModificationDate = DateTime.Now;
            _context.Update(project);
            try
            {
                return (await _context.SaveChangesAsync() > 0 ? true : false);
            }
            catch (Exception exp)
            {
                _logger.LogError($"Error in {nameof(UpdateProjectAsync)}: " + exp.Message);
            }
            return false;
        }
        public async Task<bool> DeleteProjectAsync(int id)
        {
            var project = await _context.Projects.FirstOrDefaultAsync(f => f.Id == id);
            if (project is not null)
            {
                _context.Projects.Remove(project);
            }
            try
            {
                return (await _context.SaveChangesAsync() > 0 ? true : false);
            }
            catch (System.Exception exp)
            {
                _logger.LogError($"Error in {nameof(DeleteProjectAsync)}: " + exp.Message);
            }
            return false;
        }
        public async Task<UploadResponse> UploadProjectImageAsync(Stream stream, string filename)
        {
            string? Connection = Environment.GetEnvironmentVariable("AzureWebJobsStorage");
            string? containerName = Environment.GetEnvironmentVariable("ContainerName");

            var blobClient = new BlobContainerClient(Connection, containerName);
            var ext = Path.GetExtension(filename);
            var blob = blobClient.GetBlobClient($"image_{Guid.NewGuid().ToString()}{ext}");

            await blob.UploadAsync(stream);

            var response = new UploadResponse
            {
                Uploaded = 1,
                FileName = blob.Name,
                Url = blob.Uri.ToString()
            };
            return response;
        }
    }
}
