const bitBtn = document.getElementById("bitbtn")
const bitText = document.getElementById("bits")
const cpuBtn = document.getElementById("cpubtn")
const cpuStats = document.getElementById("cpustats")

let currentClickAmount = 1
let bits = 0

let cpuCost = 50
let cpuPower = 1
let cpuLvl = 0

function render() {
    bitText.innerText = "Bits: " + bits
    renderStats()
}

function renderStats() {
    cpuStats.innerText = "CPU Level: " + cpuLvl
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