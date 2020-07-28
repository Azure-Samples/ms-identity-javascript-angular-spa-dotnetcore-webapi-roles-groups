using System.Threading.Tasks;
using System.Net.Http.Headers;
using Microsoft.Graph;

namespace TodoListAPI.Utils
{
    public class GraphHelper
    {
        private static GraphServiceClient graphClient;
        public static void Initialize(string accessToken)
        {
            graphClient = new GraphServiceClient(new DelegateAuthenticationProvider((requestMessage) =>
            {
                requestMessage
                    .Headers
                    .Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

                return Task.FromResult(0);
            }));
        }

        public static async Task<IUserMemberOfCollectionWithReferencesPage> GetMembershipAsync()
        {
            try
            {
                // GET /me/memberof
                return await graphClient.Me.MemberOf.Request().GetAsync();
            }
            catch (ServiceException)
            {
                return null;
            }
        }
    }
}
