bluetooth.onBluetoothConnected(function () {
    isBluetoothConnected = 1
    for (let index = 0; index <= 2; index++) {
        basic.showIcon(IconNames.Heart)
        basic.pause(500)
        basic.showIcon(IconNames.SmallHeart)
        basic.pause(500)
    }
})
bluetooth.onBluetoothDisconnected(function () {
    isBluetoothConnected = 0
    SuperBit.MotorStopAll()
    basic.showIcon(IconNames.Asleep)
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Hash), function () {
    command = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Space))
})
input.onGesture(Gesture.Shake, function () {
    latestShakeTime = input.runningTime()
})
let motor1 = 0
let latestShakeTime = 0
let command = ""
let isBluetoothConnected = 0
basic.showLeds(`
    . . . . .
    . # . # .
    . # # # .
    . # . # .
    . . . . .
    `)
bluetooth.startUartService()
basic.pause(100)
basic.showIcon(IconNames.Asleep)
basic.forever(function () {
    if (isBluetoothConnected == 0) {
        motor1 = 0
    } else {
        if (command == "#GO") {
            motor1 = 1
        } else if (command == "#STOP") {
            motor1 = 0
        } else {
            motor1 = 0
        }
        if (input.runningTime() - latestShakeTime < 3000) {
            motor1 = 1
        } else {
            motor1 = 0
        }
    }
    if (motor1 == 1) {
        SuperBit.MotorRun(SuperBit.enMotors.M1, 255)
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
    } else {
        SuperBit.MotorRun(SuperBit.enMotors.M1, 0)
        basic.showIcon(IconNames.Asleep)
    }
    basic.pause(200)
})
