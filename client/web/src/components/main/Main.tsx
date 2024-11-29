
     import { useEffect, useState } from "react";
      import Plants from "../plants/Plants";
      import Add from "../add/Add";
      import Remove from "../remove/Remove";
      
      // Databáze
      import axios from "axios";
      import { response } from "express";
      
      interface Product {
        id: number;
        name: string;
        price: number;
      }
      
      function Main() {
        // Výpis elementů na stránku
        let plant: any = Plants.map((e) => {
          return (
            <li
              key={e.id}
              className="py-2 px-4 cursor-pointer hover:bg-green-100 transition duration-200"
            >
              {e.name}
            </li>
          );
        });
      
        // Stav komponenty
        const [title, setTitle] = useState("Název rostliny");
        const [location, setLocation] = useState("Lokace rostliny");
        const [image, setImage] = useState("");
        const [address, setAddress] = useState(
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d166842.54249982783!2d16.41315059961617!3d49.202177199465815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4712943ac03f5111%3A0x400af0f6614b1b0!2sBrno!5e0!3m2!1scs!2scz!4v1732833346881!5m2!1scs!2scz"
        );
        const [airtempature, setAirtempature] = useState(0);
        const [pressure, setPressure] = useState(0);
        const [uts, setUnts] = useState(0);
      
        // useEffect
        useEffect(() => {
      
          // Event Listener pro výběr rostliny
          let ul = document.querySelector("ul") as HTMLUListElement;
          let lists: any = ul.querySelectorAll("li");
      
          for (let i of lists) {
            i.addEventListener("click", () => {
              setTitle(i.textContent);
              Plants.forEach((e) => {
                if (e.name === i.textContent) {
                  setLocation(e.location);
                  setImage(e.image);
                  setAddress(e.point);
                  setAirtempature(e.tep);
                  setPressure(e.pre);
                  setUnts(e.uts);
                }
              });
            });
          }
      
          
        }, []);
      
        return (
          <main
            id="main"
            className="h-screen w-full grid grid-rows-3 grid-cols-3 gap-4 bg-gray-50 p-6"
          >
            
            <h1 className="text-5xl font-bold text-center text-gray-800 col-span-3">
              {title}
            </h1>
      
            
            <div className="row-span-2 col-span-1 h-full overflow-y-auto border border-gray-300 rounded-lg bg-white shadow-md">
              <ul className="divide-y divide-gray-200">{plant}</ul>
            </div>
      
        
            <div className="row-span-2 col-span-1 flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
              <img
                className="h-32 w-32 rounded-full mb-4"
                src={image || "https://via.placeholder.com/100"}
                alt="Plant"
              />
              <h5 className="text-lg font-semibold text-gray-700">Název: {title}</h5>
              <p className="text-sm text-gray-500">Teplota vzduchu: {airtempature}°C</p>
              <p className="text-sm text-gray-500">Tlak: {pressure} hPa</p>
              <p className="text-sm text-gray-500">Nadmořská výška: {uts} m</p>
              <p className="text-sm text-gray-500">Vlhkost: {uts} m</p>
              <p className="text-sm text-gray-500">Svetlo: {uts} m</p>
            </div>
      
           
            <iframe
              className="row-span-2 col-span-1 w-full h-full rounded-lg shadow-md border border-gray-300"
              src={address}
              title="Mapa"
            ></iframe>
      
           
            <form
              id="form"
              className="col-span-3 grid grid-cols-6 gap-4 items-center bg-white p-6 rounded-lg shadow-md border border-gray-300"
            >
              <input
                id="im"
                className="col-span-1 border border-gray-300 p-2 rounded-md"
                type="text"
                placeholder="Název"
              />
              <input
                id="il"
                className="col-span-1 border border-gray-300 p-2 rounded-md"
                type="text"
                placeholder="Výskyt"
              />
              <input
                id="te"
                className="col-span-1 border border-gray-300 p-2 rounded-md"
                type="text"
                placeholder="Teplota"
              />
              <input
                id="tl"
                className="col-span-1 border border-gray-300 p-2 rounded-md"
                type="text"
                placeholder="Tlak"
              />
              <input
                id="vm"
                className="col-span-1 border border-gray-300 p-2 rounded-md"
                type="text"
                placeholder="Nadmořská výška"
              />
              <br />
              <button
                className="col-span-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
                onClick={() => Add()}
              >
                Odeslat
              </button>

              <button className='col-span-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200' 
              onClick={() => Remove()}
              >Odstranit</button>

            </form>
      
            <ul className="col-span-3 grid grid-cols-3 gap-4 mt-4">
            </ul>
          </main>
        );
      }
      
      export default Main