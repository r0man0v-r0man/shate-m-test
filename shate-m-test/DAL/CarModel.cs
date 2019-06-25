using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace shate_m_test.DAL
{
    public class CarModel
    {
        public int CarModelId { get; set; }
        public string Name { get; set; }
        public int BrandId { get; set; }
        public virtual Brand Brand { get; set; }

    }
}
