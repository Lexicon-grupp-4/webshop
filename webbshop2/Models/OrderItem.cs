using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace webbshop2.Models
{
    /**
     * An order has list of order items 
     **/
    public class OrderItem
    {
        [Key]
        public int Id { get; set; }

        public float Price { get; set; }

        public int Quantity { get; set; }

        public int ProductId { get; set; }
    }
}
