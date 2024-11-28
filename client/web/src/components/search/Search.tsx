function Search(){


        let iframe = document.querySelector('iframe') as HTMLIFrameElement
        let x = Math.floor(Math.random() * 20),y = Math.floor(Math.random() * 20)
        iframe.src = `https://mapy.cz/zakladni?x=${x}y=${y}&z=11`


}

export default Search