using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using webbshop2.Authentication;

namespace webbshop2.Models
{
    public class Order
    {
        private List<OrderItem> orderItems = new List<OrderItem>();

        [Key]
        public int Id { get; set; }

        public DateTime Date { get; set; }

        // should a customer be an ApplicationUser?
        [Required]
        public ApplicationUser Customer { get; set; }

        public List<OrderItem> OrderItems
        {
            get { return orderItems; }
            set { orderItems = value; }
        }
    }
}
