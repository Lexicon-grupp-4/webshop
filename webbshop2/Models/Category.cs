using System.ComponentModel.DataAnnotations;

namespace webbshop2.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }

        public Category Parent { get; set; }

        public string Name { get; set; }
    }
}
