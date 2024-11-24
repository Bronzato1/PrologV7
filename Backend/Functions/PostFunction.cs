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

                return new OkObjectResult(new BackendResponse { Status = true, Post = newPost });
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
                return new OkObjectResult(new BackendResponse { Status = true, Post = post });
            }
            catch (Exception ex)
            {
                _Logger.LogError($"▀▄▀▄▀▄ Exception catch in {nameof(PostFunction)}.{nameof(UpdatePost)}: " + ex.Message);
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [Function("DeleteCustomer")]
        //*                             
        //* DELETE api/posts/5      
        //*                             
        //! [Valid ateAntiForgeryToken] 
        public async Task<IActionResult> DeletePost([HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "customers/{id}")] HttpRequest req, int id)
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

                return new OkObjectResult(new BackendResponse { Status = true });
            }
            catch (Exception ex)
            {
                _Logger.LogError($"▀▄▀▄▀▄ Exception catch in {nameof(PostFunction)}.{nameof(DeletePost)}: " + ex.Message);
                return new BadRequestObjectResult(ex.Message);
            }
        }
    }
}
