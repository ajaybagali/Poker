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
 *    Player model for poker game
 */
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

        /// <summary>
        /// Checks to see 
        /// </summary>
        /// <param name="card"></param>
        /// <returns></returns>
        public bool hasCard(int card) {
            return Card1 == card || Card2 == card;
        }
    }
}
