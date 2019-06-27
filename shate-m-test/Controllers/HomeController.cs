using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using shate_m_test.DAL;
using shate_m_test.DAL.Context;
using shate_m_test.Models;

namespace shate_m_test.Controllers
{
    public class HomeController : Controller
    {
        private readonly ShateMContext context;
        public HomeController(ShateMContext context)
        {
            this.context = context;
        }
        public IActionResult Index()
        {
            List<BrandViewModel> BrandList = new List<BrandViewModel>();
            foreach (var brand in context.Brands)
            {
                BrandList.Add(new BrandViewModel
                {
                    Name = brand.Name,
                    Id = brand.BrandId
                });
            }
            
            ViewBag.BrandList = context.Brands.Select(a => new SelectListItem() { Value = a.BrandId.ToString(), Text = a.Name }).ToList();

            return View(BrandList);
        }

       
    }
}
