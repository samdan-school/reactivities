﻿using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<Photo>
        {
            public IFormFile file { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x);
            }
        }

        public class Handler : IRequestHandler<Command, Photo>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
                _photoAccessor = photoAccessor;
            }

            public async Task<Photo> Handle(Command request, CancellationToken cancellationToken)
            {
                var photoUploadResult = _photoAccessor.AddPhoto(request.file);

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());

                var photo = new Photo
                {
                    Id = photoUploadResult.PublicId,
                    Url = photoUploadResult.Url
                };

                if (!user.Photos.Any(x => x.IsMain))
                {
                    photo.IsMain = true;
                }

                user.Photos.Add(photo);

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return photo;

                throw new NotImplementedException();
            }
        }
    }
}