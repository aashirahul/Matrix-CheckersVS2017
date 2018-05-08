using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DemoApp.Models;

// For more information on enabling MVC for empty projects, visit https=//go.microsoft.com/fwlink/?LinkID=397860

namespace DemoApp.Controllers
{

    [Route("api/[controller]")]
    public class PiecesController : Controller
    {

        [HttpGet]
        public IEnumerable<Piece> GetPieces()
        {

            Piece[] Pieces = new Piece[24] {
               new Piece()
               {
                    id= 0,
                    position= new Position(0,1),
                    color= Constants.Constants.ColorForFirstPlayer,
                    isKing= false
                   


                },
               new Piece()
               {
                    id= 1,
                    position= new Position(0,3),
                    color= Constants.Constants.ColorForFirstPlayer,
                    isKing= false
                  
                },
                new Piece()
                {
                    id= 2,
                    position = new Position(0,5),
                    color= Constants.Constants.ColorForFirstPlayer,
                    isKing= false
                },
               new Piece()
               {
                    id= 3,
                    position= new Position(0,7),
                    color = Constants.Constants.ColorForFirstPlayer,
                    isKing= false
                 },
               new Piece()
               {
                    id= 4,
                    position= new Position(1,0),
                    color= Constants.Constants.ColorForFirstPlayer,
                    isKing= false
                  
                 },
               new Piece()
               {
                    id = 5,
                    position= new Position(1,2),
                    color= Constants.Constants.ColorForFirstPlayer,
                    isKing= false
               },
                new Piece()
                {
                    id= 6,
                    position= new Position(1,4),
                    color= Constants.Constants.ColorForFirstPlayer,
                    isKing= false
                 },
                 new Piece()
                  {
                    id= 7,
                    position= new Position(1,6),
                    color= Constants.Constants.ColorForFirstPlayer,
                    isKing= false
                },
                 new Piece()
                 {
                    id= 8,
                    position= new Position(2,1),
                    color= Constants.Constants.ColorForFirstPlayer,
                    isKing= false
                 },
                 new Piece()
                 {
                        id= 9,
                        position= new Position(2,3),
                        color= Constants.Constants.ColorForFirstPlayer,
                        isKing= false
                 },
                 new Piece(){
                        id= 10,
                        position= new Position(2,5),
                        color= Constants.Constants.ColorForFirstPlayer,
                        isKing= false
                },
                 new Piece()
                 {
                        id= 11,
                        position= new Position(2,7),
                        color= Constants.Constants.ColorForFirstPlayer,
                        isKing= false
                      
                 },
                 new Piece()
                 {
                        id= 12,
                        position= new Position(5,0),
                        color= Constants.Constants.ColorForSecondPlayer,
                        isKing= false
                 },
                 new Piece()
                 {
                        id= 13,
                        position= new Position(5,2),
                        color= Constants.Constants.ColorForSecondPlayer,
                        isKing= false
                 },
                 new Piece()
                 {
                        id= 14,
                        position= new Position(5,4),
                        color= Constants.Constants.ColorForSecondPlayer,
                        isKing= false
                     
                 },
                 new Piece()
                 {
                        id= 15,
                        position= new Position(5,6),
                        color= Constants.Constants.ColorForSecondPlayer,
                        isKing= false
                 },
                 new Piece()
                 {
                        id= 16,
                        position= new Position(6,1),
                        color= Constants.Constants.ColorForSecondPlayer,
                        isKing= false
                    
                 },
                 new Piece()
                  {
                        id= 17,
                        position= new Position(6,3),
                        color= Constants.Constants.ColorForSecondPlayer,
                        isKing= false,
                },
                 new Piece()
                 {
                        id= 18,
                        position= new Position(6,5),
                        color= Constants.Constants.ColorForSecondPlayer,
                        isKing= false
                 },
                 new Piece()
                 {
                        id= 19,
                        position= new Position(6,7),
                        color= Constants.Constants.ColorForSecondPlayer,
                        isKing= false
                 },
                 new Piece(){
                        id= 20,
                        position= new Position(7,0),
                        color= Constants.Constants.ColorForSecondPlayer,
                        isKing= false
                 },
                 new Piece(){
                        id= 21,
                        position= new Position(7,2),
                        color= Constants.Constants.ColorForSecondPlayer,
                        isKing= false
                 },
                 new Piece(){
                        id= 22,
                        position= new Position(7,4),
                        color= Constants.Constants.ColorForSecondPlayer,
                        isKing= false,
                 },
                 new Piece()
                 {
                        id= 23,
                        position= new Position(7,6),
                        color= Constants.Constants.ColorForSecondPlayer,
                        isKing= false,
                 }
            };

            return Pieces;
        }


    }
}



