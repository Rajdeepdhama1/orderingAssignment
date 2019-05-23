using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public class RegistrationModel
    {
        public int UserID { get; set; }
        public string UserName { get; set; }
        public int Phone { get; set; }
        public string Address { get; set; }
        public int CountryID { get; set; }
        public int StateID { get; set; }
        public int CityID { get; set; }
    }
}