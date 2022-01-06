using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
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
            catch (ServiceException)
            {
                return StatusCode(StatusCodes.Status401Unauthorized);
            }
        }
    }
}
