using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace shate_m_test.DAL
{
    public class Brand
    {
        public int BrandId { get; set; }
        public string Name { get; set; }
        public virtual ICollection<CarModel> CarModels { get; set; }
    }
}
