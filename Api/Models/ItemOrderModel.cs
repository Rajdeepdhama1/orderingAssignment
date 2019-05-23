using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public class ItemOrderModel
    {
        public int ItemOrderQuantity { get; set; }

        public decimal TotalAmount { get; set; }

        public int ItemID { get; set; }

        public int customerID { get; set; }
    }
}