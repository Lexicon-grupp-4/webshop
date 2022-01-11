using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Authentication;
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
        Task<ApplicationUser> GetUser();
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
        private readonly IHttpContextAccessor httpContextAccessor;

        public AuthenticationService(UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.httpContextAccessor = httpContextAccessor;
            _configuration = configuration;
        }
        public async Task<LoginResponseDto> Login(LoginDto creds)
        {
            var user = await userManager.FindByNameAsync(creds.Name);
            if (user == null || await userManager.CheckPasswordAsync(user, creds.Password) == false)
            {
                throw new InvalidCredentialException();
            }

            var userRoles = await userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

            // simplification: only one role per user. And every user must have a role.
            var userRole = userRoles[0];
            authClaims.Add(new Claim(ClaimTypes.Role, userRole));

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
                Email = user.Email,
                Role = userRole
            };

            LoginResponseDto loginResponse = new LoginResponseDto()
            {
                User = userInfo,
                Jwt = new JwtSecurityTokenHandler().WriteToken(token)
            };

            return loginResponse;
        }

        public async Task<ApplicationUser> GetUser()
        {
            string userName = httpContextAccessor.HttpContext.User.Identity.Name;
            var user = await userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return null;
            }
            return user;
        }
    }
}
