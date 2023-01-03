const bitBtn = document.getElementById("bitbtn")
const bitText = document.getElementById("bits")
const cpuBtn = document.getElementById("cpubtn")
const cpuStats = document.getElementById("cpustats")
const gpuBtn = document.getElementById("gpubtn")
const gpuStats = document.getElementById("gpustats")
const saveBtn = document.getElementById("savebtn")
const resetBtn = document.getElementById("resetbtn")

let currentClickAmount = 1
let bits = 0
let timer = -1337

let cpu = {
    cpuCost : 50,
    cpuPower: 1,
    cpuLvl: 0
}

let gpu = {
    gpuCost : 100,
    gpuPower : 0,
    gpuLvl : 0
}

// Check if the player has an existing save & load it
if (localStorage.length !== 0) {
    const cpuInfo = JSON.parse(localStorage.getItem("cpuInfo"))
    const gpuInfo = JSON.parse(localStorage.getItem("gpuInfo"))
    const bitInfo = JSON.parse(localStorage.getItem("bitInfo"))
    const clickInfo = JSON.parse(localStorage.getItem("clickInfo"))
    
    cpu = cpuInfo
    gpu = gpuInfo
    bits = bitInfo
    currentClickAmount = clickInfo
    
    timer = setInterval(gpuPassive, 10000)

    render()
}

function render() {
    bitText.innerText = "Bits: " + bits
    renderStats()
}

function renderStats() {
    cpuStats.innerText = "CPU Level: " + cpu.cpuLvl
    gpuStats.innerText = "GPU Level: " + gpu.gpuLvl
}

function gpuPassive() {
    bits += gpu.gpuPower
    render()
}

saveBtn.addEventListener("click", function () {
    localStorage.setItem("cpuInfo", JSON.stringify(cpu))
    localStorage.setItem("gpuInfo", JSON.stringify(gpu))
    localStorage.setItem("bitInfo", JSON.stringify(bits))
    localStorage.setItem("clickInfo", JSON.stringify(currentClickAmount))
})

resetBtn.addEventListener("click", function () {
    if (confirm("Do you really want to reset your current game?")) {
        if(localStorage.getItem("cpuInfo") !== null) {
            localStorage.clear()
        }
        location.reload()
    }
})

bitBtn.addEventListener("click", function addBits () {
    bits += currentClickAmount
    render()
})

cpuBtn.addEventListener("click", function () {
    if(bits < cpu.cpuCost) {
        alert(`You need ${cpu.cpuCost} bits to buy this upgrade!`)
    } else {
        bits -= cpu.cpuCost
        currentClickAmount += cpu.cpuPower 
        cpu.cpuCost *= 2
        cpu.cpuPower++
        cpu.cpuLvl++
        render()
    }
})

gpuBtn.addEventListener("click", function () {
    if(bits < gpu.gpuCost) {
        alert(`You need ${gpu.gpuCost} bits to buy this upgrade!`)
    } else {
        bits -= gpu.gpuCost
        gpu.gpuCost *= 3
        if(timer !== -1337) {
            clearInterval(timer)
        }
        timer = setInterval(gpuPassive, 10000) // Time in ms (10sec)
        gpu.gpuPower++
        gpu.gpuLvl++
        render()
    }
})

// Checks if the user wants to close the page & makes them confirm it
window.addEventListener("beforeunload", function (e) {
    if (e) {
        e.returnValue = "Are you sure?"
    }
}, false)