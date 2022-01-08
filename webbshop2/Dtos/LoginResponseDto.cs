using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webbshop2.Dtos
{
    public class UserInfo
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Id { get; set; }
        public string Role { get; set; }
    }

    public class LoginResponseDto
    {
        public string Jwt { get; set; }
        public UserInfo User { get; set; }
    }
}
