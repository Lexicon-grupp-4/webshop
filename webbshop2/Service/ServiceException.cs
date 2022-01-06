using System;

namespace webbshop2.Service
{
    public class ServiceException : Exception
    {
        public ServiceException(string msg) : base(msg)
        { }
    }
}
