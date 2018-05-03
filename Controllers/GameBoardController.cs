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
        //Square[] Squares = new Square[]
        //List<Square> Squares = new List<Square>

        Square[] Squares = new Square[]
        {
                new Square()
                {
                    id= 0,
                    validMove= false,
                    position= new Position(0,0)
                },
                new Square()
                {
                    id= 1,
                    validMove= false,
                    position= new Position(0,1)
                 },
                new Square()
                {
                    id= 2,
                    validMove= false,
                     position= new Position(0,2)
                },
                new Square()
                {
                    id= 3,
                    validMove= false,
                     position= new Position(0,3)
                },
                new Square()
                {
                    id= 4,
                    validMove= false,
                     position= new Position(0,4)
                },
                new Square()
                {
                    id= 5,
                    validMove = false,
                     position= new Position(0,5)
                },
                new Square()
                {
                    id= 6,
                    validMove= false,
                     position= new Position(0,6)
                },
                 new Square()
                 {
                    id= 7,
                    validMove= false,
                     position= new Position(0,7)
                 }, new Square()
                         {
                    id= 8,
                    validMove= false,
                     position= new Position(1,0)
                 },
                new Square() {
            id= 9,
            validMove= false,
             position= new Position(1,1)
        },
                 new Square(){
              id= 10,
             validMove= false,
             position= new Position(1,2)
        },
                  new Square(){
            id= 11,
           validMove= false,
             position= new Position(1,3)
        },
                   new Square(){
            id= 12,
          validMove= false,
             position= new Position(1,4)
        },
                    new Square(){
            id= 13,
          validMove= false,
            position= new Position(1,5)
        },
                     new Square(){
            id= 14,
           validMove= false,
             position= new Position(1,6)
        },
                      new Square(){
            id= 15,
           validMove= false,
             position= new Position(1,7)
        },
                       new Square(){
            id= 16,
           validMove= false,
             position= new Position(2,0)
        },
                        new Square(){
            id= 17,
           validMove= false,
             position= new Position(2,1)
        },
                         new Square(){
            id= 18,
           validMove= false,
             position= new Position(2,2)
        },
                          new Square(){
            id= 19,
          validMove= false,
             position= new Position(2,3)
        },
                           new Square(){
            id= 20,
        validMove= false,
             position= new Position(2,4)
        },
 new Square(){
            id= 21,
          validMove= false,
             position= new Position(2,5)
        },
  new Square(){
            id= 22,
          validMove= false,
             position= new Position(2,6)
        },
   new Square(){
            id= 23,
          validMove= false,
             position= new Position(2,7)
        },
    new Square(){
            id= 24,
         validMove= false,
             position= new Position(3,0)
        },
     new Square(){
            id= 25,
          validMove= false,
             position= new Position(3,1)
        },
      new Square(){
            id= 26,
           validMove= false,
             position= new Position(3,2)
        },
       new Square(){
            id= 27,
            validMove= false,
             position= new Position(3,3)
        },
        new Square(){
            id= 28,
          validMove= false,
             position= new Position(3,4)
        },
         new Square(){
            id= 29,
           validMove= false,
             position= new Position(3,5)
        },
          new Square(){
            id= 30,
         validMove= false,
             position= new Position(3,6)
        },
           new Square(){
            id= 31,
          validMove= false,
             position= new Position(3,7)
        },
            new Square(){
            id= 32,
             validMove= false,
             position= new Position(4,0)
        },
             new Square(){
            id= 33,
           validMove= false,
             position= new Position(4,1)
        },
              new Square(){
            id= 34,
          validMove= false,
            position= new Position(4,2)
        },
               new Square(){
            id= 35,
            validMove= false,
            position= new Position(4,3)
        },
                new Square(){
            id= 36,
          validMove= false,
            position= new Position(4,4)
        },
                 new Square(){
            id= 37,
           validMove= false,
            position= new Position(4,5)
        },
                  new Square(){
            id= 38,
           validMove= false,
            position= new Position(4,6)
        },
                new Square()
        {
            id= 39,
             validMove= false,
            position= new Position(4,7)
        },
                 new Square(){
            id= 40,
         validMove= false,
            position= new Position(5,0)
        },
                  new Square(){
            id= 41,
         validMove= false,
             position= new Position(5,1)
        },
                   new Square(){
            id= 42,
         validMove= false,
             position= new Position(5,2)
        },
                    new Square(){
            id= 43,
        validMove= false,
             position= new Position(5,3)
        },

            new Square(){
            id= 44,
        validMove= false,
             position= new Position(5,4)
        },

            new Square(){
            id= 45,
      validMove= false,
             position= new Position(5,5)
        },
           new Square(){
            id= 46,
      validMove= false,
             position=new Position(5,6)
        },

            new Square(){
            id= 47,
       validMove= false,
             position= new Position(5,7)
        },

            new Square(){
            id= 48,
            validMove= false,
             position= new Position(6,0)
        },

            new Square(){
            id= 49,
            validMove= false,
             position= new Position(6,1)
        },

           new Square(){
            id= 50,
          validMove= false,
             position= new Position(6,2)
        },

            new Square(){
            id= 51,
           validMove= false,
             position= new Position(6,3)
        },

            new Square(){
            id= 52,
            validMove= false,
             position= new Position(6,4)
        },

            new Square(){
            id= 53,
            validMove= false,
             position= new Position(6,5)
        },

            new Square(){
            id= 54,
            validMove= false,
             position= new Position(6,6)
        },

            new Square(){
            id= 55,
            validMove= false,
             position= new Position(6,7)
        },

            new Square(){
            id= 56,
          validMove= false,
           position= new Position(7,0)
        },

            new Square(){
            id= 57,
           validMove= false,
               position= new Position(7,1)
        },

            new Square(){
            id= 58,
           validMove= false,
               position= new Position(7,2)
        },

            new Square(){
            id= 59,
        validMove= false,
               position= new Position(7,3)
        },

            new Square(){
            id= 60,
          validMove= false,
               position= new Position(7,4)
        },

            new Square(){
            id= 61,
          validMove= false,
               position= new Position(7,5)
        },

            new Square(){
            id= 62,
            validMove= false,
               position= new Position(7,6)
        },

            new Square(){
            id= 63,
          validMove= false,
               position= new Position(7,7)

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
            if (pieceColor == "red")
            {
                Position availablePositionOne = new Position(rowNumber + 1, colNumber + 1);
                Position availablepositiontwo = new Position(rowNumber + 1, colNumber - 1);
                Position[] availableMoves = new Position[] { availablePositionOne, availablepositiontwo };
                return (availableMoves);
            }
            else if (pieceColor == "black")
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
