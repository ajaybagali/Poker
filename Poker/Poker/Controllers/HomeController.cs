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
 *    controls home webpage and redirects users based on whats clicked 
 */
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Poker.Areas.Identity.Data;
using Poker.Models;
namespace Poker.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly UserManager<PokerUser> _userManager;

        public HomeController(ILogger<HomeController> logger, UserManager<PokerUser> userContext)
        {
            _logger = logger;
            _userManager = userContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// directs users to their stats page
        /// </summary>
        /// <returns></returns>
        [Authorize]
        public async Task<IActionResult> Stats()
        {
            PokerUser user = await _userManager.GetUserAsync(User);
            return View(user);
        }

        /// <summary>
        /// displays error if error occures
        /// </summary>
        /// <returns></returns>
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
