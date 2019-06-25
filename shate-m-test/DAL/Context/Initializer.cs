using System.Linq;
using System.Threading.Tasks;

namespace shate_m_test.DAL.Context
{
    public class Initializer
    {
        public static async Task InitializeAsync(ShateMContext context)
        {
            context.Database.EnsureCreated();

            // Look for any 
            if (context.Brands.Any())
            {
                return;   // DB has been seeded
            }

            var brands = new Brand[]
            {
                new Brand{Name = "Lada"},
                new Brand{Name = "Volkswagen"},
                new Brand{Name = "Mercedes"},
            };
            foreach (var brand in brands)
            {
                await context.Brands.AddAsync(brand);
            }
            await context.SaveChangesAsync();
        }
    }
}
