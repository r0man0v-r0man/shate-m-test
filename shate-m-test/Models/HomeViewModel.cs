using shate_m_test.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace shate_m_test.Models
{
    public class HomeViewModel
    {
        public List<Brand> Brands { get; set; }
        public List<CarModel> CarModels { get; set; }
    }
}
