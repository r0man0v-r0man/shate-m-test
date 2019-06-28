using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
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
            if (!String.IsNullOrWhiteSpace(newBrandName))
            {
                await context.Brands.AddAsync(new Brand
                {
                    Name = newBrandName
                });
                await context.SaveChangesAsync();

                await Clients.All.SendAsync("AddBrand",
                                            context.Brands.FirstOrDefault(c => c.Name == newBrandName).Name,
                                            context.Brands.FirstOrDefault(c => c.Name == newBrandName).BrandId
                                            );
            }
            
        }
        public async Task AddCarModel(int brandId, string modelName)
        {
            if (!String.IsNullOrWhiteSpace(modelName))
            {
                await context.CarModels.AddAsync(new CarModel { Name = modelName, BrandId = brandId });
                await context.SaveChangesAsync();
                await Clients.All.SendAsync("AddCarModel");
            }
            
        }
        public async Task GetModels(int id)
        {
            List<CarModel> modelList = context.CarModels.Where(c => c.BrandId == id).ToList();
            var result = JsonConvert.SerializeObject(modelList, new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
            await Clients.All.SendAsync("GetModels", result, id);
        }
    }
}
