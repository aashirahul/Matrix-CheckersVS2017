using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DemoApp.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DemoApp.Controllers
{
    [Route("api/[controller]")]
    public class PlayersController : Controller
    {
        [HttpGet]
        public IEnumerable<Player> GetPlayers()
        {
            Player[] Players = new Player[]
            {
                new Player
                {
                    id = 1,
                    color= Constants.Constants.ColorForFirstPlayer
                },
                new Player
                {
                    id = 2,
                    color= Constants.Constants.ColorForSecondPlayer
                }
            };
            return Players;
        }
    }
}

