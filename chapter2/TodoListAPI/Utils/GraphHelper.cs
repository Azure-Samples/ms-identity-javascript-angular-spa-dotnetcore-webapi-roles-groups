using System.Threading.Tasks;
using Microsoft.Graph;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace TodoListAPI.Utils
{
    public class GraphHelper
    {
        /// <summary>
        /// Adds groups claim for group overage
        /// </summary>
        /// <param name="context">TokenValidatedContext</param>
        public static async Task AddGroupsClaim(TokenValidatedContext context)
        {
            try
            {
                //Specify the property names in the 'select' variable to get values for the specified properties.
                string select = "id,displayName,onPremisesNetBiosName,onPremisesDomainName,onPremisesSamAccountNameonPremisesSecurityIdentifier";

                var graph = context.HttpContext.RequestServices.GetRequiredService<GraphServiceClient>();
                
                //Added below key to get Access Token on-behalf of user. 
                context.HttpContext.Items.Add("JwtSecurityTokenUsedToCallWebAPI", context.SecurityToken as JwtSecurityToken);

                //Request to get groups and directory roles that the user is a direct member of.
                var memberPage = await graph.Me.MemberOf.Request().Select(select).GetAsync().ConfigureAwait(false);

                //There is a limit to number of groups returned, below method make calls to Microsoft graph to get all the groups.
                var allgroups = ProcessIGraphServiceMemberOfCollectionPage(memberPage);
                
                //Remove the key as Microsoft.Identity.Web library utilizes this key. 
                //If not removed then it can cause failure to the application.
                context.HttpContext.Items.Remove("JwtSecurityTokenUsedToCallWebAPI");

                if (allgroups != null)
                {
                    var identity = (ClaimsIdentity)context.Principal.Identity;
                    foreach (Group group in allgroups)
                    {
                        //Adds group id as 'groups' claim. But it can be changed as per requirment. 
                        //For instance if the required format is 'NetBIOSDomain\sAMAccountName' then the code is as commented below:
                        //identity.AddClaim(new Claim("groups", group.OnPremisesNetBiosName+"\\"+group.OnPremisesSamAccountName));
                        identity.AddClaim(new Claim("groups", group.Id));
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// Returns all the groups that the user is a direct member of.
        /// </summary>
        /// <param name="membersCollectionPage">First page having collection of directory roles and groups</param>
        /// <returns>List of groups</returns>
        private static List<Group> ProcessIGraphServiceMemberOfCollectionPage(IUserMemberOfCollectionWithReferencesPage membersCollectionPage)
        {
            List<Group> allGroups = new List<Group>();

            try
            {
                if (membersCollectionPage != null)
                {
                    do
                    {
                        // Page through results
                        foreach (DirectoryObject directoryObject in membersCollectionPage.CurrentPage)
                        {
                            //Collection contains directory roles and groups of the user.
                            //Checks and adds groups only to the list.
                            if (directoryObject is Group)
                            {
                                allGroups.Add(directoryObject as Group);
                            }
                        }

                        // are there more pages (Has a @odata.nextLink ?)
                        if (membersCollectionPage.NextPageRequest != null)
                        {
                            membersCollectionPage = membersCollectionPage.NextPageRequest.GetAsync().Result;
                        }
                        else
                        {
                            membersCollectionPage = null;
                        }
                    } while (membersCollectionPage != null);
                }
            }
            catch (ServiceException ex)
            {
                Console.WriteLine($"We could not process the groups list: {ex}");
                return null;
            }
            return allGroups;
        }
    }
}
