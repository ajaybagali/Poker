using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Poker.Areas.Identity.Data
{
    // Add profile data for application users by adding properties to the PokerUser class
    public class PokerUser : IdentityUser
    {
        [PersonalData]
        public int Chips { get; set; }
        [PersonalData]
        public int Wins { get; set; }
        [PersonalData]
        public int BluffWins { get; set; }
    }
}
