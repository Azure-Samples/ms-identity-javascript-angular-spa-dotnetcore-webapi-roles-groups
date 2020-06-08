---
page_type: sample
author: derisen
languages:
- javascript
- typescript
- csharp
products:
- dotnet
- angular
- azure-ad
- ms-graph
description: "Angular Single-Page Application (SPA) calling .NET Core Web API using App Roles and Security Groups for Implementing Role-Based Access Control (RBAC)"
urlFragment: "ms-identity-javascript-angular-spa-dotnetcore-webapi-roles-groups"
---

# Angular Single-Page Application (SPA) calling .NET Core Web API using App Roles and Security Groups for Implementing Role-Based Access Control (RBAC)

This chapter-wise tutorial demonstrates how to use Azure AD App Roles and Security Groups features to implement **Role-Based Access Control** (RBAC) in your application. In doing so, it covers how to modify claims in **Id** and **Access** tokens, how to protect restricted routes in your client app, and how to accept only authorized calls in your web API.

We recommend you to follow each chapter in a successive fashion, as the concepts involved are built on top of each other and explanations may not be repeated. Before proceeding to **Chapter 1**, please review the [Prerequisites](#prerequisites) below.

## Contents

| File/folder       | Description                                |
|-------------------|--------------------------------------------|
| `Chapter1`        | Angular SPA calling .NET Core Web API using App Roles. |
| `Chapter2`        | Angular SPA calling .NET Core Web API using Security Groups. |
| `Misc`            | Contains screenshots and illustrations.    |
| `CHANGELOG.md`    | List of changes to the sample.             |
| `CONTRIBUTING.md` | Guidelines for contributing to the sample. |
| `README.md`       | This README file.                          |
| `LICENSE`         | The license for the sample.                |

## Prerequisites

- Please ensure that you are familiar with basic Azure AD samples, in particular with:
  - [VanillaJS Single-page Application calling MS Graph API](https://github.com/Azure-Samples/active-directory-javascript-graphapi-v2)
  - [Angular Single-page Application calling custom .NET Core Web API](https://github.com/Azure-Samples/ms-identity-javascript-angular-spa-aspnetcore-webapi)
- Please take a moment to review [Azure RBAC docementation](https://docs.microsoft.com/azure/role-based-access-control/) in order to become familiar with App Roles and Security Groups. More specific documentation pointers can be found below under [More information](#more-information).

Please refer to each chapter's sub-folder for sample-specific prerequisites.

## Setup

### Step 1

Using a command line interface such as VS Code integrated terminal, clone or download this repository:

```console
git clone https://github.com/Azure-Samples/ms-identity-javascript-angular-spa-dotnetcore-webapi-roles-groups.git
```

> [!NOTE] Given that the name of the sample is quite long, and so are the names of the referenced NuGet packages, you might want to clone it in a folder close to the root of your hard drive, to avoid file size limitations on Windows.

### Step 2

Please refer to each chapter's sub-folder for further setup instructions.

## Running the sample

Please refer to each chapter's sub-folder for instructions for running the sample.

## More information

For more information, visit the following links:

- Articles about the Microsoft identity platform are at [http://aka.ms/aaddevv2](http://aka.ms/aaddevv2), with a focus on:
  - [How to: Configure the role claim issued in the SAML token for enterprise applications](https://docs.microsoft.com/azure/active-directory/develop/active-directory-enterprise-app-role-management)
  - [How to: Provide optional claims to your Azure AD app](https://docs.microsoft.com/azure/active-directory/develop/active-directory-optional-claims)
  - [How to: Restrict your Azure AD app to a set of users in an Azure AD tenant](https://docs.microsoft.com/azure/active-directory/develop/howto-restrict-your-app-to-a-set-of-users)
  - [How to: Add app roles in your application and receive them in the token](https://docs.microsoft.com/azure/active-directory/develop/howto-add-app-roles-in-azure-ad-apps)

- To lean more about the application registration, visit:
  - [Quickstart: Set up a tenant](https://docs.microsoft.com/azure/active-directory/develop/quickstart-create-new-tenant)
  - [Quickstart: Register an application with the Microsoft identity platform](https://docs.microsoft.com/azure/active-directory/develop/quickstart-register-app)
  - [Quickstart: Configure a client application to access web APIs](https://docs.microsoft.com/azure/active-directory/develop/quickstart-configure-app-access-web-apis)
  - [Quickstart: Configure an application to expose web APIs](https://docs.microsoft.com/azure/active-directory/develop/quickstart-configure-app-expose-web-apis)

## Community Help and Support

Use [Stack Overflow](http://stackoverflow.com/questions/tagged/msal) to get support from the community.
Ask your questions on Stack Overflow first and browse existing issues to see if someone has asked your question before.
Make sure that your questions or comments are tagged with [`msal` `dotnet` `angular` `azure-active-directory`].

If you find a bug in the sample, please raise the issue on [GitHub Issues](../../issues).

To provide a recommendation, visit the following [User Voice page](https://feedback.azure.com/forums/169401-azure-active-directory).

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments
