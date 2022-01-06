﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace webbshop2.Dtos
{
    public class LoginDto
    {
        [MaxLength(255)]
        public string Email { get; set; }

        [MaxLength(255)]
        public string Password { get; set; }
    }
}
