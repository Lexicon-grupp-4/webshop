using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webbshop2.Dtos
{
    public class OrderItemsDto
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
    }

    public class OrderDto
    {
        private List<OrderItemsDto> items;

        public int Id { get; set; }

        public List<OrderItemsDto> Items
        {
            get { return items; }
            set { items = value; }
        }
    }
}
