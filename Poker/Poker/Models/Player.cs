using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Poker.Models
{
    public class Player
    {
        public int ID { get; set; }
        public string UserName { get; set; }
        public int Chips { get; set; }
        public bool Folded { get; set; }
        public int Card1 { get; set; }
        public int Card2 { get; set; }
        public Game PokerGame { get; set; }
        public int Order { get; set; }
        public int CurrentBet { get; set; }

        public Player() { }
        public Player(Game game, string username, int order)
        {
            Chips = 2000;
            Folded = false;
            PokerGame = game;
            UserName = username;
            Order = order;
            Card1 = -1;
            Card2 = -1;
        }
        public bool hasCard(int card) {
            return Card1 == card || Card2 == card;
        }
    }
}
