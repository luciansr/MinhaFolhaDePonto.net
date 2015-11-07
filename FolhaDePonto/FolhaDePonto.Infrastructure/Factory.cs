using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Practices.Unity;

namespace FolhaDePonto.Infrastructure
{
    public class Factory : IDisposable
    {
        private static Factory _instance;

        private static IUnityContainer _unityContainer;

        private Factory()
        {
            _unityContainer = new UnityContainer();

            _unityContainer.RegisterType<FolhaDePonto.Repository.Base.IUnitOfWork, FolhaDePonto.Repository.Base.UnitOfWork>();
            //_unityContainer.RegisterType<Musupr.Service.AccountService, Musupr.Service.AccountService>();

        }

        public T Get<T>()
        {
            return _unityContainer.Resolve<T>();
        }

        public static Factory Instance
        {
            get { return _instance ?? (_instance = new Factory()); }
        }

        public object Resolve(Type t)
        {
            return _unityContainer.Resolve(t);

        }

        public IEnumerable<object> ResolveAll(Type t)
        {
            return _unityContainer.ResolveAll(t);

        }

        public IUnityContainer CreateChildContainer()
        {
            return _unityContainer.CreateChildContainer();
        }

        public void Dispose()
        {
            _unityContainer.Dispose();
        }
    }
}
