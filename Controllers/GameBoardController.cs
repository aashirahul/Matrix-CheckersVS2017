using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DemoApp.Models;
using System.Collections.Specialized;


namespace DemoApp.Controllers
{
    [Route("api/[controller]")]
    public class SquaresController : Controller
    {
        Square[] Squares = new Square[]
        {
                new Square()
                {
                    id= 0,
                    position= new Position(0,0),
                    validMove= false

                },
                new Square()
                {
                    id= 1,
                    position= new Position(0,1),
                    hasPiece = true,
                    validMove= false
                   
                 },
                new Square()
                {
                    id= 2,
                    position= new Position(0,2),
                    validMove= false
                    
                },
                new Square()
                {
                    id= 3,
                    position= new Position(0,3),
                     hasPiece = true,
                    validMove= false
                   
                },
                new Square()
                {
                    id= 4,
                    position= new Position(0,4),
                    validMove= false
                     
                },
                new Square()
                {
                    id= 5,
                    position= new Position(0,5),
                    hasPiece = true,
                    validMove = false
                    
                },
                new Square()
                {
                    id= 6,
                    position= new Position(0,6),
                    validMove= false
                    
                },
                 new Square()
                 {
                    id= 7,
                    position= new Position(0,7),
                    hasPiece = true,
                    validMove= false
                    
                 },
                 new Square()
                 {
                    id= 8,
                    position= new Position(1,0),
                     hasPiece = true,
                    validMove= false
                     
                 },
                new Square()
                {
                    id= 9,
                    position= new Position(1,1),
                    validMove= false
                   
                },
                 new Square()
                 {
                      id= 10,
                      position= new Position(1,2),
                       hasPiece = true,
                     validMove= false
           
                 },
                 new Square()
                 {
                    id= 11,
                    position= new Position(1,3),
                    validMove= false
             
                 },
                 new Square()
                 {
                    id= 12,
                    position= new Position(1,4),
                     hasPiece = true,
                     validMove= false
             
                 },
                 new Square()
                 {
                    id= 13,
                    position= new Position(1,5),
                    validMove= false
                 },
                 new Square()
                 {
                    id= 14,
                    position= new Position(1,6),
                     hasPiece = true,
                    validMove= false
             
                 },
                 new Square()
                 {
                    id= 15,
                    position= new Position(1,7),
                    validMove= false
            
                 },
                 new Square()
                 {
                    id= 16,
                    position= new Position(2,0),
                    validMove= false
            
                 },
                 new Square()
                 {
                    id= 17,
                    position= new Position(2,1),
                     hasPiece = true,
                    validMove= false
           
                 },
                 new Square()
                 {
                    id= 18,
                    position= new Position(2,2),
                    validMove= false,
            
                 },
                 new Square()
                 {
                    id= 19,
                    position= new Position(2,3),
                     hasPiece = true,
                    validMove= false
                 },
                 new Square()
                 {
                    id= 20,
                    position= new Position(2,4),
                    validMove= false
            
                 },
                 new Square()
                 {
                    id= 21,
                    position= new Position(2,5),
                     hasPiece = true,
                    validMove= false
                 },
                 new Square()
                 {
                    id= 22,
                    position= new Position(2,6),
                    validMove= false
                 },
                 new Square()
                 {
                    id= 23,
                    position= new Position(2,7),
                     hasPiece = true,
                    validMove= false
                 },
                 new Square()
                 {
                    id= 24,
                    position= new Position(3,0),
                    validMove= false
                 },
                 new Square()
                 {
                     id= 25,
                     position= new Position(3,1),
                     validMove= false
                 },
                 new Square()
                 {
                    id= 26,
                    position= new Position(3,2),
                    validMove= false
                 },
                 new Square()
                 {
                    id= 27,
                    position= new Position(3,3),
                    validMove= false
                 },
                 new Square()
                 {
                    id= 28,
                    position= new Position(3,4),
                    validMove= false
                 },
                 new Square()
                 {
                    id= 29,
                    position= new Position(3,5),
                    validMove= false
                 },
                new Square()
                {
                    id= 30,
                    position= new Position(3,6),
                    validMove= false
                },
                new Square()
                {
                    id= 31,
                    position= new Position(3,7),
                    validMove= false
                },
               new Square()
                {
                     id= 32,
                     position= new Position(4,0),
                     validMove= false
                },
             new Square()
             {
                    id= 33,
                    position= new Position(4,1),
                    validMove= false
             },
             new Square()
             {
                    id= 34,
                    position= new Position(4,2),
                    validMove= false
              },
             new Square()
             {
                    id= 35,
                    position= new Position(4,3),
                    validMove= false
             },
             new Square()
             {
                    id= 36,
                    position= new Position(4,4),
                    validMove= false
            },
            new Square()
            {
                    id= 37,
                    position= new Position(4,5),
                    validMove= false
            },
            new Square()
            {
                    id= 38,
                    position= new Position(4,6),
                    validMove= false
            },
            new Square()
            {
                    id= 39,
                    position= new Position(4,7),
                    validMove= false
            },
            new Square()
            {
                    id= 40,
                    position= new Position(5,0),
                     hasPiece = true,
                    validMove= false
            },
            new Square()
            {
                    id= 41,
                    position= new Position(5,1),
                    validMove= false
            },
            new Square()
            {
                     id= 42,
                     position= new Position(5,2),
                      hasPiece = true,
                     validMove= false
            },
            new Square(){
                    id= 43,
                    position= new Position(5,3),
                     validMove= false
            },
            new Square()
            {
                    id= 44,
                    position= new Position(5,4),
                     hasPiece = true,
                    validMove= false
            },
            new Square()
            {
                    id= 45,
                    position= new Position(5,5),
                    validMove= false
            },
            new Square()
            {
                    id= 46,
                    position=new Position(5,6),
                     hasPiece = true,
                    validMove= false
            },

            new Square()
            {
                    id= 47,
                    position= new Position(5,7),
                    validMove= false
            },
            new Square()
            {
                    id= 48,
                    position= new Position(6,0),
                    validMove= false
            },
            new Square()
            {
                    id= 49,
                    position= new Position(6,1),
                     hasPiece = true,
                    validMove= false
            },

           new Square()
           {
                     id= 50,
                     position= new Position(6,2),
                     validMove= false
            },

            new Square()
            {
                    id= 51,
                    position= new Position(6,3),
                     hasPiece = true,
                    validMove= false
            },

            new Square()
            {
                    id= 52,
                    position= new Position(6,4),
                    validMove= false
            },
            new Square()
            {
                    id= 53,
                    position= new Position(6,5),
                     hasPiece = true,
                    validMove= false
            },
            new Square()
            {
                    id= 54,
                    position= new Position(6,6),
                    validMove= false
             },

            new Square()
            {
                    id= 55,
                    position= new Position(6,7),
                     hasPiece = true,
                    validMove= false
            
            },

            new Square()
            {
                    id= 56,
                    position= new Position(7,0),
                     hasPiece = true,
                    validMove= false
            },

            new Square()
            {
                    id= 57,
                    position= new Position(7,1),
                    validMove= false
            },

            new Square()
            {
                    id= 58,
                    position= new Position(7,2),
                     hasPiece = true,
                    validMove= false
            },
            new Square()
            {
                     id= 59,
                     position= new Position(7,3),
                     validMove= false
            },
            new Square()
            {
                    id= 60,
                    position= new Position(7,4),
                     hasPiece = true,
                    validMove= false
            },

            new Square()
            {
                    id= 61,
                    position= new Position(7,5),
                    validMove= false
            },

            new Square()
            {
                    id= 62,
                    position= new Position(7,6),
                     hasPiece = true,
                    validMove= false
            },
            new Square()
            {
                  id= 63,
                  position= new Position(7,7),
                  validMove= false
            }
        };

        public Piece selectedPiece;
        public int rowNumber;
        public int colNumber;
        public string pieceColor;
        public Position Position;

        [HttpGet]
        public IEnumerable<Square> GetSquares()
        {
            return Squares;
        }
        [HttpGet("moves")]
        public IEnumerable<Position> GetMoves(int row, int col, string color)
        {
            rowNumber = row;
            colNumber = col;
            pieceColor = color;
            if (pieceColor == Constants.Constants.ColorForFirstPlayer)
            {
                Position availablePositionOne = new Position(rowNumber + 1, colNumber + 1);
                Position availablepositiontwo = new Position(rowNumber + 1, colNumber - 1);
                Position[] availableMoves = new Position[] { availablePositionOne, availablepositiontwo };
                return (availableMoves);
            }
            else if (pieceColor == Constants.Constants.ColorForSecondPlayer)
            {
                Position availablePositionOne = new Position(rowNumber - 1, colNumber + 1);
                Position availablepositiontwo = new Position(rowNumber - 1, colNumber - 1);
                Position[] availableMoves = new Position[] { availablePositionOne, availablepositiontwo };
                return (availableMoves);
            }
            Position testPosition = new Position(1, 1);
            Position[] test = new Position[] { testPosition };
            return test;
        }

    }
}
