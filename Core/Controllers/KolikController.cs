﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Core.Data;
using Core.Models;
using System.Net;
using Microsoft.AspNetCore.Http.HttpResults;
using System.IO;
using System.Text.RegularExpressions;

namespace Core.Controllers
{
    public class KolikController : Controller
    {
        private readonly CoreContext _context;

        public KolikController(CoreContext context)
        {
            _context = context;
        }

        // GET: Kolik
        public async Task<IActionResult> Index()
        {
            return View(await _context.KolikModel.ToListAsync());
        }

        /*
        // GET: Kolik/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var kolikModel = await _context.KolikModel
                .FirstOrDefaultAsync(m => m.Id == id);
            if (kolikModel == null)
            {
                return NotFound();
            }

            return View(kolikModel);
        } */

        // GET: Kolik/Create

        /*
        public IActionResult Create()
        {
            return View();
        }*/

        // POST: Kolik/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[ValidateAntiForgeryToken]


        //
        [Route("/test")]
        [HttpGet]
        public IActionResult Something()
        {
            Console.WriteLine("test");
            return NotFound();
        }

        [Route("Kolik/Endpoint")]
        [HttpPost]

        public IActionResult Endpoint([FromBody] KolikModel kolikModel)
        {
            Console.WriteLine("End point POST");
            var pathToFile = Directory.GetCurrentDirectory() + "\\DatabazeLegit.txt";
            /*if (ModelState.IsValid)
            {
                _context.Add(kolikModel);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            //return View(kolikModel);*/
            if (Directory.Exists(pathToFile))
            {
                Console.WriteLine("Soubor neexistuje, vytvareni");
                Directory.CreateDirectory(pathToFile);
            }

            Console.WriteLine(kolikModel);


            try
            {
                var lines = System.IO.File.ReadAllLines(pathToFile).ToList();

                var existingLineIndex = lines.FindIndex(line => line.StartsWith(kolikModel.Mac));

                if (existingLineIndex >= 0)
                {
                    var existingLine = lines[existingLineIndex];
                    var currentName = existingLine.Split(' ').Last();
                    lines[existingLineIndex] = $"{kolikModel.Mac} {kolikModel.TeplotaV} {kolikModel.Tlak} {kolikModel.Vyska} {kolikModel.Vlhkost} {kolikModel.Svetlo} {kolikModel.TeplotaZ} {kolikModel.Voda} {currentName}";
                }
                else
                {
                    lines.Add($"{kolikModel.Mac} {kolikModel.TeplotaV} {kolikModel.Tlak} {kolikModel.Vyska} {kolikModel.Vlhkost} {kolikModel.Svetlo} {kolikModel.TeplotaZ} {kolikModel.Voda} Heartleaf-Philodendron");
                }
                System.IO.File.WriteAllLines(pathToFile, lines);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

            return Ok(kolikModel);
        }

        [Route("Kolik/FetchTest")]
        [HttpPost]
        public IActionResult FetchTest([FromBody] FetchTest fetchTest)
        {
            return Ok(fetchTest);
        }

        [Route("Kolik/GetData")]
        [HttpGet]
        public IActionResult SendData()
        {
            Console.WriteLine("Request: Send Data");
            var pathToFile = Directory.GetCurrentDirectory() + "\\DatabazeLegit.txt";
            foreach (var line in System.IO.File.ReadLines(pathToFile)) 
            {
                Console.WriteLine(line);
                string[] parts = line.Split(' ');
                if (parts.Length == 9)
                {
                    double TV = double.Parse(parts[1]);
                    double TL = double.Parse(parts[2]);
                    double VY = double.Parse(parts[3]);
                    double VL = double.Parse(parts[4]);
                    int SV = int.Parse(parts[5]);
                    double TZ = double.Parse(parts[6]);
                    short VD = short.Parse(parts[7]);
                    

                    SendDataModel sentData = new SendDataModel { TeplotaV = TV, Tlak = TL, Vyska = VY, Vlhkost = VL, Svetlo = SV, TeplotaZ = TZ, Voda = VD, Jmeno = parts[8], id=1, image= "https://i.imgur.com/EVYoHUx.jpeg" };
                    return Ok(sentData);
                } 
                else
                {
                    return BadRequest();
                }
                
            }
            return BadRequest();
        }
         















        /*
        private string ReplaceName(string line, string Name)
        {
            string pattern = @"\s(\w+)$";
            return Regex.Replace(line, pattern, " " + Name); 
        }*/

        //[Route("")]


        /*
        // GET: Kolik/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var kolikModel = await _context.KolikModel.FindAsync(id);
            if (kolikModel == null)
            {
                return NotFound();
            }
            return NoContent(); //return View(kolikModel);
        }*/

        // POST: Kolik/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.

        /*
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Parametr,Hodnota")] KolikModel kolikModel)
        {
            if (id != kolikModel.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(kolikModel);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!KolikModelExists(kolikModel.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return NoContent();//return View(kolikModel);
        }

        // GET: Kolik/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var kolikModel = await _context.KolikModel
                .FirstOrDefaultAsync(m => m.Id == id);
            if (kolikModel == null)
            {
                return NotFound();
            }

            //return View(kolikModel);
            return NoContent();
        }

        // POST: Kolik/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var kolikModel = await _context.KolikModel.FindAsync(id);
            if (kolikModel != null)
            {
                _context.KolikModel.Remove(kolikModel);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool KolikModelExists(int id)
        {
            return _context.KolikModel.Any(e => e.Id == id);
        }*/
    }
}
