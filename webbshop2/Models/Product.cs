using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace webbshop2.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; } 
        [MaxLength(50)]
        public string Name { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public string PictureUrl { get; set; }
        public string Type { get; set; }
        public string Brand { get; set; }
        public int Quantity { get; set; }
    }
}
