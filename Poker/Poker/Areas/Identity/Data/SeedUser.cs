using Microsoft.AspNetCore.Identity;
using Poker.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Poker.Areas.Identity.Data
{
    public class SeedUser
    {
        public static async Task Initialize(UserContext context, UserManager<PokerUser> userManager)
        {

            context.Database.EnsureCreated();


            if (!context.Users.Any())
            {
                String password = "Poker1!";

                PokerUser user = new PokerUser();
                user.BluffWins = 0;
                user.Wins = 0;
                user.Chips = 0;
                user.UserName = "sally@gmail.com";
                user.Email = "sally@gmail.com";
                user.EmailConfirmed = true;
                await userManager.CreateAsync(user, password);

                PokerUser user2 = new PokerUser();
                user2.BluffWins = 0;
                user2.Wins = 0;
                user2.Chips = 0;
                user2.UserName = "borat@gmail.com";
                user2.Email = "borat@gmail.com";
                user2.EmailConfirmed = true;
                await userManager.CreateAsync(user2, password);

                PokerUser user3 = new PokerUser();
                user3.BluffWins = 0;
                user3.Wins = 0;
                user3.Chips = 0;
                user3.UserName = "stealthgod@gmail.com";
                user3.Email = "stealthgod@gmail.com";
                user3.EmailConfirmed = true;
                await userManager.CreateAsync(user3, password);
            }


        }
    }
}
