# Press Button A to set variable "Go" to 1 (i.e. change to moving mode)

def on_button_pressed_a():
    global Go
    basic.show_icon(IconNames.SWORD)
    Go = 1
input.on_button_pressed(Button.A, on_button_pressed_a)

# Press Buttons A and B at the same time to *toggle the big LEDs.
# 
# "Toggle" means to switch from one state to another. If the current state is ON, then it will switch to OFF; and vice versa.

def on_button_pressed_ab():
    rekabitBigLED.toggle_big_led(RekabitPortYellowPin.P1)
    rekabitBigLED.toggle_big_led(RekabitPortYellowPin.P15)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

# Press Button B to set variable "Go" to 0 (i.e. change back to standby mode)

def on_button_pressed_b():
    global Go
    basic.show_icon(IconNames.NO)
    Go = 0
input.on_button_pressed(Button.B, on_button_pressed_b)

Go = 0
basic.show_icon(IconNames.HEART)
rekabitUltrasonic.set_ultrasonic_trig_echo(RekabitUltrasonicIOPins.P2_P12)
rekabitRgbStick.create(RekabitPortYellowPin.P1)
rekabitBigLED.set_big_led(RekabitPortYellowPin.P13,
    rekabitBigLED.digital_state_picker(RekabitDigitalIoState.OFF))
rekabitBigLED.set_big_led(RekabitPortYellowPin.P15,
    rekabitBigLED.digital_state_picker(RekabitDigitalIoState.OFF))
Go = 0
# Always check "Go" variable. If it is 1, then run the moving mode.
# 
# Moving Mode: Always check ultrasonic sensor. If obstacle is detected <15cm away,
# 
# stop and light up RGB stick in RED
# 
# 
# 
# 
# 
# and then turn right for 1200ms to steer away from the obstacle.
# 
# 
# 
# 
# 
# 
# Else (if no obstacle is detected),
# keep moving forward and light up RGB stick in GREEN.
# 
# 
# 
# 
# 
# 
# Else if "Go" variable is 0, then run standby mode (i.e. stop and light up RGB stick in rainbow colours)

def on_forever():
    if Go == 1:
        if rekabitUltrasonic.compare_distance(RekabitAnalogCompareType.LESS_THAN, 15):
            rekabit.brake_motor(MotorChannel.ALL)
            rekabitRgbStick.show_color(0xff0000)
            basic.pause(500)
            rekabit.run_motor(MotorChannel.M1, MotorDirection.FORWARD, 80)
            rekabit.run_motor(MotorChannel.M2, MotorDirection.BACKWARD, 80)
            basic.pause(1200)
            rekabit.brake_motor(MotorChannel.ALL)
        else:
            rekabit.run_motor(MotorChannel.ALL, MotorDirection.FORWARD, 128)
            rekabitRgbStick.show_color(0x00ff00)
    else:
        rekabit.brake_motor(MotorChannel.ALL)
        rekabitRgbStick.show_rainbow()
basic.forever(on_forever)
