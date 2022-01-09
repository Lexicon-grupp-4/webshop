using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace webbshop2.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }

        public DateTime date;

        public int customerId;
    }
}
