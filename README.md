Following are the instructions 

Step 1 : Clone project 
- To clone project : git clone https://github.com/AfsanIdrisi/theblogs.git
- After cloning navigate to directory theblogs


Step 2 : Database Uploadation
-Open xampp or any other tool for database (Xampp is recommended because database password is set to default which is nothing)
-Create a database name " blogpage " 
-In main directory there will be a blogs.sql file import it as table to blogpage database
-If you want to change any configuration of database like password or anything you can change it in file path : backend/server.js(line no 13)
Download Below Dependencies after navigating to backend folder
- nodemon
- express
run script in terminal : nodemon server.js
check Terminal if it is showing "connected to sql" then database is connected and port is getting listen on localhost port 5000
open another terminal and navigate to theblogs run : npm run dev 
