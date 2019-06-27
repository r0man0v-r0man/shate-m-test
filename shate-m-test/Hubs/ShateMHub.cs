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
        public async Task AddBrand(string newBrandName)
        {
            
            await context.Brands.AddAsync(new Brand
            {
                Name = newBrandName
            });
            await context.SaveChangesAsync();
            
            await Clients.All.SendAsync("AddBrand", 
                                        context.Brands.FirstOrDefault(c=>c.Name == newBrandName).Name,
                                        context.Brands.FirstOrDefault(c => c.Name == newBrandName).BrandId
                                        );
        }
        public async Task AddCarModel(int brandId, string modelName)
        {
            await context.CarModels.AddAsync(new CarModel { Name = modelName, BrandId = brandId});
            await context.SaveChangesAsync();
            await Clients.All.SendAsync("AddCarModel", "test");
        }
    }
}
