using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;
using webbshop2.Authentication;
using webbshop2.Dtos;

namespace webbshop2.Service
{
    public interface IUserService
    {
        Task<ApplicationUser> Create(RegisterDto user);
        Task<ApplicationUser> GetUserByName(string name);
    }

    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> userManager;
        //private readonly RoleManager<IdentityRole> roleManager;

        public UserService(UserManager<ApplicationUser> userManager)
        {
            this.userManager = userManager;
        }

        public async Task<ApplicationUser> Create(RegisterDto model)
        {
            ApplicationUser userExists = await userManager.FindByNameAsync(model.UserName);
            if (userExists != null)
            {
                throw new ServiceException(String.Format("user {0} already existing ", model.UserName));
            }
            ApplicationUser user = new ApplicationUser()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.UserName
            };
            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                throw new ServiceException("failed to create account");
            }
            await userManager.AddToRoleAsync(user, UserRoles.User);
            return user;
        }

        public async Task<ApplicationUser> GetUserByName(String name)
        {
            var user = await userManager.FindByNameAsync(name);
            if (user == null)
            {
                return null;
            }
            return user;
        }
    }
}
