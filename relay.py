import sys
import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BOARD)
args = sys.argv
pin = 18
ctl = args[1]
if (int(ctl) == 1):
  GPIO.setup(pin, GPIO.OUT)
  GPIO.output(pin,GPIO.HIGH)

if (int(ctl) == 0):
  GPIO.setup(pin, GPIO.OUT)
  GPIO.output(pin, GPIO.LOW)
