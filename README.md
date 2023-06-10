# Twitter Clone Frontend

## What is this?

This project is the frontend to a Twitter Clone. I have another repo with the backend. This project was started by following the steps in this video series by notJust.dev. At the moment, this project deviates from the video series by using Drizzle ORM instead of Prisma, using Neon instead of Amazon RDS, and using an HTML template instead of text for the emails.

Essentially, this Twitter clone allows users to create an account or sign in via a passwordless authentication workflow. Once authenticated, users can see every tweet and create new tweets. The tokens (used in the passwordless authentication workflow), the users, and the tweets are all stored in a Neon database. Clients communicate with the database through REST API endpoints within an Express.js application stored in an Amazon EC2 instance.

(Expand more on the passwordless authentication workflow)

## Can you show me how the app works?

Here is a simple example of how you can use the app.

1. Enter your email and click on Sign In.  
   ![Sign in page with an email entered in](https://uploadthing.com/f/7ff90892-7160-4abc-a737-0b4dd4456a70_demo%20pt%201.jpg)

2. Find the email with the single-use, six-digit code.  
   ![Email with the code](https://uploadthing.com/f/6bcef9ed-605f-4b6e-95f3-ee29c5fc18c9_demo%20pt%202.jpg)

3. Enter the code and click on Confirm.  
   ![Confirmation page with the code entered in](https://uploadthing.com/f/ef7b6937-5468-4c79-b792-932cdae5f14e_demo%20pt%203.jpg)

4. At the moment, you update the user with a name and an image using a tool similar to Insomnia.  
   ![HTTP request completed by Insomnia](https://uploadthing.com/f/3584f364-b99a-4e8f-8e56-ed49572a0d91_demo%20pt%204.jpg)

5. Click on the bottom right blue button with a plus.  
   ![Feed page](https://uploadthing.com/f/05345342-f26e-4b21-8c2c-a3df2d727352_demo%20pt%205.jpg)

6. Enter some text for a tweet and click on Tweet.  
   ![New tweet page with text entered in](https://uploadthing.com/f/0c3b201c-6819-4880-a971-c1b01e7e7beb_demo%20pt%206.jpg)

7. You can see your new tweet in the feed!  
   <img src="https://uploadthing.com/f/6b578d16-be0a-4a71-b000-df8f3b87f092_demo%20pt%207.jpg" width=25% height=25%>

## How can I recreate this app?

1. Download the frontend and backend.
2. Create a development database and a production database.
3. Connect the backend to the two databases.
4. Use an email service and connect it to the backend.
5. Create a production backend on a separate server.
6. Connect the frontend to the two backends.

## Why did you try to clone Twitter of all things?

The video series by notJust.dev seemed to be a great opportunity to increase my experiences working with the frontend and databases, and start developing skills working with a server and in fullstack development.

(Expand on this more)

## Future Plans?

First off, I plan to remove all the unnecessary files and code related to the Expo template this project started with. Afterwards, I plan to fix up the feed screen, the individual tweet screen and the new tweet screen. Once I polish the existing screens, I plan to add new screens related to adding, updating and deleting the user's details. After that, I plan to allow users to sign out of the application and to smooth out how authentication works under the hood. Finally, I plan to use uploadthing to implement the ability to add pictures to the app.

## Credits

1. Video Series
2. Expo
3. React-Query
4. dotenv tools
5. Drizzle ORM
6. Neon
7. Amazon AWS tools
8. Android Studio
9. Beekeeper Studio
10. Insomnia
11. PM2
12. React Native
13. React
14. TypeScript

(add links to the documentation)
