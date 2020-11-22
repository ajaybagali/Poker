using Microsoft.AspNetCore.Identity;
using Poker.Areas.Identity.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Poker.Models
{
    public class Game
    {
        public int ID { get; set; }
        [PersonalData]
        public PokerUser Player1 { get; set; }
        [PersonalData]
        public PokerUser Player2 { get; set; }
        [PersonalData]
        public PokerUser Player3 { get; set; }
        [PersonalData]
        public PokerUser Player4 { get; set; }
        [PersonalData]
        public PokerUser Winner { get; set; }
    }
}
