/**
 * Author:    Ajay Bagali, Jon England, Ryan Furukawa
 * Date:      12/7/2020
 * Course:    CS 4540, University of Utah, School of Computing
 * Copyright: CS 4540 and Ajay Bagali,Jon England, Ryan Furukawa - This work may not be copied for use in Academic Coursework.
 *
 * I, Ajay Bagali, Jon England, and Ryan Furukawa, certify that I wrote this code from scratch and did 
 * not copy it in part or whole from another source.  Any references used 
 * in the completion of the assignment are cited in my README file and in
 * the appropriate method header.
 *
 * File Contents
 *
 *    seeds userdatabase with mock players
 */
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
                user2.UserName = "don@gmail.com";
                user2.Email = "don@gmail.com";
                user2.EmailConfirmed = true;
                await userManager.CreateAsync(user2, password);

                PokerUser user3 = new PokerUser();
                user3.BluffWins = 0;
                user3.Wins = 0;
                user3.Chips = 0;
                user3.UserName = "sam@gmail.com";
                user3.Email = "sam@gmail.com";
                user3.EmailConfirmed = true;
                await userManager.CreateAsync(user3, password);

                PokerUser user4 = new PokerUser();
                user4.BluffWins = 0;
                user4.Wins = 0;
                user4.Chips = 0;
                user4.UserName = "joe@gmail.com";
                user4.Email = "joe@gmail.com";
                user4.EmailConfirmed = true;
                await userManager.CreateAsync(user4, password);
            }


        }
    }
}
