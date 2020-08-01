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
        public static async Task AddGroupsClaim(TokenValidatedContext context)
        {
            try
            {
                string select = "id,displayName,onPremisesNetBiosName,onPremisesDomainName,onPremisesSamAccountNameonPremisesSecurityIdentifier";
               
                var graph = context.HttpContext.RequestServices.GetRequiredService<GraphServiceClient>();
                
                context.HttpContext.Items.Add("JwtSecurityTokenUsedToCallWebAPI", context.SecurityToken as JwtSecurityToken);
                
                var groupspage = await graph.Me.MemberOf.Request().Select(select).GetAsync().ConfigureAwait(false);
                
                var allgroups = ProcessIGraphServiceGroupsCollectionPage(groupspage);
                
                context.HttpContext.Items.Remove("JwtSecurityTokenUsedToCallWebAPI");

                if (allgroups != null)
                {
                    var identity = (ClaimsIdentity)context.Principal.Identity;
                    foreach (Group group in allgroups)
                    {
                        identity.AddClaim(new Claim("groups", group.Id));

                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
        private static List<Group> ProcessIGraphServiceGroupsCollectionPage(IUserMemberOfCollectionWithReferencesPage groupsCollectionPage)
        {
            List<Group> allGroups = new List<Group>();

            try
            {
                if (groupsCollectionPage != null)
                {
                    do
                    {
                        // Page through results
                        foreach (DirectoryObject directoryObject in groupsCollectionPage.CurrentPage)
                        {
                            if (directoryObject is Group)
                            {
                                allGroups.Add(directoryObject as Group);
                            }
                        }

                        // are there more pages (Has a @odata.nextLink ?)
                        if (groupsCollectionPage.NextPageRequest != null)
                        {
                            groupsCollectionPage = groupsCollectionPage.NextPageRequest.GetAsync().Result;
                        }
                        else
                        {
                            groupsCollectionPage = null;
                        }
                    } while (groupsCollectionPage != null);
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
