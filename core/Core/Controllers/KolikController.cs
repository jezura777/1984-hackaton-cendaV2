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
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Parametr,Hodnota")] KolikModel kolikModel)
        {
            if (ModelState.IsValid)
            {
                _context.Add(kolikModel);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            //return View(kolikModel);
            return NoContent();
        }


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
        }
    }
}
