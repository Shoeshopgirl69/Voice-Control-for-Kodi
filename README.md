# Voice-Search
## Requirements:
- Google Home
- IFTTT account linked to your Google Home
- Nvidia Shield (This should work on any Android box.)
- Tasker App
- Tasker Network Event Server App
- These Tasker profiles, tasks, scenes, and javascripts files

 ## Steps:
 - Install the "Tasker" and "Tasker Network Event Server" apps on the Nvidia Shield
 - Configure your Nvidia Shield so you can access the storage remotely
 - Under the Tasker folder on the Nvidia Shield, create a folder called javascripts  (You should be able to do this on your PC after you mount the Nvidia Shield storage)
 - Copy the javascripts files (see above) to the javascripts folder
 - Copy the xml files (see above) to a respective folders in the Tasker folder in the Nvidia Shield storage (Profiles should be copied to the profiles folder and tasks should be copied to the tasks folder.
 - If you are missing any of the folders, please create them.)
 - Launch Tasker on the Nvidia Shield and import the tasks and profiles (the xml files) into Tasker
 - Open up port 8765 on your router to the private IP of your Nvidia Shield
 - On the Nvidia Shield, launch Kodi and turn on the web server ("Setting > Service Settings > Control"; set username and password)
  
## Create three IFTTT applets
  
### First of three IFTTT applets: (This issues commands)
- Choose "Say a phrase with a text ingredient"
- For "THIS" c  3hoose "Google Assistant"
- For "THAT" choose "Maker Webhook"
- Google Assistant
- What do you want to say?: press $ (You can chose any phrase you want, just make it unique.)
- (Current commands: Look at the perform.js to see a full list of the commands..)
- What do you want the Assistant to say in response? okay
- Maker Webhook
```
http://yourkodiusername:yourKodiPassword@YourPublicIP:8765?perform=<<<Textfield>>>
```
- For Textfield, click your text ingredient.
- Method: Get
- Content Type: text/plain
  
### Second of three IFTTT applets: (This launches apps)
- Choose "Say a phrase with a text ingredient"
- For "THIS" choose "Google Assistant"
- For "THAT" choose "Maker Webhook"
- Google Assistant
- What do you want to say?: please launch $ (Google Home ignores the word "please", so you can just say "launch app name".)
- What do you want the Assistant to say in response? launching $
- Maker Webhook
```
http://yourkodiusername:yourKodiPassword@YourPublicIP:8765?launch=<<<Textfield>>>
```
- For Textfield, click your text ingredient.
- Method: Get
- Content Type: text/plain
 
### Create the third of three IFTTT applets: (This plays movies or shows)
- Choose "Say a phrase with a text ingredient"
- For "THIS" choose "Google Assistant"
- For "THAT" choose "Maker Webhook"
- Google Assistant
- What do you want to say?: please play $ (Google Home ignores the word "please", so you can just say "play movie name" or "play TV show name".)
- What do you want the Assistant to say in response? showing $
- Maker Webhook
```
http://yourkodiusername:yourKodiPassword@YourPublicIP:8765?play=<<<Textfield>>>
```
- For Textfield, click your text ingredient.
- Method: Get
- Content Type: text/plain
  
## Update: 6/26/2017

- Download and install Secure Setting on the Nvidia Shield then update the javascripts, tasks, and profiles from the above link. Create a new IFTTT applet with a google assistant trigger phrase of "wake up" and a webhook of "http://YourPublicIP:8765?wake". This will allow you to wake up the Nvidia Shield from daydream.
- The new launch task will allow you to launch amazon video and google movies and TV. You can edit the perform.js script to put in the your channels to control the TV in kodi. You can also have it say things when you issue a voice command. Just uncomment out the section and put in the phrases you want.
