using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using webbshop2.Authentication;
using webbshop2.Dtos;
using webbshop2.Service;

namespace webbshop2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        readonly IUserService userService;
        readonly IAuthenticationService authService;

        public AuthController(IUserService userService, IAuthenticationService authService)
        {
            this.userService = userService;
            this.authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            try {
                await userService.Create(dto);
            } 
            catch (ServiceException) {
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            return Created("successfully", new { Name = dto.Name });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            try
            {
                var loginResponse = await authService.Login(dto);
                return Ok(loginResponse);
            }
            catch (Exception) // TODO move to filter
            {
                return StatusCode(StatusCodes.Status401Unauthorized);
            }
        }

        [Authorize]
        [HttpGet("user")]
        public async Task<IActionResult> GetCurrentUser()
        {
            ApplicationUser user;
            try
            {
                user = await userService.GetUserByName(HttpContext.User.Identity.Name);
            }
            catch (ServiceException)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            UserInfo userInfo = new UserInfo()
            {
                Name = user.UserName ,
                Id = user.Id,
                Email = user.Email
            };
            return Ok(userInfo);
        }
    }
}
