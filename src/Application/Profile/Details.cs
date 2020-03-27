using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;

namespace Application.Profile
{
    public class Details
    {
        public class Query : IRequest<UserProfile>
        {
            public string Username { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
            }
        }

        public class Handler : IRequestHandler<Query, UserProfile>
        {
            private readonly IProfileReader _profileReader;

            public Handler(IProfileReader profileReader)
            {
                _profileReader = profileReader;
            }

            public async Task<UserProfile> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _profileReader.ReadProfile(request.Username);
            }
        }
    }
}