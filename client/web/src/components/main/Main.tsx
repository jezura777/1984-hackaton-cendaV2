function Main(){
    return (
        <main id="main" className="h-[100%] w-[100%] m-l-0 grid grid-rows-3 grid-cols-3">
            <h1 className="text-[50px] justify-self-center self-center">Nazev</h1>
            <div className="row-start-2"> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque a dolore sunt consequuntur voluptas assumenda iste quasi, praesentium amet labore minus, soluta magnam facere! Eos asperiores quo libero iste veritatis.</div>
            <iframe className="col-end-4 w-full h-full" id="map" src="https://www.openstreetmap.org/search?query=brno#map=11/49.2023/16.5777"></iframe>
        </main>
    )
}

export default Main