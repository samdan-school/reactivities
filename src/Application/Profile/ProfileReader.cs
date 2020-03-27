﻿using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profile
{
    public class ProfileReader : IProfileReader
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public ProfileReader(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<UserProfile> ReadProfile(string username)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == username);

            if (user == null) throw new RestException(HttpStatusCode.NotFound, new {User = "Not found"});

            var currentUser = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());

            var profile = new UserProfile
            {
                DisplayName = user.DisplayName,
                Username = user.UserName,
                Bio = user.Bio,
                Image = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                Photos = user.Photos,
                FollowersCount = user.Followers.Count,
                FollowingCount = user.Followings.Count,
                IsFollowed = currentUser.Followings.Any(x => x.TargetId == user.Id)
            };

            return profile;
        }
    }
}