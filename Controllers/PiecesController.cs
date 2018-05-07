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
                    color= "red",
                    isKing= false,
                    position= new Position(0,1)


                },
               new Piece(){
                        id= 1,
                    color= "red",
                    isKing= false,
                    position= new Position(0,3)
                 },
              new Piece()  {
                        id= 2,
                    color= "red",
                    isKing= false,
                  position = new Position(0,5)
                 },
               new Piece(){
                        id= 3,
                   color= "red",
                    isKing= false,
                    position= new Position(0,7)

                 },
               new Piece() {
                        id= 4,
                  color= "red",
                    isKing= false,
                    position= new Position(1,0)
                 },
               new Piece() {
                        id= 5,
                  color= "red",
                    isKing= false,
                    position= new Position(1,2)
                 },
                new Piece() {
                        id= 6,
                    color= "red",
                    isKing= false,
                    position= new Position(1,4)
                 },
                 new Piece()
                   {
                        id= 7,
                    color= "red",
                    isKing= false,
                    position= new Position(1,6)
                 },
                 new Piece() {
                        id= 8,
                    color= "red",
                    isKing= false,
                    position= new Position(2,1)
                 },
                 new Piece() {
                        id= 9,
                    color= "red",
                    isKing= false,
                     position= new Position(2,3)
                 },
                 new Piece(){
                        id= 10,
                    color= "red",
                    isKing= false,
                     position= new Position(2,5)
                 },
                 new Piece(){
                        id= 11,
                                       color= "red",
                    isKing= false,
                     position= new Position(2,7)
                 },
                 new Piece(){
                        id= 12,
                    color= "black",
                    isKing= false,
                     position= new Position(5,0)
                 },
                 new Piece(){
                        id= 13,
                                       color= "black",
                    isKing= false,
                     position= new Position(5,2)
                 },
                 new Piece() {
                        id= 14,
                    color= "black",
                    isKing= false,
                     position= new Position(5,4)
                 },
                 new Piece() {
                        id= 15,
                    color= "black",
                    isKing= false,
                     position= new Position(5,6)
                 },
                 new Piece(){
                        id= 16,
                    color= "black",
                    isKing= false,
                     position= new Position(6,1)
                 },
                 new Piece()
                  {
                        id= 17,
                    color= "black",
                    isKing= false,
                    position= new Position(6,3)
                 },
                 new Piece() {
                        id= 18,
                    color= "black",
                    isKing= false,
                     position= new Position(6,5)
                 },
                 new Piece(){
                        id= 19,
                                       color= "black",
                    isKing= false,
                     position= new Position(6,7)
                 },
                 new Piece(){
                        id= 20,
                                      color= "black",
                    isKing= false,
                     position= new Position(7,0)
                 },
                 new Piece(){
                        id= 21,
                    color= "black",
                    isKing= false,
                     position= new Position(7,2)
                 },
                 new Piece(){
                        id= 22,
                                        color= "black",
                    isKing= false,
                     position= new Position(7,4)
                 },
                 new Piece(){
                        id= 23,
                                     color= "black",
                    isKing= false,
                     position= new Position(7,6)
                 }
            };

            return Pieces;
        }


    }
}



