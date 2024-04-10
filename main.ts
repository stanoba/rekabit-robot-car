// Press Button A to set variable "Go" to 1 (i.e. change to moving mode)
input.onButtonPressed(Button.A, function () {
    basic.showLeds(`
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        `)
    Go = 1
})
// Press Buttons A and B at the same time to *toggle the big LEDs.
// 
// "Toggle" means to switch from one state to another. If the current state is ON, then it will switch to OFF; and vice versa.
input.onButtonPressed(Button.AB, function () {
    if (LED == 0) {
        LED = 1
    } else {
        LED = 0
    }
})
// Press Button B to set variable "Go" to 0 (i.e. change back to standby mode)
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.No)
    Go = 0
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (LED == 0) {
        LED = 1
    } else {
        LED = 0
    }
})
let LED = 0
let Go = 0
basic.showIcon(IconNames.Chessboard)
rekabitUltrasonic.setUltrasonicTrigEcho(RekabitUltrasonicIOPins.p2_p12)
rekabitRgbStick.create(RekabitPortYellowPin.P1)
Go = 0
// Always check "Go" variable. If it is 1, then run the moving mode.
// 
// Moving Mode: Always check ultrasonic sensor. If obstacle is detected <15cm away,
// 
// stop and light up RGB stick in RED
// 
// 
// 
// 
// 
// and then turn right for 1200ms to steer away from the obstacle.
// 
// 
// 
// 
// 
// 
// Else (if no obstacle is detected),
// keep moving forward and light up RGB stick in GREEN.
// 
// 
// 
// 
// 
// 
// Else if "Go" variable is 0, then run standby mode (i.e. stop and light up RGB stick in rainbow colours)
basic.forever(function () {
    if (Go == 1) {
        if (rekabitUltrasonic.compareDistance(RekabitAnalogCompareType.LessThan, 15)) {
            rekabit.brakeMotor(MotorChannel.All)
            rekabitRgbStick.showColor(0xff0000)
            basic.pause(500)
            basic.showLeds(`
                . . # . .
                . # # # .
                # . # . #
                . . # . .
                . . # . .
                `)
            rekabit.runMotor(MotorChannel.M1, MotorDirection.Forward, 80)
            rekabit.runMotor(MotorChannel.M2, MotorDirection.Backward, 80)
            basic.pause(1200)
            rekabit.brakeMotor(MotorChannel.All)
        } else {
            basic.showLeds(`
                . . # . .
                . . # . .
                # . # . #
                . # # # .
                . . # . .
                `)
            rekabit.runMotor(MotorChannel.All, MotorDirection.Forward, 128)
            rekabitRgbStick.showColor(0x00ff00)
        }
    } else {
        rekabit.brakeMotor(MotorChannel.All)
        rekabitRgbStick.showRainbow()
    }
})
basic.forever(function () {
    if (LED == 1) {
        pins.digitalWritePin(DigitalPin.P15, 1)
        pins.digitalWritePin(DigitalPin.P16, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.digitalWritePin(DigitalPin.P16, 0)
    }
})
