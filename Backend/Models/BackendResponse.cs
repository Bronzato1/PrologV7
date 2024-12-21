using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace PrologV7.Models
{
    public class BackendResponse<T>
    {
        public bool Status { get; set; }
        public T Entity { get; set; }
        public ModelStateDictionary ModelState { get; set; }
    }
}