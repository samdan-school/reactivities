using System.Threading.Tasks;

namespace Application.Profile
{
    public interface IProfileReader
    {
        Task<UserProfile> ReadProfile(string username);
    }
}