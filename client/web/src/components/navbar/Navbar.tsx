
//import Search from '../search/Search'
import Remove from '../remove/Remove'

function NavBar(){

    return (
        <div id='sidebar' className="h-[100%] w-[200px] bg-[#f2f3f1] m-r-0 border-black border-r-2 flex flex-col items-center">
            <button className='border-black border-b-2 w-[150px]' /*onClick={() => Search()}*/>Hledat na mapě</button>
            <button className='border-black border-b-2 w-[150px]' onClick={() => Remove()}>Odstranit</button>
        </div>
    )
}

export default NavBar