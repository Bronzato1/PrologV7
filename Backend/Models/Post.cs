using System.ComponentModel.DataAnnotations;

namespace PrologV7.Models
{
    public class Post
    {
        [Key]
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public string? Tags { get; set; }
        public DateTime? CreationDate { get; set; }
        public DateTime? ModificationDate { get; set; }
        public PostStatusEnum? Status { get; set; }
        public PostColorEnum? Color { get; set; }
        public PostHeadingEnum? Heading { get; set; }
        public int Span { get; set; }
        public int Height { get; set; }
    }
}
