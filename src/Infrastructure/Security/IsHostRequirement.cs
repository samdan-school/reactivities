using System;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserAccessor _userAccessor;

        public IsHostRequirementHandler(DataContext context, IHttpContextAccessor httpContextAccessor, IUserAccessor userAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            _userAccessor = userAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            var routeData = _httpContextAccessor.HttpContext.GetRouteData();

            var activityId = Guid.Parse(routeData?.Values["id"].ToString() ?? "");

            var activity = _context.Activities.FindAsync(activityId).Result;

            var host = activity.UserActivities.FirstOrDefault(x => x.IsHost);

            if (host?.AppUser?.UserName == _userAccessor.GetCurrentUserName())
                context.Succeed(requirement);
            else
                context.Fail();

            return Task.CompletedTask;
        }
    }
}