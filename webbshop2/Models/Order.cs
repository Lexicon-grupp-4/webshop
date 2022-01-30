using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using webbshop2.Authentication;

namespace webbshop2.Models
{
    public enum OrderStatus
    {
        Processing, // Order has been sent from customer
        InTransit, // Order has been assembled (and probably sent)
        Cancelled,
        Delivered,
        Problem
    }
    public class Order
    {
        private List<OrderItem> orderItems = new List<OrderItem>();

        [Key]
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public OrderStatus Status { get; set; }

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
