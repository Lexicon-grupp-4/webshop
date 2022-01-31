using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using webbshop2.Data;
using webbshop2.Dtos;
using webbshop2.Models;

namespace webbshop2.Service
{
    public interface ICategoriesService
    {
        Task<List<CategoryDto>> GetAll();
        Task<Category> Create(Category category);
        Task<Category> FindCategoryById(int id);
    }
    public class CategoriesService : ICategoriesService
    {
        readonly ApplicationDbContext _context;

        public CategoriesService(ApplicationDbContext context)
        {
            _context = context;
        }

        public Task<Category> Create(Category order)
        {
            // TODO Make name unique under parent
            throw new NotImplementedException();
        }

        public Task<Category> Delete(Category order)
        {
            // Rule: dont delete if there are subcategories
            throw new NotImplementedException();
        }

        static public CategoryDto MakeCategoryDto(Category cate)
        {
            return new CategoryDto()
            {
                Id = cate.Id,
                Name = cate.Name,
                ParentId = cate.Parent == null? 0 : cate.Parent.Id
            };
        }

        public async Task<List<CategoryDto>> GetAll()
        {
            var catList = await _context.Categories.ToListAsync(); // .Include(o => o.Parent)
            return catList.ConvertAll(new Converter<Category, CategoryDto>(MakeCategoryDto));
        }

        public async Task<Category> FindCategoryById(int id)
        {
            var cat = await _context.Categories.FindAsync(id);
            // throw if not found
            return cat;
        }
    }
}
