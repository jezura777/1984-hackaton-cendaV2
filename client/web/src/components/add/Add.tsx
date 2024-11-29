import Plants from "../plants/Plants"

function Add(){

    let i:number = 51

    // veme hodnoty z formulare
    const plantname = document.querySelector('#im') as HTMLInputElement
    const plantlocation = document.querySelector('#il') as HTMLInputElement

    // ulozeni hodnot z inputu a formulare a vytvoreni elementu
    let newlist = document.createElement('li')!
    const ul = document.querySelector('ul') as HTMLUListElement
    const form = document.querySelector('#form') as HTMLFormElement
    const tep = document.querySelector('#te') as HTMLFormElement
    const pre = document.querySelector('#tl') as HTMLFormElement
    const uts = document.querySelector('#vm') as HTMLFormElement

    // zabrani refreshnuti stranky
    form.addEventListener('submit',(e) => {
        e.preventDefault()
    })

    //vypsani elementu do stranky
    newlist.textContent = plantname.value
    ul.appendChild(newlist)

    //ulozeni do pole
    Plants[i] = {id: i, name: plantname.value, location: plantlocation.value, image: '', point: plantlocation.value, tep: tep.value, pre: pre.value, uts: uts.value}
    i++

    //vycisteni inputu
    plantname.value = ''
    plantlocation.value = ''
}

export default Add