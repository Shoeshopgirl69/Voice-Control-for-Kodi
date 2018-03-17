# Voice Control for Kodi
## Requirements:
- Google Home
- IFTTT account linked to your Google Home
- Nvidia Shield (This should work on any Android box.)
- Tasker App
- Tasker Network Event Server App
- Secure Settings App
- These Tasker profiles, tasks, scenes, and javascripts files

## Steps:
 - Install the "Tasker", "Tasker Network Event Server", and "Secure Settings" apps on the Nvidia Shield, all can be found on Google Play
 - Configure your Nvidia Shield so you can access the storage remotely
 - Save the following javascript file under the Tasker folder on the Nvidia Shield https://raw.githubusercontent.com/brianf21/Voice-Control-for-Kodi/master/setupVoiceControl.js  (You should be able to do this on your PC after you mount the Nvidia Shield storage)
 - In tasker create a new Tasks called "Setup Task"
 - When the Task Edit Windows is display click the + symbol to add an action
 - Click Code
 - Click JavaScript
 - Click on the magnify glass. Navigate to the Tasker folder then click on setupVoiceControl.js
 - Click on the back button on the top left corner of the screen to go back to the Task Edit screen
 - Press the play button on the bottom left corner to download the profiles and the rest of the javascripts files
 - After it completes, click the back button on the top left corner to return to the Tasks list
 - Click on the profiles tab to go to the Profiles list
 - Long press on the Profiles tab and import the voice profile, the profile is saved under Tasker/profiles
 - Click the check mark to save your work
 - Open up port 8765 on your router to the private IP of your Nvidia Shield
 - On the Nvidia Shield, launch Kodi and turn on the web server ("Setting > Service Settings > Control"; set username and password)
 - On another computer, install and configure Radarr and Deluge if you are using them
 - Edit the javascript file and replace the IP's and API keys where needed
 - Edit the javascript file and comment out the repo you are not using
 - Install and configure the Trakt plugin in Kodi
 - Install and configure the Exodus or the Neptune Rising plugin in Kodi
 - Configure Trakt settings in Exodus
 - Email me if you need help. gmail brian.faris
  
## Create one IFTTT applet
  
### IFTTT applet:
- Choose "Say a phrase with a text ingredient"
- For "THIS" choose "Google Assistant"
- For "THAT" choose "Maker Webhook"
- Google Assistant
- What do you want to say?: ask jarvis to $ (You can chose any phrase you want, just make it unique.)
- What do you want the Assistant to say in response? okay
- Maker Webhook: ```http://YourPublicIP:8765?voice=<<<Textfield>>>```
- For Textfield, click your text ingredient
- Method: Get
- Content Type: text/plain
  
## Phrases:
``` 
Ok Google, ask jarvis to play <movie name>
Ok Google, ask jarvis to download <movie name>
Ok Google, ask jarvis to play <TV show name>
Ok Google, ask jarvis to press <command>
OK Google, ask jarvis to show <PVR station label>
OK Google, ask jarvis to launch <application>
```

## Commands:
```
pause
up
down
left
right
resume
exit
clean
scan
stop
troubleshooting on \\Generates Kodi logs
troubleshooting off
flash on \\ Generates toast messages
flash off
jump back
jump ahead
skip back
skip ahead
select
enter
back
context
long press
```