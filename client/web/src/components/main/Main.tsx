import { useEffect, useState } from "react"
import Plants from "../plants/Plants"

function Main(){

    let [title, setTitle] = useState('Nazev rostliny')
    
    let  [plantlocation, setolantlocation] = useState(' ')

    let plant: any = Plants.map((e) => {
            return (
                <li key={e.id}>{e.name}</li>
            )
    })

    useEffect(() => {

        const ul = document.querySelector('ul') as  HTMLUListElement
        const list: any = ul.querySelectorAll('li')

        for(let i of list){
            i.addEventListener('click', () => {
                setTitle(i.textContent)

                Plants.forEach((e) => {
                    if(e.name === i.textContent){
                        setolantlocation(e.location)
                    }
                })

            })

            
        }
    }, [])
   

    return (
        <main id="main" className="h-[100%] w-[100%] m-l-0 grid grid-rows-3 grid-cols-3">
            <h1 className="text-[50px] justify-self-center self-center text-[#d3d6d0]">{title}</h1>
            <div className="row-start-2 h-full w-full ml-5  overflow-y-auto border-[#d3d6d0] border-y-2">
                <ul>{plant}</ul>
            </div>
            <div className="row-start-2 col-start-3">
                <h5>nazev: {title}</h5>
                <p>vyskyt: {plantlocation}</p>
            </div>
            <iframe className="col-end-4 w-full h-full" id="map" src="https://mapy.cz/zakladni?x=16.5914000&y=49.2232000&z=11"></iframe>
        
        </main>
    )
}

export default Main