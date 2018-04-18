/*
  Analog input, analog output, serial output

 Reads an analog input pin, maps the result to a range from 0 to 255
 and uses the result to set the pulsewidth modulation (PWM) of an output pin.
 Also prints the results to the serial monitor.

 The circuit:
 * potentiometer connected to analog pin 0.
   Center pin of the potentiometer goes to the analog pin.
   side pins of the potentiometer go to +5V and ground
 * LED connected from digital pin 9 to ground

 created 29 Dec. 2008
 modified 9 Apr 2012
 by Tom Igoe

 This example code is in the public domain.

 */

// Sensors
const int solarVoltagePin = A15;  // Analog input pin that the potentiometer is attached to
const int powerRailPin = A14;
const int solarCurrentPin = A13;

// Control
const int loadRedLED = 9; // Analog output pin that the LED is attached to

// Constants
const int R1 = 468;

float solarVoltage = 0;
float powerRail = 0;
float solarCurrentRawV = 0;
float loadCurrent = 0;

const int bufferSize = 20;
float solarVBuffer[bufferSize];
float powerRailBuffer[bufferSize];
float loadIBuffer[bufferSize];
int stackPtr = 0;

#define push(d, arr) arr[stackPtr] = d

float getBufferAvg(float arr[]) {
  float avg = 0;
  for (int i=0; i<bufferSize; i++) {
    avg += arr[i];
  }
  return avg / bufferSize;
}

int outputValue = 150;        // value output to the PWM (analog out)

void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);

  analogWrite(loadRedLED, outputValue);
}

char data;

void loop() {
    solarVoltage = analogRead(solarVoltagePin) / 204.6;
    powerRail = analogRead(powerRailPin) / 204.6;
    solarCurrentRawV = analogRead(solarCurrentPin) / 204.6;
    loadCurrent = (powerRail - solarCurrentRawV) * 1000 / R1;
    push(solarVoltage, solarVBuffer);
    push(powerRail, powerRailBuffer);
    push(loadCurrent, loadIBuffer);

    stackPtr++;
    if (stackPtr == bufferSize) {
      stackPtr = 0;
      Serial.print(getBufferAvg(solarVBuffer));
      Serial.print(',');
      Serial.print(getBufferAvg(powerRailBuffer));
      Serial.print(',');
      Serial.print(getBufferAvg(loadIBuffer));
      Serial.println(';');
      Serial.println(powerRail);
    }

    delay(50);
}

char message[64];

void serialEvent() {
  int len = Serial.available();
  data = (char) Serial.readBytes(message, len);
  Serial.println(message);
  outputValue = atoi(message);
  analogWrite(loadRedLED, outputValue);
}

