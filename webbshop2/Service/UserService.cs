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
    }

    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> userManager;

        public UserService(UserManager<ApplicationUser> userManager)
        {
            this.userManager = userManager;
        }

        public async Task<ApplicationUser> Create(RegisterDto model)
        {
            ApplicationUser userExists = await userManager.FindByNameAsync(model.Email);
            if (userExists != null)
            {
                throw new ServiceException(String.Format("user {0} already existing ", model.Name));
            }

            ApplicationUser user = new ApplicationUser()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Email
            };
            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                throw new ServiceException("failed to create account");
            }
            return user;
        }
    }
}
