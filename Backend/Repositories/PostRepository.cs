using Azure.Storage.Blobs;
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
            return await _context.Posts.AsNoTracking().ToListAsync();
        }
        public async Task<Post> GetPostByIdAsync(int id)
        {
            var post = await _context.Posts.AsNoTracking().FirstOrDefaultAsync(f => f.Id == id);
            if (post == null) throw new Exception($"Post #{id} not found");
            return post;
        }
        public async Task<Post> GetPostBySlugAsync(string slug)
        {
            var title = slug.Replace("_", " ");
            var post = await _context.Posts.AsNoTracking().FirstOrDefaultAsync(f => f.Title!.ToLower() == title.ToLower());
            if (post == null) throw new Exception($"Post {slug} not found");
            return post;
        }

        public async Task<Post> AddPostAsync(Post post)
        {
            post.CreationDate = DateTime.Now;
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                await _context.Posts.AddAsync(post);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            return post;
        }
        public async Task<bool> UpdatePostAsync(Post post)
        {
            post.ModificationDate = DateTime.Now;
            _context.Update(post);
            try
            {
                using (var transaction = await _context.Database.BeginTransactionAsync())
                {
                    await _context.SaveChangesAsync();
                    await transaction.CommitAsync();
                }
                return true;
            }
            catch (Exception exp)
            {
                _logger.LogError($"Error in {nameof(UpdatePostAsync)}: " + exp.Message);
            }
            return false;
        }
        public async Task<bool> DeletePostAsync(int id)
        {
            var post = await _context.Posts.FirstOrDefaultAsync(f => f.Id == id);
            if (post is not null)
            {
                _context.Posts.Remove(post);
            }
            try
            {
                using (var transaction = await _context.Database.BeginTransactionAsync())
                {
                    await _context.SaveChangesAsync();
                    await transaction.CommitAsync();
                }
                return true;
            }
            catch (System.Exception exp)
            {
                _logger.LogError($"Error in {nameof(DeletePostAsync)}: " + exp.Message);
            }
            return false;
        }
        public async Task<UploadResponse> UploadPostImageAsync(Stream stream, string filename)
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
