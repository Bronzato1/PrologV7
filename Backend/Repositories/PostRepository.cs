using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PrologV7.Interfaces;
using PrologV7.Models;

namespace PrologV7.Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<PostRepository> _logger;

        public PostRepository(ApplicationDbContext context, ILogger<PostRepository> logger)
        {
            _context = context;
            _logger = logger;
        }
        
        public async Task<IEnumerable<Post>> GetPostsAsync()
        {
            return await _context.Posts.ToListAsync();
        }
        public async Task<Post> GetPostByIdAsync(int id)
        {
            var post = await _context.Posts.FirstOrDefaultAsync(f => f.Id == id);
            if (post == null) throw new Exception($"Post #{id} not found");
            await _context.SaveChangesAsync();
            return post;
        }
        public async Task<Post> AddPostAsync(Post post)
        {
            post.CreationDate = DateTime.Now;
            await _context.Posts.AddAsync(post);
            await _context.SaveChangesAsync();
            return post;
        }
        public async Task<Post> UpdatePostAsync(Post post)
        {
            post.ModificationDate = DateTime.Now;
            _context.Update(post);
            await _context.SaveChangesAsync();
            return post;
        }
        public async Task<Post?> DeletePostAsync(int id)
        {
            var post = await _context.Posts.FirstOrDefaultAsync(f => f.Id == id);
            if (post is not null)
            {
                _context.Posts.Remove(post);
                await _context.SaveChangesAsync();
                return post;
            }
            return null;
        }
    }
}
