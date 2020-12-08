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
 *    stores gamecontext data 
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Poker.Models;

namespace Poker.Data
{
    public class GameContext : DbContext
    {
        public GameContext (DbContextOptions<GameContext> options)
            : base(options)
        {
        }

        public DbSet<Poker.Models.Game> Game { get; set; }
    }
}
