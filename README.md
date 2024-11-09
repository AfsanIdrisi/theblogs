Following are the instructions 


**SetUp**
Step 1 : Clone project 
- To clone project : git clone https://github.com/AfsanIdrisi/theblogs.git
- After cloning open terminal navigate to directory theblogs


Step 2 : Database Uploadation
-Open xampp or any other tool for database (Xampp is recommended because database password is set to default which is nothing)
-Create a database name " blogpage " 
-In main directory there will be a blogs.sql file import it as table to blogpage database
-If you want to change any configuration of database like password or anything you can change it in file path : backend/server.js(line no 13)
Step 3: Start Backend Server 
Navigating to backend folder cd backend
Download Below Dependencies after   
- nodemon
- express
run script in terminal : nodemon server.js
check Terminal if it is showing "connected to sql" then database is connected and server is getting listen on localhost port 5000
open another terminal and navigate to theblogs run : npm run dev 


**Feature Achieved **
Admin Dashboard
Form for editing and and creating blogs - Done
Form basic inputs and seo inputs - Done
Filter Based on publised,draft,all - Done
Display current blogs - Done
Action buttons for editing,deleting, publish or draft any existing blog - Done
A button to navigate to Blog Page - Done

Blog Page(HomePage)
A normal hero section - Done
cards for existing blogs onclick redirect to individual page of blog - Done
A button to navigate to Admin - Done

Individual Blog Page
A blog page containing Image,content and youtube video if added - Done
Dynamic meta data - Done
A button to navigate to Blog Page (HomePage)

Tools Used
- Vs Code
- Xampp
- Postman
Tech Used
- Next js(Frontend)
- Express js(Backend)
- Mysql (Database)

Loved The Project thank you so much to give me this opportunity i am pretty sure i progressed a lot by this project eager to progress more with your company
