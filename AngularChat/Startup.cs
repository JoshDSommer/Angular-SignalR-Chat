using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AngularChat.Startup))]
namespace AngularChat
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
            ConfigureAuth(app);
        }
    }
}
