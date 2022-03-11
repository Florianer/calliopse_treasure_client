// THIRD TREASURE - needs written hint: Ich bin prim prim prima und deshalb weiß meine Gruppe die Antwort auf die Frage nach dem Leben, dem Universum und dem ganzen Rest
function setupForThirdTreasure (intervalInSeconds: number) {
    radio.setGroup(42)
    radio.setTransmitPower(7)
    radio.setTransmitSerialNumber(true)
    // band range: 0 - 83
    // prime numbers in the band
    // 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83
    band = primeNumbers.pop()
    primeNumbers.unshift(band)
    basic.showNumber(band)
    radio.setFrequencyBand(band)
    basic.pause(intervalInSeconds * 1000)
}
input.onButtonPressed(Button.A, function () {
    mode = mode - 1
    if (mode < 1) {
        mode = 3
    }
    selectMode()
})
// SECOND TREASURE
function emitForSecondTreasure (intervalInSeconds: number) {
    radio.setGroup(6)
    radio.setTransmitPower(7)
    radio.setTransmitSerialNumber(true)
    radio.setFrequencyBand(0)
    noise = (noise + 10) % 1000
    radio.sendNumber(noise)
    // basic.showNumber(noise) //addes to the pause
    basic.pause(intervalInSeconds * 1000)
}
radio.onReceivedString(function (receivedString) {
    radio.setGroup(0)
    music.playTone(262, music.beat(BeatFraction.Whole))
    basic.showString(receivedString)
})
input.onButtonPressed(Button.B, function () {
    mode = mode + 1
    if (mode > 3) {
        mode = 1
    }
    selectMode()
})
function selectMode () {
    basic.showNumber(mode)
    basic.pause(200)
    basic.clearScreen()
}
// FIRST TREASURE
function setupForFirstTreasure () {
    radio.setGroup(1)
    radio.setTransmitPower(7)
    radio.setTransmitSerialNumber(true)
    radio.setFrequencyBand(0)
}
let noise = 0
let mode = 0
let band = 0
let primeNumbers: number[] = []
let group = 0
primeNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83]
basic.forever(function () {
    if (mode == 1) {
        setupForFirstTreasure()
    }
    if (mode == 2) {
        emitForSecondTreasure(0.1)
    }
    if (mode == 3) {
        setupForThirdTreasure(1)
    }
})
