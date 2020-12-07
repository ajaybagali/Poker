﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
        public string Action { get; set; }

        private static readonly int START_CHIPS = 2000;
        public Game()
        {
            Turn = -1;
            Pot = 0;
            MinimumBet = 0;
            River1 = -1;
            River2 = -1;
            River3 = -1;
            River4 = -1;
            River5 = -1;
            Action = "Game not started. Please wait for player to start game.";
        }

        public dynamic GetJson(string username)
        {
            List<dynamic> players = new List<dynamic>();
            foreach (Player p in Players)
            {
                if (p.UserName.Equals(username))
                {
                    players.Add(new
                    {
                        id = p.ID,
                        username = p.UserName,
                        chips = p.Chips,
                        folded = p.Folded,
                        card1 = p.Card1,
                        card2 = p.Card2,
                        order = p.Order,
                        currentBet = p.CurrentBet,
                    });
                } else
                {
                    players.Add(new
                    {
                        id = p.ID,
                        username = p.UserName,
                        chips = p.Chips,
                        folded = p.Folded,
                        card1 = 52,
                        card2 = 52,
                        order = p.Order,
                        currentBet = p.CurrentBet,
                    });
                }
            }
            dynamic result = new
            {
                id = ID,
                winner = Winner,
                turn = Turn,
                dealer = Dealer,
                river1 = River1,
                river2 = River2,
                river3 = River3,
                river4 = River4,
                river5 = River5,
                minimumBet = MinimumBet,
                pot = Pot,
                players = players,
                action = Action,
            };
            return result;
        }

        public Player ValidateUser(String player)
        {
            foreach (Player p in Players)
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

        public void VerifyPlayer(string username)
        {
            foreach (Player p in Players)
            {
                if (p.UserName.Equals(username)) return;
            }

            throw new Exception("User not in game");
        }

        public async Task StartGame(GameContext context)
        {
            Dealer = 0;
            Turn = 1;

            foreach (Player player in Players)
            {
                player.Chips = START_CHIPS;
                context.Update(player);
            }
            await context.SaveChangesAsync();
            await StartHand(context);
        }

        public bool IsInGame(string userName)
        {
            foreach (Player p in Players)
            {
                if (p.UserName.Equals(userName))
                    return true;
            }
            return false;
        }

        public async Task StartHand(GameContext context)
        {
            Pot = 0;
            MinimumBet = 50;
            River1 = GenerateCard();
            River2 = GenerateCard();
            River3 = GenerateCard();
            River4 = -1;
            River5 = -1;

            foreach (Player player in Players)
            {
                player.Card1 = GenerateCard();
                player.Card2 = GenerateCard();
                player.Folded = false;
                player.CurrentBet = 0;
                context.Update(player);
            }
            await context.SaveChangesAsync();
            Dealer++;
            if (Dealer >= Players.Count) Dealer = 0;

            Turn = Dealer + 1;
            if (Turn >= Players.Count) Turn = 0;
        }

        public async Task NextTurn(GameContext context, UserManager<PokerUser> userManager)
        {
            Turn++;
            if (Turn >= Players.Count) Turn = 0;

            Player nextPlayer = GetPlayerByTurn(Turn);
            while (nextPlayer.Folded || nextPlayer.Chips == 0)
            {
                // Check if round is over
                if (Turn == Dealer)
                {
                    if (IsEndHand()) await EndHand(context, userManager);
                    else FlipCard();
                }

                Turn++;
                if (Turn >= Players.Count) Turn = 0;
                nextPlayer = GetPlayerByTurn(Turn);
            }
        }

        private Player GetPlayerByTurn(int turn)
        {
            foreach (Player p in Players)
            {
                if (p.Order == turn) return p;
            }
            return null;
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
        public bool IsEndHand()
        {
            if (River5 != -1) return true;

            int betters = 0;
            foreach (Player p in Players)
            {
                if (!p.Folded && p.Chips > 0) betters++;

            }
            if (betters < 2) return true;

            return false;
        }
        public void FlipCard()
        {
            if (River4 == -1) River4 = GenerateCard();
            else River5 = GenerateCard();
        }
        public async Task EndHand(GameContext context, UserManager<PokerUser> userManager)
        {
            Tuple<int, int> highScore = Tuple.Create(-1, -1);
            Player highPlayer = null, highNonFoldPlayer = null;
            Tuple<int, int> highNonFoldScore = highScore;

            // find winner of hand
            foreach (Player p in Players)
            {
                Tuple<int, int> score = ScoreHand(p);
                if (score.Item1 > highScore.Item1 || (score.Item1 == highScore.Item1 && score.Item2 > highScore.Item2))
                {
                    highScore = score;
                    highPlayer = p;
                }

                if (!p.Folded)
                {
                    if (score.Item1 > highNonFoldScore.Item1 || (score.Item1 == highNonFoldScore.Item1 && score.Item2 > highNonFoldScore.Item2))
                    {
                        highNonFoldScore = score;
                        highNonFoldPlayer = p;
                    }
                }
            }

            // update stats for winner and game
            highNonFoldPlayer.Chips += Pot;

            context.Update(highNonFoldPlayer);
            await context.SaveChangesAsync();

            PokerUser winner = await userManager.FindByEmailAsync(highNonFoldPlayer.UserName);
            winner.Wins++;
            if (highNonFoldPlayer.UserName != highPlayer.UserName) winner.BluffWins++;
            await userManager.UpdateAsync(winner);

            if (GameIsOver())
            {
                EndGame(winner);
                winner.Chips += Players.Count * START_CHIPS;
                await userManager.UpdateAsync(winner);
                return;
            }

            await StartHand(context);
        }

        private void EndGame(PokerUser winner)
        {
            Winner = winner.UserName;
            Turn = -2;
        }

        private bool GameIsOver()
        {
            int haveChips = 0;
            foreach (Player p in Players)
            {
                if (p.Chips > 0) haveChips++;
            }
            return haveChips < 2;
        }

        public Tuple<int, int> ScoreHand(Player player)
        {
            List<int> hand = new List<int> { River1, River2, River3,
                River4, River5, player.Card1, player.Card2 };
            hand.Sort();

            // Check if flush
            List<int> flushCards = GetFlush(hand);
            if (flushCards != null)
            {
                // Check if straight
                if (flushCards[0] == 0) flushCards.Add(13);
                bool isStraight = RangeContainsStraight(1, 4, flushCards);
                int flushCount = flushCards.Count;

                if (!isStraight && flushCount > 5 && RangeContainsStraight(2, 5, flushCards))
                    isStraight = true;
                else if (!isStraight && flushCount > 6 && RangeContainsStraight(3, 6, flushCards))
                    isStraight = true;

                if (isStraight)
                {
                    // Check if royal flush
                    if (flushCards[flushCount - 1] == 13 && flushCards[flushCount - 2] == 12
                        && flushCards[flushCount - 3] == 11 && flushCards[flushCount - 4] == 10
                        && flushCards[flushCount - 5] == 9) 
                        return Tuple.Create((int)Hands.ROYAL_FLUSH, 0);
                    else return Tuple.Create((int)Hands.STRAIGHT_FLUSH, flushCards[flushCount - 1]);
                }
                else
                    return Tuple.Create((int)Hands.FLUSH, flushCards[flushCount - 1]);
            }

            // Remove suits from cards
            List<int> cardNums = new List<int>();
            foreach (int card in hand) cardNums.Add(card / 4);

            List<int> freqs = new List<int> { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
            List<int> pairs = new List<int>();
            List<int> triples = new List<int>();

            // 4 of a kind
            foreach (int card in cardNums)
            {
                freqs[card]++;
                if (freqs[card] > 3) return Tuple.Create((int)Hands.FOUR_OF_A_KIND, card);
                else if (freqs[card] > 2)
                {
                    pairs.Remove(card);
                    triples.Add(card);
                    if (pairs.Count > 0 && triples.Count > 0) 
                        return Tuple.Create((int)Hands.FULL_HOUSE, card);
                }
                else if (freqs[card] > 1) { 
                    pairs.Add(card);
                    if (pairs.Count > 0 && triples.Count > 0)
                        return Tuple.Create((int)Hands.FULL_HOUSE, card);
                }
            }

            List<int> noDuplicates = cardNums.Distinct().ToList();
            if (noDuplicates[0] == 0) // Add ace to end before checking for straight
            {
                noDuplicates.Add(13);
            }

            for (int i=5; i < noDuplicates.Count + 1; i++)
            {
                if (RangeContainsStraight(i - 4, i - 1, noDuplicates))
                    return Tuple.Create((int)Hands.STRAIGHT, noDuplicates[i - 1]);
            }

            if (triples.Count > 0) return Tuple.Create((int)Hands.THREE_OF_A_KIND, triples[0]);
            else if (pairs.Count > 1) return Tuple.Create((int)Hands.TWO_PAIR, pairs[1]);
            else if (pairs.Count > 0) return Tuple.Create((int)Hands.PAIR, pairs[0]);

            return Tuple.Create((int)Hands.HIGH_CARD, noDuplicates[noDuplicates.Count - 1]);
        }

        public enum Hands
        {
            HIGH_CARD = 0,
            PAIR = 1,
            TWO_PAIR = 2,
            THREE_OF_A_KIND = 3,
            STRAIGHT = 4,
            FLUSH = 5,
            FULL_HOUSE = 6,
            FOUR_OF_A_KIND = 7,
            STRAIGHT_FLUSH = 8,
            ROYAL_FLUSH = 9
        }

        public bool RangeContainsStraight(int start, int end, List<int> flushCards)
        {
            for (int i = start; i < end; i++)
            {
                if (flushCards[i] != flushCards[i - 1] + 1 || flushCards[i] + 1 != flushCards[i + 1])
                {
                    return false;
                }
            }
            return true;
        }

        private List<int> GetFlush(List<int> hand)
        {
            List<List<int>> suits = new List<List<int>>() {
        new List<int>(), new List<int>(), new List<int>(), new List<int>()};


            foreach (int card in hand)
            {
                suits[card % 4].Add(card / 4);
            }

            if (suits[0].Count > 4) return suits[0];
            else if (suits[1].Count > 4) return suits[1];
            else if (suits[2].Count > 4) return suits[2];
            else if (suits[3].Count > 4) return suits[3];

            return null;
        }
    }
}
