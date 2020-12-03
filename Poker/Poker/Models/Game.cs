using Microsoft.AspNetCore.Identity;
using Poker.Areas.Identity.Data;
using Poker.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Poker.Models
{
    public class Game
    {
        public int ID { get; set; }
        public ICollection<Player> Players { get; set; }
        public string Winner { get; set; }
        public int Turn { get; set; }
        public int Dealer { get; set; }
        public int River1 { get; set; }
        public int River2 { get; set; }
        public int River3 { get; set; }
        public int River4 { get; set; }
        public int River5 { get; set; }
        public int MinimumBet { get; set; }
        public int Pot { get; set; }
        

        public Game()
        {
            Turn = -1;
            Pot = 0;
            MinimumBet = 0;
        }

        public Player ValidateUser(String player)
        {
            foreach(Player p in Players)
            {
                if (p.UserName.Equals(player))
                {
                    if (Turn == p.Order)
                    {
                        if (p.Folded) throw new Exception("User already folded");
                        return p;
                    }
                    throw new Exception("It's not your turn");
                }
            }
            throw new Exception("User not in game");
        }

        public void StartGame(GameContext context)
        {
            Dealer = 0;
            Turn = 1;

            foreach (Player player in Players)
            {
                player.Chips = 2000;
                context.Update(player);
            }
          //  context.SaveChangesAsync();
            StartHand(context);
        }

        public void StartHand(GameContext context)
        {
            Pot = 0;
            MinimumBet = 50;
            River1 = GenerateCard();
            River2 = GenerateCard();
            River3 = GenerateCard();

            foreach (Player player in Players)
            {
                player.Card1 = GenerateCard();
                player.Card2 = GenerateCard();
                player.Folded = false;
                player.CurrentBet = 0;
                context.Update(player);
            }
            Dealer++;
            if (Dealer >= Players.Count) Dealer = 0;

            Turn = Dealer + 1;
            if (Turn >= Players.Count) Turn = 0;

            context.Update(this);
            context.SaveChangesAsync();
        }

        public void NextTurn(GameContext context)
        {
            Turn++;
            if (Turn >= Players.Count) Turn = 0;
            context.Update(this);
            context.SaveChangesAsync();
        }

        public int GenerateCard()
        {
            Random random = new Random();
            int card = random.Next() % 52;
            while (PlayerHasCard(card) || River1 == card || River2 == card
                || River3 == card || River4 == card)
            {
                card = random.Next() % 52;
            }
            return card;
        }

        private bool PlayerHasCard(int card)
        {
            foreach (Player player in Players)
            {
                if (player.hasCard(card))
                    return true;
            }
            return false;
        }
    }

/*    public enum Cards { 
        ACE_H,
        ACE_D,
        ACE_S,
        ACE_C,
        TWO_H,
        THREE_H,
        FOUR_H,
        FIVE_H,
        SIX_H,
        SEVEN_H,
        EIGHT_H,
        NINE_H,
        TEN_H,
        JACK_H,
        QUEEN_H
    }*/
}
