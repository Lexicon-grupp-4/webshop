using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webbshop2.Dtos
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public string PictureUrl { get; set; }
        public int CategoryId { get; set; }
        public int Quantity { get; set; }
    }
}
