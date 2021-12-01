#include <Arduino.h>
#include <ESP8266WiFi.h>
#include "credentials.h"

#define D0 16
#define D1 5
#define D2 4
#define D3 0
#define D4 2
#define D5 14
#define D6 12
#define D7 13
#define D8 15

/**
 * @board ESP-8266
 */

WiFiServer server(80);

void setup()
{
  // put your setup code here, to run once:
  Serial.begin(9600);
  // let's open the D5 pin as an output
  pinMode(D5, OUTPUT);
  pinMode(LED_BUILTIN, OUTPUT);

  // open the wifi connection
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(WiFi.SSID());
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  // open the server

  server.begin();
  Serial.println("Server started");
}

// method that will handle the incoming requests
String handleRequest(String request)
{
  String path = request.substring(request.indexOf("/"), request.indexOf("HTTP") - 1);
  Serial.println(path);
  if (path == "/on")
  {
    digitalWrite(D5, HIGH);
    return "<a href='/off' style='font-size:28px;'>Turn off</a>";
  }
  else if (path == "/off")
  {
    digitalWrite(D5, LOW);
    return "<a href='/on' style='font-size:28px;'>Turn on</a>";
  }
  else
  {
    return "<a href='/on' style='font-size:28px;'>Turn on</a><br><a href='/off' style='font-size:28px;'>Turn off</a>";
  }
}

void loop()
{
  // put your main code here, to run repeatedly:
  WiFiClient client = server.available();
  if (client)
  {
    // an http request ends with a blank line
    boolean currentLineIsBlank = true;
    String request = "";
    while (client.connected())
    {
      if (client.available())
      {
        char c = client.read();
        Serial.write(c);
        // if you've gotten to the end of the line (received a newline
        // character) and the line is blank, the http request has ended,
        // so you can send a reply
        if (c == '\n' && currentLineIsBlank)
        {
          // send a standard http response header
          client.println("HTTP/1.1 200 OK");
          client.println("Content-Type: text/html");
          client.println("Connection: close"); // the connection will be closed after completion of the response
          client.println();
          // send the content of the requested file
          client.print(handleRequest(request));
          break;
        }
        if (c == '\n')
        {
          // you're starting a new line
          currentLineIsBlank = true;
        }
        else if (c != '\r')
        {
          // you've gotten a character on the current line
          currentLineIsBlank = false;
        }
        request += c;
      }
    }
    // give the web browser time to receive the data
    delay(10);
    // close the connection:
    client.stop();
  }
}
