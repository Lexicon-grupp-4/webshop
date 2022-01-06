using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webbshop2.Dtos;
using webbshop2.Models;
using webbshop2.Service;

namespace webbshop2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return Ok("success");
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterDto dto)
        {
            var user = new User()
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            };
            user = _userService.Create(user);
            return Created("success", user);
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            // TODO remove bad request message
            var user = _userService.GetUserByEmail(dto.Email);
            if (user == null) return BadRequest(new {message = "unable to find user"});
            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return BadRequest(new { message = "bad password" });
            }
            user.Password = "";
            var jwt = new JwtService().Generate(user.Id);

            // 41:15, maybe avoid cookies
            //Response.Cookies.Append("jwt", jwt, new Microsoft.AspNetCore.Http.CookieOptions
            //{
            //    HttpOnly = true
            //});

            return Ok(new{ jwt, user });
        }

        //[HttpGet("user")]
        //public IActionResult User(string jwt)
        //{
        //    // TODO the jwt should come from a header
        //    try
        //    {
        //        var token = new JwtService().Verify(jwt);
        //        if (token != null)
        //        {
        //            int id = int.Parse(token.Issuer);
        //            var user = _userService.GetUserById(id);
        //            return Ok(user);
        //        }
        //    }
        //    catch (Exception )
        //    {
        //        return Unauthorized();
        //    }
        //    return BadRequest();
        //}
    }
}
