using PrologV7.Models;

namespace PrologV7.Interfaces
{
    public interface IPostRepository
    {
        Task<IEnumerable<Post>> GetPostsAsync();
        Task<Post> GetPostByIdAsync(int id);
        Task<Post> AddPostAsync(Post post);
        Task<Post> UpdatePostAsync(Post post);
        Task<Post?> DeletePostAsync(int id);
    }
}