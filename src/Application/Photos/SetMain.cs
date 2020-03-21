using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Photos
{
    public class SetMain
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x);
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = _context.Users.SingleOrDefault(x => x.UserName == _userAccessor.GetCurrentUserName());
                var photo = user?.Photos.SingleOrDefault(x => x.Id == request.Id);
                if (photo == null)
                    throw new RestException(HttpStatusCode.NotFound, new {Photo = "Not found"});
                if (photo.IsMain)
                    return Unit.Value;

                var currentDefault = user.Photos.FirstOrDefault(x => x.IsMain);
                if (currentDefault != null)
                    currentDefault.IsMain = false;
                photo.IsMain = true;

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                throw new NotImplementedException();
            }
        }
    }
}