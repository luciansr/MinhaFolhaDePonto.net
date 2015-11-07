using FolhaDePonto.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Dependencies;

namespace FolhaDePonto.Web
{
    public class UnityResolver : IDependencyResolver
    {
        protected Factory _factory;

        public UnityResolver(Factory factory)
        {
            if (factory == null)
            {
                throw new ArgumentNullException("factory");
            }
            this._factory = factory;
        }

        public object GetService(Type serviceType)
        {
            try
            {
                return _factory.Resolve(serviceType);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            try
            {
                return _factory.ResolveAll(serviceType);
            }
            catch (Exception)
            {
                return new List<object>();
            }
        }

        public IDependencyScope BeginScope()
        {
            //var child = _factory.CreateChildContainer();
            return new UnityResolver(_factory);
        }

        public void Dispose()
        {
            _factory.Dispose();
        }
    }
}
