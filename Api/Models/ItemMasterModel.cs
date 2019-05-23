using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public class ItemMasterModel
    {
        public int ItemID { get; set; }

        public string CategoryName { get; set; }

        public string ItemName { get; set; }
        public int CategoryId { get; set; }
    }
}