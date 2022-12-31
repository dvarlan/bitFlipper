const bitBtn = document.getElementById("bitbtn")
const bitText = document.getElementById("bits")
const cpuBtn = document.getElementById("cpubtn")
const cpuStats = document.getElementById("cpustats")
const gpuBtn = document.getElementById("gpubtn")
const gpuStats = document.getElementById("gpustats")

let currentClickAmount = 1
let bits = 0
let timer = -1337

let cpuCost = 50
let cpuPower = 1
let cpuLvl = 0

let gpuCost = 100
let gpuPower = 0
let gpuLvl = 0

function render() {
    bitText.innerText = "Bits: " + bits
    renderStats()
}

function renderStats() {
    cpuStats.innerText = "CPU Level: " + cpuLvl
    gpuStats.innerText = "GPU Level: " + gpuLvl
}

function gpuPassive() {
    bits += gpuPower
    render()
}

bitBtn.addEventListener("click", function addBits () {
    bits += currentClickAmount
    render()
})

cpuBtn.addEventListener("click", function () {
    if(bits < cpuCost) {
        alert(`You need ${cpuCost} bits to buy this upgrade!`)
    } else {
        bits -= cpuCost
        currentClickAmount += cpuPower 
        cpuCost *= 2
        cpuPower++
        cpuLvl++
        render()
    }
})

gpuBtn.addEventListener("click", function () {
    if(bits < gpuCost) {
        alert(`You need ${gpuCost} bits to buy this upgrade!`)
    } else {
        bits -= gpuCost
        gpuCost *= 3
        if(timer !== -1337) {
            clearInterval(timer)
        }
        timer = setInterval(gpuPassive, 10000) // Time in ms (10sec)
        gpuPower++
        gpuLvl++
        render()
    }
})