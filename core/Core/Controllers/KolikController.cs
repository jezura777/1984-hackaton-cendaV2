using System;
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
            if(Directory.Exists(pathToFile))
            {
                Console.WriteLine("Soubor neexistuje, vytvareni");
                Directory.CreateDirectory(pathToFile);
            }

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
                    lines.Add($"{kolikModel.Mac} {kolikModel.TeplotaV} {kolikModel.Tlak} {kolikModel.Vyska} {kolikModel.Vlhkost} {kolikModel.Svetlo} {kolikModel.TeplotaZ} {kolikModel.Voda} kolik");
                }
                System.IO.File.WriteAllLines(pathToFile, lines);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");            
            }

            return Ok(kolikModel);
        }

        private string ReplaceName(string line, string Name)
        {
            string pattern = @"\s(\w+)$";
            return Regex.Replace(line, pattern, " " + Name); 
        }

        /*
        [Route("Data/Nazev")]
        [HttpPost]
        public IActionResult zNazev([FromBody] Nazev nNazev)
        {
            var pathToFile = Directory.GetCurrentDirectory() + "\\DatabazeLegit.txt";
            if (Directory.Exists(pathToFile))
            {
                Console.WriteLine("Soubor neexistuje, vytvareni");
                Directory.CreateDirectory(pathToFile);
            }


        }*/


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
