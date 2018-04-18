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
const int generatorLowPin = A12;
const int generatorHighPin = A11;

// Control
const int genActPin = 8;
const int motorActPin = 7;
const int loadRedLED = 9; // Analog output pin that the LED is attached to

// Constants
const int R1 = 468;

float solarVoltage = 0;
float powerRail = 0;
float solarCurrentRawV = 0;
float loadCurrent = 0;
float genHighV = 0;
float genLowV = 0;

const int bufferSize = 20;
float solarVBuffer[bufferSize];
float powerRailBuffer[bufferSize];
float loadIBuffer[bufferSize];
float genHighBuffer[bufferSize];
float genLowBuffer[bufferSize];
int stackPtr = 0;

#define push(d, arr) arr[stackPtr] = d

float getBufferAvg(float arr[]) {
  float avg = 0;
  for (int i=0; i<bufferSize; i++) {
    avg += arr[i];
  }
  return avg / bufferSize;
}

int generatorValue = 250;
int motorValue = 0;
int outputValue = 0;        // value output to the PWM (analog out)

void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);

  analogWrite(genActPin, generatorValue);
  analogWrite(motorActPin, motorValue);
  analogWrite(loadRedLED, outputValue);
}

char data;
const float encToV = 204.6;
void loop() {
    solarVoltage = analogRead(solarVoltagePin) / encToV;
    powerRail = analogRead(powerRailPin) / encToV;
    solarCurrentRawV = analogRead(solarCurrentPin) / encToV;
    loadCurrent = (powerRail - solarCurrentRawV) * 1000 / R1;

    genHighV = analogRead(generatorHighPin) / encToV;
    genLowV = analogRead(generatorLowPin) / encToV;
    push(solarVoltage, solarVBuffer);
    push(powerRail, powerRailBuffer);
    push(loadCurrent, loadIBuffer);
    push(genHighV, genHighBuffer);
    push(genLowV, genLowBuffer);

    stackPtr++;
    if (stackPtr == bufferSize) {
      stackPtr = 0;
      Serial.print(getBufferAvg(solarVBuffer));
      Serial.print(',');
      Serial.print(getBufferAvg(powerRailBuffer));
      Serial.print(',');
      Serial.print(getBufferAvg(loadIBuffer));
      Serial.print(',');
      Serial.print(getBufferAvg(genHighBuffer));
      Serial.print(',');
      Serial.print(getBufferAvg(genLowBuffer));
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
  String msgStr = String(message);
  // find command values
  int lastIndex = 0;
  generatorValue = msgStr.substring(0, 2).toInt();
  motorValue = msgStr.substring(4, 6).toInt();
  outputValue = msgStr.substring(8, 10).toInt();
  Serial.print(generatorValue);
  Serial.print(motorValue);
  Serial.print(outputValue);
  analogWrite(generatorHighPin, generatorValue);
  analogWrite(generatorLowPin, motorValue);
  analogWrite(loadRedLED, outputValue);
}

