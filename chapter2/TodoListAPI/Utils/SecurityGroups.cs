namespace TodoListAPI.Utils
{
    /// <summary>
    /// Contains a list of all the Azure AD security groups this app depends on and works with.
    /// </summary>
    public static class SecurityGroups
    {
        /// <summary>
        /// Group members can view and modify their todolist
        /// </summary>
        public const string GroupMember = "831e0ef1-4786-4316-9ccb-dc1f1ed54282";

        /// <summary>
        /// Group admin can view everyone's todolist
        /// </summary>
        public const string GroupAdmin = "2df638c0-8c92-4d52-b7a4-5bee2d9aa69e";
    }

    /// <summary>
    /// Wrapper class the contain all the authorization policies available in this application.
    /// </summary>
    public static class AuthorizationPolicies
    {
        public const string AssignmentToGroupMemberGroupRequired = "AssignmentToGroupMemberGroupRequired";
        public const string AssignmentToGroupAdminGroupRequired = "AssignmentToGroupAdminGroupRequired";
    }
}
