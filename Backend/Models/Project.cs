using System.ComponentModel.DataAnnotations;

namespace PrologV7.Models
{
    public class Project
    {
        [Key]
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public string? Tags { get; set; }
        public DateTime? CreationDate { get; set; }
        public DateTime? ModificationDate { get; set; }
        public ProjectStatusEnum? Status { get; set; }
        public ProjectCategoryEnum? Category { get; set; }
    }
}
