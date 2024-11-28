import Plants from "../plants/Plants"

function Add(){
    let i: number = 51
    let plantname:string | any = prompt("Zadejte nazev rostliny")
    Plants[i] = {id:i, name: plantname, location: ''}
    i++
}

export default Add