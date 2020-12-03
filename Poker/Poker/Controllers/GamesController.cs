using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Poker.Areas.Identity.Data;
using Poker.Data;
using Poker.Models;

namespace Poker.Controllers
{
    public class GamesController : Controller
    {
        private readonly GameContext _context;
        private readonly UserManager<PokerUser> _userManager;

        public GamesController(GameContext context, UserManager<PokerUser> userContext)
        {
            _context = context;
            _userManager = userContext;
        }

        // GET: Games
        public async Task<IActionResult> Index()
        {
            return View(await _context.Game.ToListAsync());
        }

        // GET: Games/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var game = await _context.Game
                .FirstOrDefaultAsync(m => m.ID == id);
            if (game == null)
            {
                return NotFound();
            }

            return View(game);
        }

        // GET: Games/Create
        [Authorize]
        public async Task<IActionResult> Create()
        {
            PokerUser curUser = await _userManager.GetUserAsync(User);
            Game g = new Game();
            Player player = new Player(g, curUser.UserName, 0);

            _context.Add(g);
            _context.Add(player);
            await _context.SaveChangesAsync();

            return Redirect("~/Games/Lobby/" + g.ID.ToString());
        }

        /// <summary>
        /// udpates user roles when something changes from admin grid 
        /// </summary>
        /// <param name="user_id"></param>
        /// <param name="user_role"></param>
        /// <returns></returns>
        [Authorize]
        public async Task<IActionResult> Join(int? id)
        {
            PokerUser curUser = await _userManager.GetUserAsync(User);
            Game g = await _context.Game
                .Include(g => g.Players).Where(g => g.ID == id).SingleOrDefaultAsync();

            int curPlayers = g.Players.Count;

            if (curPlayers > 4)
            {
                return NotFound();
            }

            foreach(Player p in g.Players)
            {
                if (curUser.UserName.Equals(p.UserName)) return View("Lobby", g);
            }

            Player player = new Player(g, curUser.UserName, curPlayers);

            _context.Add(player);
            await _context.SaveChangesAsync();

            return Redirect("~/Games/Lobby/" + g.ID.ToString());
        }

        public async Task<IActionResult> Play(int? id)
        {
            Game g = await _context.Game
                .Include(g => g.Players).Where(g => g.ID == id).SingleOrDefaultAsync();

            if (g.Turn == -1)
            {
                g.StartGame(_context);
             //   _context.Update(g);
             //   await _context.SaveChangesAsync();
            }

            return View(g);
        }

        public async Task<IActionResult> Lobby(int? id)
        {
            Game g = await _context.Game
                .Include(g => g.Players).Where(g => g.ID == id).SingleOrDefaultAsync();

            if (g.Turn != -1) return Redirect("~/Games/Play/" + g.ID.ToString());

            return View("Lobby", g);
        }

        // POST: Games/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID")] Game game)
        {
            if (ModelState.IsValid)
            {
                _context.Add(game);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(game);
        }


        [HttpPost]
        public async Task<IActionResult> Bet(int id, int amount)
        {
            PokerUser user = await _userManager.GetUserAsync(User);
            Game game = await _context.Game
                .Include(g => g.Players).Where(g => g.ID == id).SingleOrDefaultAsync();

            // Verify that the game exists and is in progress
            if (game == null) return Json("Game not found");
            else if (game.Winner != null) return Json("Game is over");
            else if (game.Turn == -1) return Json("Game not started");

            // Verify that it's the requesting user's turn
            Player curPlayer;
            try
            {
                curPlayer = game.ValidateUser(user.UserName);
            } catch (Exception e)
            {
                return Json(e.Message);
            }

            // Validate bet amount --- UI Shouldn't allow these to be hit
            if (amount > curPlayer.Chips + curPlayer.CurrentBet)
            {
                return Json("Not enough chips");
            } else if (amount % 10 != 0)
            {
                return Json("Invalid bet amount");
            }

            // If bet amount is less than minimum, the player folds
            if (amount < game.MinimumBet)
            {
                curPlayer.Folded = true;
            }
            else
            {
                curPlayer.Chips += curPlayer.CurrentBet - amount;
                game.Pot += amount - curPlayer.CurrentBet;
                curPlayer.CurrentBet = amount;
                game.MinimumBet = amount;

                _context.Update(game);
            }
            _context.Update(curPlayer);
            await _context.SaveChangesAsync();

            // If end of round, flip card
            if (game.Turn == game.Dealer)  { }
            // If all cards flipped, end hand
                // score all players' hands
                // give pot to non-folded player with highest score, record hand win for user
                // record bluff win if player without highest score wins pot
                // if one player has all the money, end the game
                    // record game win for user
                // else
                    game.StartHand(_context);
            // Else
                game.NextTurn(_context);

            return Json(game);
        }
    }
}
