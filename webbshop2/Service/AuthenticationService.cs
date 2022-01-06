using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using webbshop2.Authentication;
using webbshop2.Dtos;

namespace webbshop2.Service
{
    public interface IAuthenticationService
    {
        Task<LoginResponseDto> Login(LoginDto creds);
    }

    public class LoginResponse
    {
        public string Jwt { get; set; }
    }

    public class AuthenticationService : IAuthenticationService
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration _configuration;

        public AuthenticationService(UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _configuration = configuration;
        }
        public async Task<LoginResponseDto> Login(LoginDto creds)
        {
            var user = await userManager.FindByNameAsync(creds.Email);
            if (user == null)
            {
                return null;
            }

            var userRoles = await userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                //audience: _configuration["Jwt:Audience"], // hopefolly we dont need this
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            UserInfo userInfo = new UserInfo()
            {
                Id = user.Id,
                Name = user.UserName,
                Email = user.Email
            };

            LoginResponseDto loginResponse = new LoginResponseDto()
            {
                User = userInfo,
                Jwt = new JwtSecurityTokenHandler().WriteToken(token)
            };

            return loginResponse;
        }
    }
}
