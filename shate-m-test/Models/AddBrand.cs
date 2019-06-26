using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace shate_m_test.Models
{
    public class AddBrand
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
