using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using PrologV7.Interfaces;
using PrologV7.Models;

namespace PrologV7.Functions
{
    public class PostFunction
    {
        private readonly IPostRepository _postRepository;
        private readonly ILogger<PostFunction> _Logger;

        public PostFunction(IPostRepository postRepository, ILogger<PostFunction> logger)
        {
            _postRepository = postRepository;
            _Logger = logger;
        }

        [Function("GetPosts")]
        //*                     
        //* GET api/posts   
        //*                     
        public async Task<IActionResult> GetPosts([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "posts")] HttpRequest req)
        {
            try
            {
                Console.WriteLine($"▀▄▀▄▀▄ Called {nameof(PostFunction)}.{nameof(GetPosts)} with GET request");
                _Logger.LogInformation($"▀▄▀▄▀▄ Called {nameof(PostFunction)}.{nameof(GetPosts)} with GET request");

                return new OkObjectResult(await _postRepository.GetPostsAsync());
            }
            catch (Exception ex)
            {
                _Logger.LogError($"▀▄▀▄▀▄ Exception catch in {nameof(PostFunction)}.{nameof(GetPosts)}: " + ex.Message);
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [Function("GetPostById")]
        //*                     
        //* GET api/posts/id/5 
        //*                     
        public async Task<IActionResult> GetPostById([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "posts/id/{id}")] HttpRequest req, int id)
        {
            try
            {
                Console.WriteLine($"▀▄▀▄▀▄ Called {nameof(PostFunction)}.{nameof(GetPostById)} with GET request");
                _Logger.LogInformation($"▀▄▀▄▀▄ Called {nameof(PostFunction)}.{nameof(GetPostById)} with GET request");

                var post = await _postRepository.GetPostByIdAsync(id);
                return new OkObjectResult(post);
            }
            catch (Exception ex)
            {
                _Logger.LogError($"▀▄▀▄▀▄ Exception catch in {nameof(PostFunction)}.{nameof(GetPostById)}: " + ex.Message);
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [Function("GetPostBySlug")]
        //*                     
        //* GET api/posts/slug/my_post_title
        //*                     
        public async Task<IActionResult> GetPostBySlug([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "posts/slug/{slug}")] HttpRequest req, string slug)
        {
            try
            {
                Console.WriteLine($"▀▄▀▄▀▄ Called {nameof(PostFunction)}.{nameof(GetPostBySlug)} with GET request");
                _Logger.LogInformation($"▀▄▀▄▀▄ Called {nameof(PostFunction)}.{nameof(GetPostBySlug)} with GET request");

                var post = await _postRepository.GetPostBySlugAsync(slug);
                return new OkObjectResult(post);
            }
            catch (Exception ex)
            {
                _Logger.LogError($"▀▄▀▄▀▄ Exception catch in {nameof(PostFunction)}.{nameof(GetPostBySlug)}: " + ex.Message);
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [Function("CreatePost")]
        //*                     
        //* POST api/posts  
        //*                     
        public async Task<IActionResult> CreatePost([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "posts")] HttpRequest req)
        {
            try
            {
                Console.WriteLine($"▀▄▀▄▀▄ Called {nameof(PostFunction)}.{nameof(CreatePost)} with POST request");
                _Logger.LogInformation($"▀▄▀▄▀▄ Called {nameof(PostFunction)}.{nameof(CreatePost)} with POST request");

                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                var post = JsonConvert.DeserializeObject<Post>(requestBody);
                if (post is null) return new NotFoundResult();

                var newPost = await _postRepository.AddPostAsync(post);
                if (newPost == null)
                {
                    return new BadRequestResult();
                }

                return new OkObjectResult(new BackendResponse<Post> { Status = true, Entity = newPost });
            }
            catch (Exception ex)
            {
                _Logger.LogError($"▀▄▀▄▀▄ Exception catch in {nameof(PostFunction)}.{nameof(CreatePost)}: " + ex.Message);
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [Function("UpdatePost")]
        //*                         
        //! PUT api/posts/5     
        //*                         
        public async Task<IActionResult> UpdatePost([HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "posts/{id}")] HttpRequest req, int id)
        {
            try
            {
                Console.WriteLine($"▀▄▀▄▀▄ Called {nameof(PostFunction)}.{nameof(UpdatePost)} with PUT request");
                _Logger.LogInformation($"▀▄▀▄▀▄ Called {nameof(PostFunction)}.{nameof(UpdatePost)} with PUT request");

                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                var post = JsonConvert.DeserializeObject<Post>(requestBody);
                if (post is null) return new NotFoundResult();

                var status = await _postRepository.UpdatePostAsync(post);
                if (!status)
                {
                    return new BadRequestResult();
                }
                return new OkObjectResult(new BackendResponse<Post> { Status = true, Entity = post });
            }
            catch (Exception ex)
            {
                _Logger.LogError($"▀▄▀▄▀▄ Exception catch in {nameof(PostFunction)}.{nameof(UpdatePost)}: " + ex.Message);
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [Function("DeletePost")]
        //*                             
        //* DELETE api/posts/5      
        //*                             
        //! [Valid ateAntiForgeryToken] 
        public async Task<IActionResult> DeletePost([HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "posts/{id}")] HttpRequest req, int id)
        {
            try
            {
                Console.WriteLine($"▀▄▀▄▀▄ Called {nameof(PostFunction)}.{nameof(DeletePost)} with POST request");
                _Logger.LogInformation($"▀▄▀▄▀▄ Called {nameof(PostFunction)}.{nameof(DeletePost)} with POST request");

                // https://stackoverflow.com/questions/56381450/how-to-validate-parameters-sent-to-an-azure-function

                var status = await _postRepository.DeletePostAsync(id);
                if (!status)
                {
                    return new BadRequestResult();
                }

                return new OkObjectResult(new BackendResponse<Post> { Status = true });
            }
            catch (Exception ex)
            {
                _Logger.LogError($"▀▄▀▄▀▄ Exception catch in {nameof(PostFunction)}.{nameof(DeletePost)}: " + ex.Message);
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [Function("UploadImage")]
        //*                     
        //* POST api/posts/upload-image
        //*                     
        public async Task<IActionResult> UploadImage([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "posts/upload-image")] HttpRequest req, [FromForm] IFormFile upload)
        {
            try
            {
                Console.WriteLine($"▀▄▀▄▀▄ Called {nameof(PostFunction)}.{nameof(UploadImage)} with POST request");
                _Logger.LogInformation($"▀▄▀▄▀▄ Called {nameof(PostFunction)}.{nameof(UploadImage)} with POST request");

                var file = req.Form.Files.FirstOrDefault();

                if (file is null) throw new Exception("File to upload not found");
                if (file.Length > 10 * 1024 * 1024) throw new Exception("Max file size exceeded.");
                if (file.Length == 0) throw new Exception("Empty file");

                var allowedExtensions = new[] { ".Jpg", ".png", ".PNG", ".JPG", "JPEG", ".jpg", ".jpeg", ".Heif", ".tiff" };
                var ext = Path.GetExtension(file.FileName);
                if (!allowedExtensions.Contains(ext, StringComparer.OrdinalIgnoreCase)) throw new Exception("Invalid Image type.");

                Stream stream = file.OpenReadStream();
                UploadResponse response = await _postRepository.UploadPostImageAsync(stream, file.FileName);

                return new JsonResult(response);
            }
            catch (Exception ex)
            {
                _Logger.LogError($"▀▄▀▄▀▄ Exception catch in {nameof(PostFunction)}.{nameof(UploadImage)}: " + ex.Message);
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [Function("DownloadDatabase")]
        //*                     
        //* GET api/posts/download-database
        //*                     
        public async Task<IActionResult> DownloadDatabase([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "posts/download-database")] HttpRequest req)
        {
            try
            {
                Console.WriteLine($"▀▄▀▄▀▄ Called {nameof(PostFunction)}.{nameof(DownloadDatabase)} with GET request");
                _Logger.LogInformation($"▀▄▀▄▀▄ Called {nameof(PostFunction)}.{nameof(DownloadDatabase)} with GET request");

                string? database_path = Environment.GetEnvironmentVariable("database_path");

                if (string.IsNullOrEmpty(database_path))
                {
                    throw new Exception("Database path not found.");
                }

                string azure_D_path = @"D:\home";              // RW access - where Azure function store his content per deployment
                string azure_D_DB_path = Path.Combine(azure_D_path, database_path);

                if (string.IsNullOrEmpty(azure_D_DB_path) || !System.IO.File.Exists(azure_D_DB_path))
                {
                    throw new Exception("Database file not found.");
                }

                var memory = new MemoryStream();
                using (var stream = new FileStream(azure_D_DB_path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                {
                    await stream.CopyToAsync(memory);
                }

                memory.Position = 0;

                var contentType = "application/octet-stream";
                var fileName = Path.GetFileName(azure_D_DB_path);

                return new FileStreamResult(memory, contentType)
                {
                    FileDownloadName = fileName
                };
            }
            catch (Exception ex)
            {
                _Logger.LogError($"▀▄▀▄▀▄ Exception catch in {nameof(PostFunction)}.{nameof(DownloadDatabase)}: " + ex.Message);
                return new BadRequestObjectResult(ex.Message);
            }
        }

    }
}
