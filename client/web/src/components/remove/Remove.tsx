
function Remove(){
    // veme hodnoty z promptu
    const plantname = prompt("Zadejte hodnotu")

    let ul = document.querySelector('ul') as HTMLUListElement
    let lists: any = ul.querySelectorAll('li')

    for(let i of lists){
        if(i.textContent === plantname){
            // smazani elementu ze stranky
            i.remove()
        }
    }


}

export default Remove