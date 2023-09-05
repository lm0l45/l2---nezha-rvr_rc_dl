radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        radar = -1 * radar
    }
})
datalogger.onLogFull(function () {
    basic.showIcon(IconNames.Skull)
    radio.sendNumber(1)
})
radio.onReceivedValue(function (name, value) {
    if (name == "x") {
        valor_x = value
    }
    if (name == "y") {
        valor_y = value
    }
})
let valor_y = 0
let valor_x = 0
let radar = 0
basic.showIcon(IconNames.SmallDiamond)
radio.setGroup(1)
basic.showIcon(IconNames.Cow)
radar = -1
loops.everyInterval(500, function () {
    datalogger.log(datalogger.createCV("so", input.soundLevel()))
})
basic.forever(function () {
    neZha.setMotorSpeed(neZha.MotorList.M1, -1 * (valor_x + valor_y))
    neZha.setMotorSpeed(neZha.MotorList.M4, -1 * (valor_y - valor_x))
    if (radar == 1) {
        neZha.setServoSpeed(neZha.ServoList.S1, -100)
        basic.pause(2000)
        neZha.setServoSpeed(neZha.ServoList.S1, 100)
        basic.pause(2000)
    } else {
        neZha.setServoSpeed(neZha.ServoList.S1, 0)
    }
})
basic.forever(function () {
    serial.writeValue("so", input.soundLevel())
})
