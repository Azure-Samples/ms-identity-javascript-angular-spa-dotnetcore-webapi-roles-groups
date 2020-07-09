using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web.Resource;
using TodoListAPI.Models;
using TodoListAPI.Utils;
using Microsoft.Identity.Web;
using Microsoft.Identity.Client;

namespace TodoListAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TodoListController : ControllerBase
    {
        // The Web API will only accept tokens 1) for users, and 
        // 2) having the access_as_user scope for this API
        static readonly string[] scopeRequiredByApi = new string[] { "access_as_user" };

        private readonly TodoContext _context;
        private readonly ITokenAcquisition _tokenAcquisition;

        public TodoListController(TodoContext context, ITokenAcquisition tokenAcquisition)
        {
            _context = context;
            _tokenAcquisition = tokenAcquisition;
        }

        // GET: api/todolist/getAll
        [HttpGet]
        [Route("getAll")]
        [Authorize(Policy = AuthorizationPolicies.AssignmentToGroupAdminGroupRequired)]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetAll()
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
            return await _context.TodoItems.ToListAsync();
        }

        // GET: api/todolist
        [HttpGet]
        //[Authorize(Policy = AuthorizationPolicies.AssignmentToGroupMemberGroupRequired)]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);

            if (User.HasClaim("hasgroups", "true"))
            {
                var groups = CallGraphApiOnBehalfOfUser().GetAwaiter().GetResult();      
            } 
            else
            {
                // This is how group ids / names are used in the IsInRole method
                var isinrole = User.IsInRole("831e0ef1-4786-4316-9ccb-dc1f1ed54282");
            }
           
            string owner = User.FindFirst("preferred_username")?.Value;
            return await _context.TodoItems.Where(item => item.Owner == owner).ToListAsync();
        }

        // GET: api/todolist/5
        [HttpGet("{id}")]
        [Authorize(Policy = AuthorizationPolicies.AssignmentToGroupMemberGroupRequired)]
        public async Task<ActionResult<TodoItem>> GetTodoItem(int id)
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
 
            var todoItem = await _context.TodoItems.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        // PUT: api/todolist/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        [Authorize(Policy = AuthorizationPolicies.AssignmentToGroupMemberGroupRequired)]
        public async Task<IActionResult> PutTodoItem(int id, TodoItem todoItem)
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);

            if (id != todoItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(todoItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/todolist
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Authorize(Policy = AuthorizationPolicies.AssignmentToGroupMemberGroupRequired)]
        public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem todoItem)
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);

            string owner = User.FindFirst("preferred_username")?.Value;
            todoItem.Owner = owner;

            todoItem.Status = false;


            _context.TodoItems.Add(todoItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTodoItem", new { id = todoItem.Id }, todoItem);
        }

        // DELETE: api/todolist/5
        [HttpDelete("{id}")]
        [Authorize(Policy = AuthorizationPolicies.AssignmentToGroupMemberGroupRequired)]
        public async Task<ActionResult<TodoItem>> DeleteTodoItem(int id)
        {
            HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);

            var todoItem = await _context.TodoItems.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.TodoItems.Remove(todoItem);
            await _context.SaveChangesAsync();

            return todoItem;
        }

        private bool TodoItemExists(int id)
        {
            return _context.TodoItems.Any(e => e.Id == id);
        }

        public async Task<dynamic> CallGraphApiOnBehalfOfUser()
        {
            string[] scopes = { "GroupMember.Read.All" };
            dynamic response;

            // we use MSAL.NET to get a token to call the API On Behalf Of the current user
            try
            {
                string accessToken = await _tokenAcquisition.GetAccessTokenForUserAsync(scopes);
                GraphHelper.Initialize(accessToken);
                var groups = await GraphHelper.GetMembershipAsync();
                response = groups;
            }
            catch (MsalUiRequiredException ex)
            {
                _tokenAcquisition.ReplyForbiddenWithWwwAuthenticateHeader(scopes, ex);
                return "interaction required";
            }

            return response;
        }
    }
}
