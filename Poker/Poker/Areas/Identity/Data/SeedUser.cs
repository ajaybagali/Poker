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
                user.BluffWins = 2;
                user.Wins = 5;
                user.Chips = 5000;
                user.UserName = "sally@gmail.com";
                user.Email = "sally@gmail.com";
                user.EmailConfirmed = true;
                await userManager.CreateAsync(user, password);

                PokerUser user2 = new PokerUser();
                user2.BluffWins = 2;
                user2.Wins = 5;
                user2.Chips = 5000;
                user2.UserName = "borat@gmail.com";
                user2.Email = "borat@gmail.com";
                user2.EmailConfirmed = true;
                await userManager.CreateAsync(user2, password);

                PokerUser user3 = new PokerUser();
                user3.BluffWins = 2;
                user3.Wins = 5;
                user3.Chips = 5000;
                user3.UserName = "donald@gmail.com";
                user3.Email = "donald@gmail.com";
                user3.EmailConfirmed = true;
                await userManager.CreateAsync(user3, password);

                PokerUser user4 = new PokerUser();
                user4.BluffWins = 2;
                user4.Wins = 5;
                user4.Chips = 5000;
                user4.UserName = "joe@gmail.com";
                user4.Email = "joe@gmail.com";
                user4.EmailConfirmed = true;
                await userManager.CreateAsync(user4, password);

            }


        }
    }
}
