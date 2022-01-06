using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webbshop2.Service
{
    public class ServiceException : Exception
    {
        public ServiceException(string msg) : base(msg)
        { }
    }
}
