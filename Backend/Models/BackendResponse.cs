using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace PrologV7.Models
{
    public class BackendResponse
    {
        public bool Status { get; set; }
        public Post Post { get; set; }
        public ModelStateDictionary ModelState { get; set; }
    }
}