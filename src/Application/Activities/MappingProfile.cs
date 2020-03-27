using System.Linq;
using Application.Activities.DTOs;
using Domain;

namespace Application.Activities
{
    public class MappingProfile : AutoMapper.Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDto>()
                .ForMember(d => d.Attendees, o => o.MapFrom(s => s.UserActivities));
            CreateMap<UserActivity, AttendeeDto>()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.Following, o => o.MapFrom<FollowingResolver>());
        }
    }
}