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
            Game g = new Game();

            PokerUser curUser = await _userManager.GetUserAsync(User);
            g.Player1 = curUser;

            _context.Add(g);
            await _context.SaveChangesAsync();

            return View("Lobby", g);
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
                .Include(g => g.Player1)
                .Include(g => g.Player2)
                .Include(g => g.Player3)
                .Include(g => g.Player4).Where(g => g.ID == id).SingleOrDefaultAsync();

            if (g == null)
            {
                // return bad game code to user
                NotFound();
            }
            else if (g.Player1 == null)
            {
                    g.Player1 = curUser;
            }
            else if (g.Player2 == null)
            {
                if (g.Player1.Id != curUser.Id)
                {
                g.Player2 = curUser;
                }
            }
            else if (g.Player3 == null)
            {
                if (g.Player2.Id != curUser.Id && g.Player1.Id != curUser.Id)
                {
                    g.Player3 = curUser;
                }
            }
            else if (g.Player4 == null)
            {
                if (g.Player3.Id != curUser.Id && g.Player2.Id != curUser.Id && g.Player1.Id != curUser.Id)
                {
                    g.Player4 = curUser;
                }
            }
            else
            {
                //bad, inform user lobby is full
                return NotFound();
            }
            _context.Update(g);
            await _context.SaveChangesAsync();

            return View("Lobby", g);
        }

        public async Task<IActionResult> Play(int? id)
        {
            Game g = await _context.Game
                .Include(g => g.Player1)
                .Include(g => g.Player2)
                .Include(g => g.Player3)
                .Include(g => g.Player4).Where(g => g.ID == id).SingleOrDefaultAsync();

            return View(g);
        }

        public IActionResult Lobby()
        {
            return View();
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


        private bool GameExists(int id)
        {
            return _context.Game.Any(e => e.ID == id);
        }
    }
}
