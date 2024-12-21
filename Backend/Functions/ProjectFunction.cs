using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using PrologV7.Interfaces;
using PrologV7.Models;

namespace PrologV7.Functions
{
    public class ProjectFunction
    {
        private readonly IProjectRepository _projectRepository;
        private readonly ILogger<ProjectFunction> _Logger;

        public ProjectFunction(IProjectRepository projectRepository, ILogger<ProjectFunction> logger)
        {
            _projectRepository = projectRepository;
            _Logger = logger;
        }

        [Function("GetProjects")]
        //*                     
        //* GET api/projects   
        //*                     
        public async Task<IActionResult> GetProjects([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "projects")] HttpRequest req)
        {
            try
            {
                Console.WriteLine($"▀▄▀▄▀▄ Called {nameof(ProjectFunction)}.{nameof(GetProjects)} with GET request");
                _Logger.LogInformation($"▀▄▀▄▀▄ Called {nameof(ProjectFunction)}.{nameof(GetProjects)} with GET request");

                return new OkObjectResult(await _projectRepository.GetProjectsAsync());
            }
            catch (Exception ex)
            {
                _Logger.LogError($"▀▄▀▄▀▄ Exception catch in {nameof(ProjectFunction)}.{nameof(GetProjects)}: " + ex.Message);
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [Function("GetProjectById")]
        //*                     
        //* GET api/projects/id/5 
        //*                     
        public async Task<IActionResult> GetProjectById([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "projects/id/{id}")] HttpRequest req, int id)
        {
            try
            {
                Console.WriteLine($"▀▄▀▄▀▄ Called {nameof(ProjectFunction)}.{nameof(GetProjectById)} with GET request");
                _Logger.LogInformation($"▀▄▀▄▀▄ Called {nameof(ProjectFunction)}.{nameof(GetProjectById)} with GET request");

                var project = await _projectRepository.GetProjectByIdAsync(id);
                return new OkObjectResult(project);
            }
            catch (Exception ex)
            {
                _Logger.LogError($"▀▄▀▄▀▄ Exception catch in {nameof(ProjectFunction)}.{nameof(GetProjectById)}: " + ex.Message);
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [Function("GetProjectBySlug")]
        //*                     
        //* GET api/projects/slug/my_project_title
        //*                     
        public async Task<IActionResult> GetProjectBySlug([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "projects/slug/{slug}")] HttpRequest req, string slug)
        {
            try
            {
                Console.WriteLine($"▀▄▀▄▀▄ Called {nameof(ProjectFunction)}.{nameof(GetProjectBySlug)} with GET request");
                _Logger.LogInformation($"▀▄▀▄▀▄ Called {nameof(ProjectFunction)}.{nameof(GetProjectBySlug)} with GET request");

                var project = await _projectRepository.GetProjectBySlugAsync(slug);
                return new OkObjectResult(project);
            }
            catch (Exception ex)
            {
                _Logger.LogError($"▀▄▀▄▀▄ Exception catch in {nameof(ProjectFunction)}.{nameof(GetProjectBySlug)}: " + ex.Message);
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [Function("CreateProject")]
        //*                     
        //* POST api/projects  
        //*                     
        public async Task<IActionResult> CreateProject([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "projects")] HttpRequest req)
        {
            try
            {
                Console.WriteLine($"▀▄▀▄▀▄ Called {nameof(ProjectFunction)}.{nameof(CreateProject)} with POST request");
                _Logger.LogInformation($"▀▄▀▄▀▄ Called {nameof(ProjectFunction)}.{nameof(CreateProject)} with POST request");

                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                var project = JsonConvert.DeserializeObject<Project>(requestBody);
                if (project is null) return new NotFoundResult();

                var newProject = await _projectRepository.AddProjectAsync(project);
                if (newProject == null)
                {
                    return new BadRequestResult();
                }

                return new OkObjectResult(new BackendResponse<Project> { Status = true, Entity = newProject });
            }
            catch (Exception ex)
            {
                _Logger.LogError($"▀▄▀▄▀▄ Exception catch in {nameof(ProjectFunction)}.{nameof(CreateProject)}: " + ex.Message);
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [Function("UpdateProject")]
        //*                         
        //! PUT api/projects/5     
        //*                         
        public async Task<IActionResult> UpdateProject([HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "projects/{id}")] HttpRequest req, int id)
        {
            try
            {
                Console.WriteLine($"▀▄▀▄▀▄ Called {nameof(ProjectFunction)}.{nameof(UpdateProject)} with PUT request");
                _Logger.LogInformation($"▀▄▀▄▀▄ Called {nameof(ProjectFunction)}.{nameof(UpdateProject)} with PUT request");

                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                var project = JsonConvert.DeserializeObject<Project>(requestBody);
                if (project is null) return new NotFoundResult();

                var status = await _projectRepository.UpdateProjectAsync(project);
                if (!status)
                {
                    return new BadRequestResult();
                }
                return new OkObjectResult(new BackendResponse<Project> { Status = true, Entity = project });
            }
            catch (Exception ex)
            {
                _Logger.LogError($"▀▄▀▄▀▄ Exception catch in {nameof(ProjectFunction)}.{nameof(UpdateProject)}: " + ex.Message);
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [Function("DeleteProject")]
        //*                             
        //* DELETE api/projects/5      
        //*                             
        //! [Valid ateAntiForgeryToken] 
        public async Task<IActionResult> DeleteProject([HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "projects/{id}")] HttpRequest req, int id)
        {
            try
            {
                Console.WriteLine($"▀▄▀▄▀▄ Called {nameof(ProjectFunction)}.{nameof(DeleteProject)} with POST request");
                _Logger.LogInformation($"▀▄▀▄▀▄ Called {nameof(ProjectFunction)}.{nameof(DeleteProject)} with POST request");

                // https://stackoverflow.com/questions/56381450/how-to-validate-parameters-sent-to-an-azure-function

                var status = await _projectRepository.DeleteProjectAsync(id);
                if (!status)
                {
                    return new BadRequestResult();
                }

                return new OkObjectResult(new BackendResponse<Project> { Status = true });
            }
            catch (Exception ex)
            {
                _Logger.LogError($"▀▄▀▄▀▄ Exception catch in {nameof(ProjectFunction)}.{nameof(DeleteProject)}: " + ex.Message);
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [Function("UploadImage")]
        //*                     
        //* POST api/projects/upload-image
        //*                     
        public async Task<IActionResult> UploadImage([HttpTrigger(AuthorizationLevel.Anonymous, "project", Route = "projects/upload-image")] HttpRequest req, [FromForm] IFormFile upload)
        {
            try
            {
                Console.WriteLine($"▀▄▀▄▀▄ Called {nameof(ProjectFunction)}.{nameof(UploadImage)} with POST request");
                _Logger.LogInformation($"▀▄▀▄▀▄ Called {nameof(ProjectFunction)}.{nameof(UploadImage)} with POST request");

                var file = req.Form.Files.FirstOrDefault();

                if (file is null) throw new Exception("File to upload not found");
                if (file.Length > 10 * 1024 * 1024) throw new Exception("Max file size exceeded.");
                if (file.Length == 0) throw new Exception("Empty file");

                var allowedExtensions = new[] { ".Jpg", ".png", ".PNG", ".JPG", "JPEG", ".jpg", ".jpeg", ".Heif", ".tiff" };
                var ext = Path.GetExtension(file.FileName);
                if (!allowedExtensions.Contains(ext, StringComparer.OrdinalIgnoreCase)) throw new Exception("Invalid Image type.");

                Stream stream = file.OpenReadStream();
                UploadResponse response = await _projectRepository.UploadProjectImageAsync(stream, file.FileName);

                return new JsonResult(response);
            }
            catch (Exception ex)
            {
                _Logger.LogError($"▀▄▀▄▀▄ Exception catch in {nameof(ProjectFunction)}.{nameof(UploadImage)}: " + ex.Message);
                return new BadRequestObjectResult(ex.Message);
            }
        }

        [Function("DownloadDatabaseeeeeeeeeeeeeeeeeeeeee")]
        //*                     
        //* GET api/projects/download-databaseeeeeeeeeeeeeeeeee
        //*                     
        public async Task<IActionResult> DownloadDatabaseeeeeeeeeeeeeeeee([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "projects/download-databaseeeeeeeeeeeeeeeee")] HttpRequest req)
        {
            try
            {
                Console.WriteLine($"▀▄▀▄▀▄ Called {nameof(ProjectFunction)}.{nameof(DownloadDatabaseeeeeeeeeeeeeeeee)} with GET request");
                _Logger.LogInformation($"▀▄▀▄▀▄ Called {nameof(ProjectFunction)}.{nameof(DownloadDatabaseeeeeeeeeeeeeeeee)} with GET request");

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
                _Logger.LogError($"▀▄▀▄▀▄ Exception catch in {nameof(ProjectFunction)}.{nameof(DownloadDatabaseeeeeeeeeeeeeeeee)}: " + ex.Message);
                return new BadRequestObjectResult(ex.Message);
            }
        }

    }
}
