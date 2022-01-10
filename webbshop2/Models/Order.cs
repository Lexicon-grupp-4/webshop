using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace webbshop2.Models
{
    public class Order
    {
        private List<OrderItem> orderItems = new List<OrderItem>();

        [Key]
        public int Id { get; set; }

        public DateTime date;

        // TODO connect to a user somehow
        public int customerId;

        public List<OrderItem> OrderItems
        {
            get { return orderItems; }
            set { orderItems = value; }
        }
    }
}
