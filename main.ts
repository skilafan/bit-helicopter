input.onGesture(Gesture.Shake, function () {
    latestShakeTime = input.runningTime()
})
let motor1 = 0
let latestShakeTime = 0
basic.showLeds(`
    . . . . .
    . # . # .
    . # # # .
    . # . # .
    . . . . .
    `)
basic.pause(100)
basic.showIcon(IconNames.Asleep)
basic.forever(function () {
    if (input.runningTime() - latestShakeTime < 3000) {
        motor1 = 1
    } else {
        motor1 = 0
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
