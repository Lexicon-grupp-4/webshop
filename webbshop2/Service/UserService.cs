using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webbshop2.Data;
using webbshop2.Models;

namespace webbshop2.Service
{
    public interface IUserService
    {
        User Create(User user);
        User GetUserByEmail(string email);
        User GetUserById(int Id);
    }

    public class UserService : IUserService
    {
        readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public User Create(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return user;
        }

        public User GetUserByEmail(string email)
        {
            // TODO dont leak password out of service layer
            return _context.Users
                .Where(b => b.Email == email)
                .FirstOrDefault();
        }

        public User GetUserById(int Id)
        {
            // TODO dont leak password out of service layer
            return _context.Users
                .Where(b => b.Id == Id)
                .FirstOrDefault();
        }
    }
}
