---
page_type: sample
languages:
- javascript
- typescript
- csharp
products:
- dotnet
- angular
- msal-angular
- ms-graph
- microsoft-identity-web
- azure-active-directory
description: "Angular single-page application (SPA) calling .NET Core web API and using App Roles and Security Groups to implement Role-Based Access Control (RBAC)"
urlFragment: "ms-identity-javascript-angular-spa-dotnetcore-webapi-roles-groups"
---

# Angular single-page application (SPA) calling .NET Core web API and using App Roles and Security Groups to implement Role-Based Access Control (RBAC)

This chapterwise tutorial demonstrates how to use Azure AD **App Roles** and **Security Groups** features to implement **Role-Based Access Control** (RBAC) in your application. In doing so, it covers how to modify claims in **ID** and **Access** tokens, how to protect restricted routes in your client app, and how to accept only authorized calls in your web API.

We recommend you to follow each chapter in a successive order, as the concepts used in later chapters are built on top of the previous ones and explanations may not be repeated. Before proceeding to **Chapter 1**, please review the [Prerequisites](#prerequisites) below.

## Contents

| File/folder       | Description                                |
|-------------------|--------------------------------------------|
| `Chapter1/`        | Angular SPA calling .NET Core web API and using App Roles. |
| `Chapter2/`        | Angular SPA calling .NET Core web API and using Security Groups. |
| `ReadmeFiles/`     | Contains screenshots and illustrations.    |
| `AppCreationScripts/`| Contains Powershell scripts for automating app registration. |
| `CONTRIBUTING.md` | Guidelines for contributing to the sample. |
| `LICENSE`         | The license for the sample.                |

## Prerequisites

- We highly recommend you first getting familiar with the following *basic sign-in* examples and documents. This will help you easily grasp the various aspects that are presented here.
  - [Angular single-page application calling MS Graph API](https://github.com/Azure-Samples/ms-identity-javascript-angular-spa)
  - [Angular single-page application calling a custom .NET Core web API](https://github.com/Azure-Samples/ms-identity-javascript-angular-spa-aspnetcore-webapi)
- Please take a moment to review [Azure RBAC documentation](https://docs.microsoft.com/azure/role-based-access-control/) in order to become familiar with App Roles and Security Groups. More specific documentation pointers can be found below under [More information](#more-information).

> A Microsoft Identity Platform Office Hours session covered Azure AD App roles and security groups, featuring this scenario and this sample. A recording of the session is provided in this video [Implement Authorization in your Applications with Microsoft identity platform](https://www.youtube.com/watch?v=LRoc-na27l0)

Please refer to each chapter's sub-folder for sample-specific prerequisites.

## Setup

### Step 1

Using a command line interface such as **VS Code** integrated terminal, clone or download this repository:

```console
git clone https://github.com/Azure-Samples/ms-identity-javascript-angular-spa-dotnetcore-webapi-roles-groups.git
```

> :warning: Given that the name of the sample is quite long, and so are the names of the referenced NuGet packages, you might want to clone it in a folder close to the root of your hard drive, to avoid file size limitations on Windows.

### Step 2

Now let's start with [Chapter 1](./Chapter1/README.md) where we'll learn about using App Roles first.

## More information

For more information, visit the following links:

- Articles about the Microsoft identity platform are at [http://aka.ms/aaddevv2](http://aka.ms/aaddevv2), with a focus on:
  - [Configure group claims for applications with Azure Active Directory (Public Preview)](https://docs.microsoft.com/azure/active-directory/hybrid/how-to-connect-fed-group-claims#configure-the-azure-ad-application-registration-for-group-attributes)
  - [How to: Configure the role claim issued in the SAML token for enterprise applications](https://docs.microsoft.com/azure/active-directory/develop/active-directory-enterprise-app-role-management)
  - [Azure Active Directory app manifest](https://docs.microsoft.com/azure/active-directory/develop/reference-app-manifest)
  - [User: getMemberObjects function](https://docs.microsoft.com/graph/api/user-getmemberobjects?view=graph-rest-1.0)
  - [How to: Provide optional claims to your Azure AD app](https://docs.microsoft.com/azure/active-directory/develop/active-directory-optional-claims)
  - [How to: Restrict your Azure AD app to a set of users in an Azure AD tenant](https://docs.microsoft.com/azure/active-directory/develop/howto-restrict-your-app-to-a-set-of-users)
  - [How to: Add app roles in your application and receive them in the token](https://docs.microsoft.com/azure/active-directory/develop/howto-add-app-roles-in-azure-ad-apps)

- To learn more about the application registration, visit:
  - [Quickstart: Set up a tenant](https://docs.microsoft.com/azure/active-directory/develop/quickstart-create-new-tenant)
  - [Quickstart: Register an application with the Microsoft identity platform](https://docs.microsoft.com/azure/active-directory/develop/quickstart-register-app)
  - [Quickstart: Configure a client application to access web APIs](https://docs.microsoft.com/azure/active-directory/develop/quickstart-configure-app-access-web-apis)
  - [Quickstart: Configure an application to expose web APIs](https://docs.microsoft.com/azure/active-directory/develop/quickstart-configure-app-expose-web-apis)

- Learn more about on-prem groups synchronization to Azure AD  
  - [Azure AD Connect sync: Understanding Users, Groups, and Contacts](https://docs.microsoft.com/azure/active-directory/connect/active-directory-aadconnectsync-understanding-users-and-contacts)
  - [Configure Office 365 Groups with on-premises Exchange hybrid](https://docs.microsoft.com/exchange/hybrid-deployment/set-up-office-365-groups)

## Community Help and Support

Use [Stack Overflow](http://stackoverflow.com/questions/tagged/msal) to get support from the community.
Ask your questions on Stack Overflow first and browse existing issues to see if someone has asked your question before.
Make sure that your questions or comments are tagged with [`msal` `dotnet` `angular` `azure-active-directory`].

If you find a bug in the sample, please raise the issue on [GitHub Issues](../../../issues).

To provide a recommendation, visit the following [User Voice page](https://feedback.azure.com/forums/169401-azure-active-directory).

> :information_source: Consider taking a moment to share [your experience with us](https://forms.office.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR73pcsbpbxNJuZCMKN0lURpUQ09BMkFPQ0cyWEczSEFJSVVQSVVTREw0TCQlQCN0PWcu)

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments
