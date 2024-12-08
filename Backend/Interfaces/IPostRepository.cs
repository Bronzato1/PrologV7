using PrologV7.Models;

namespace PrologV7.Interfaces
{
    public interface IPostRepository
    {
        Task<IEnumerable<Post>> GetPostsAsync();
        Task<Post> GetPostByIdAsync(int id);
        Task<Post> GetPostBySlugAsync(string slug);
        Task<Post> AddPostAsync(Post post);
        Task<bool> UpdatePostAsync(Post post);
        Task<bool> DeletePostAsync(int id);
        Task<UploadResponse> UploadPostImageAsync(Stream stream, string filename);
    }
}