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
        public PokerUser Player1;
        public PokerUser Player2;
        public PokerUser Player3;
        public PokerUser Player4;
        public PokerUser Winner;
    }
}
