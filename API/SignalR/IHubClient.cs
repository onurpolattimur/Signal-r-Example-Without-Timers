using System.Threading.Tasks;

namespace API.SignalR
{
    public interface IHubClient
    {
        Task InformClient(string message);
    }
}

