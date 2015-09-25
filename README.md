# CO-Sales-App
CO Sales App Front End

Description
-----------

This is a front-end application layer that has been designed to communicate with the provided back-end.


What's Included
---------------

The archive contains the following:

1. "Wink" directory: it has a video 'walkthrough.mp4' that previews the required features.

2. "Code" directory: it has the source code of the front-end application layer. This is the directory structure:
	-fonts/ : contains glyphicons font
	-js/
		-lib/ : contains 3rd party libraries
		-controllers/ : contains application controllers
		-services/ : contains application services
		-app.js
	-views/ : containes application partial views / templates
	-css/	: contains style sheets
	-images/	:contains images
	-favicon.ico
	-index.html

3. "Layout.pdf" : contains screens layout design.

3. "Screens" directory : contains high res screen design.

4. "README.txt".


Application Features
--------------------
1. Login validation againest missing fields and wrong login information.

2. All required features and charts with resizable, dragable, movable, close and refresh data from server options.

3. Application is responsive and works with all screen sizes and mobile devices.


How To Use The Application
--------------------------

1. Copy "Code" directory content into your localhost web folder under a new directory (e.g. : salesapp/) and make sure it has the proper permission.

2. Go to js/services/Configuration.js and edit the back-end host URL if needed (default is 'http://localhost:8080' as provided).

3. Make sure the back-end is up and running.

4. Open the application in your browser. The URL should look like this : http://localhost/salesapp/index.html

5. This will automatically redirect you to the login screen. The URL should look like this : http://localhost/salesapp/index.html#/login

6. Log in with one of the available user names and passwords.
