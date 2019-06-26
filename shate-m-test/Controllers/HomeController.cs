using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> Index()
        {
            var homeModel = new HomeViewModel
            {
                Brands = await context.Brands.ToListAsync(),
                CarModels = await context.CarModels.ToListAsync()
            };
            return View(homeModel);
        }
    }
}
