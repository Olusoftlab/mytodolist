const displayEl=document.getElementById("display")

const myWord="Notify"

let i=1
let addWord=""


displayEl.textContent=""


function intDisp(){

    const newWord=myWord.substring(0,i)     

    if (newWord.length === 6){

        i=0  
    }

    displayEl.textContent=newWord 

    i++
   setTimeout(()=>{

      intDisp()

   },300) 


}

intDisp()