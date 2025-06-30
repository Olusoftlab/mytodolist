const agendaEl = document.getElementById("agenda")
const scheduleDate = document.getElementById("Schedule-date")
const textEl = document.getElementById("text")
const butEl = document.getElementById("my-but")
const butEl_2 = document.getElementById("my-but-2")
const sumEl = document.getElementById("sum")
const formEl = document.querySelector("form")
const soundDom = document.getElementById("sound-dom")
const alarmDom = document.getElementById("alarm-dom")
const alarm_h2 = document.getElementById("alarm-h2")
const containerEl = document.getElementById("container")
const bodyEl = document.querySelector("body")








alarmDom.addEventListener("click", () => {

    alarmDom.style.display = "none"
    soundDom.loop = false
    containerEl.style.opacity = 1



})





let scheduleList = {}
let startData = []

let myDate
let timer
let n=0



const getStarted = localStorage.getItem("newList")
const getDateArr = JSON.parse(getStarted)

console.log(getDateArr)






getDateArr.forEach(item => {

    const itemDate = item.myDate.substring(11, 16)
    const itemNote = item.myNote



    function fetchAlarm() {

        myDate = new Date().toString()



        if (myDate.includes(itemDate)) {
            alarmDom.style.display = "block"
            alarm_h2.textContent = itemNote
            containerEl.style.opacity = 0.4
            soundDom.play()
            soundDom.loop = true
            clearTimeout(timer)
        }



        timer = setTimeout(() => {

            fetchAlarm()

        }, 60000)

    }


    fetchAlarm()


})


// localStorage.clear("supplementAll")
// localStorage.clear("arrivalAll")

// localStorage.clear()
// localStorage.clear()


// localStorage.clear()

butEl.addEventListener("click", (e) => {

    e.preventDefault()

    scheduleList.myNote = textEl.value
    scheduleList.myDate = scheduleDate.value
    scheduleList.id=textEl.value

    const latestData = localStorage.getItem("verilog")

    const storedData = JSON.parse(latestData)

    if (storedData) {

        startData = [...storedData, scheduleList]
        localStorage.setItem("newList", JSON.stringify(startData))
        textEl.value = ""
        agendaEl.value = ""
        scheduleDate.value = ""
        scheduleList = {}
    
    }
     else {


        startData.push(scheduleList)

        localStorage.setItem("newList", JSON.stringify(startData))

        console.log(startData)

        textEl.value = ""
        scheduleList.value = ""
        agendaEl.value = ""
        scheduleDate.value = ""
        scheduleList = {}

    }

})



butEl_2.addEventListener("click", (e) => {

    e.preventDefault()

    const dataTray = localStorage.getItem("newList")
    startData = JSON.parse(dataTray)
    
    console.log(startData)


    localStorage.setItem("verilog", JSON.stringify(startData))



    const divEl = document.createElement("div")

    if (startData.length === 0) {

        formEl.innerHTML = ""
        sumEl.textContent = "No Schedules"
    } else {

        formEl.innerHTML = ""
        sumEl.textContent = "Schedules"

        startData.forEach(item => {
        
            const subDiv = document.createElement("div")
            const inputEl = document.createElement("input")
            inputEl.type = "text"
            inputEl.value = `${item.myNote}  ${item.myDate}`
            inputEl.id=inputEl.value
            inputEl.style.cursor="pointer"
            inputEl.style.width="500px"
            subDiv.appendChild(inputEl)
            divEl.appendChild(subDiv)    
            
            subDiv.addEventListener("click", ()=>{

                subDiv.remove()
                startData.splice(startData.indexOf(item),1)
                console.log(startData)
                
                if (startData.length === 0){
                    
                    localStorage.setItem("verilog", JSON.stringify(startData))
                     
                }

                localStorage.setItem("newList", JSON.stringify(startData))


            })

        })



        formEl.append(divEl)

    }

    const scheduleBut = document.createElement("button")
    scheduleBut.textContent = "Make Schedule"
    scheduleBut.classList.add("scheduleBut")
 
    formEl.append(scheduleBut)

}


)

