using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using shate_m_test.DAL;
using shate_m_test.DAL.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace shate_m_test.Hubs
{
    public class ShateMHub : Hub
    {
        private readonly ShateMContext context;
        public ShateMHub(ShateMContext context)
        {
            this.context = context;
        }
        public async Task AddBrand(string newBrand)
        {
            var newCarBrand = new Brand
            {
                Name = newBrand
            };
            await context.Brands.AddAsync(newCarBrand);
            await context.SaveChangesAsync();
            var test = GetName(context.Brands.FirstOrDefault(c => c.Name == newCarBrand.Name));
            await Clients.All.SendAsync("AddBrand", test);
        }
        public string GetName(Brand brand)
        {
            var result = context.Brands.FirstOrDefault(c=>c.Name == brand.Name);
            return result.Name;
        }
    }
}
