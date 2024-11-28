import { useState } from 'react'
import Plants from '../plants/Plants'

function NavBar(){

    let plantname: any
    const [data, setData] = useState(Plants)

    function rend(){
        let plant: any = Plants.map((e) => {
            return (
                <li key={e.id}>{e.name}</li>
            )
        })
    }
 


    return (
        <div id='sidebar' className="h-[100%] w-[200px] bg-[#f2f3f1] m-r-0 border-black border-r-2 flex flex-col items-center">
            <button className='border-black border-b-2 w-[150px] mx-[10px]'>Přidat</button>
            <button className='border-black border-b-2 w-[150px] mx-[10px]'>Odebrat</button>
        </div>
    )
}

export default NavBar