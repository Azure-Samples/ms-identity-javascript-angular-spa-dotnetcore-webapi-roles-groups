namespace TodoListAPI.Utils
{
    /// <summary>
    /// Contains a list of all the Azure AD app roles this app depends on and works with.
    /// </summary>
    public static class AppRoles
    {
        /// <summary>
        /// User readers can read basic profiles of all users in the directory.
        /// </summary>
        public const string GroupMember = "831e0ef1-4786-4316-9ccb-dc1f1ed54282"; // oid: "831e0ef1-4786-4316-9ccb-dc1f1ed54282"

        /// <summary>
        /// Directory viewers can view objects in the whole directory.
        /// </summary>
        public const string GroupAdmin = "2df638c0-8c92-4d52-b7a4-5bee2d9aa69e"; // oid: "2df638c0-8c92-4d52-b7a4-5bee2d9aa69e"
    }

    /// <summary>
    /// Wrapper class the contain all the authorization policies available in this application.
    /// </summary>
    public static class AuthorizationPolicies
    {
        public const string AssignmentToGroupMemberRoleRequired = "AssignmentToGroupMemberRoleRequired";
        public const string AssignmentToGroupAdminRoleRequired = "AssignmentToGroupAdminRoleRequired";
    }
}
