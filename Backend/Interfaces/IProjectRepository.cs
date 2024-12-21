using PrologV7.Models;

namespace PrologV7.Interfaces
{
    public interface IProjectRepository
    {
        Task<IEnumerable<Project>> GetProjectsAsync();
        Task<Project> GetProjectByIdAsync(int id);
        Task<Project> GetProjectBySlugAsync(string slug);
        Task<Project> AddProjectAsync(Project project);
        Task<bool> UpdateProjectAsync(Project project);
        Task<bool> DeleteProjectAsync(int id);
        Task<UploadResponse> UploadProjectImageAsync(Stream stream, string filename);
    }
}