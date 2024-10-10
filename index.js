// import 'dotenv/config';
// import express, { urlencoded } from 'express';
// import mongoose from 'mongoose';
// import { connectDB, disconnectDB } from './config/dbConfig.js';
// const PORT=8080;
// import ErrorHandler from "./utils/ErrorHandler.js"
// import cors from "cors";
// const app = express();
// import projectRoutes from "./routes/projectRoute.js";
// import questionRoutes from "./routes/questionRoute.js";
// import userRoutes from "./routes/userRoute.js";




// connectDB();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.use("/api/users", userRoutes);
// app.use("/api/topic",projectRoutes);
// app.use("/api/questions",questionRoutes);
// app.use("/api/admin",projectRoutes);



// app.use((err, req, res, next) => {
//     err.statusCode = err.statusCode || 500;
//     err.message = err.message || 'Internal Server Error';

//     res.status(err.statusCode).json({
//         status: "failure",
//         code: err.statusCode,
//         message: err.message,
//         data: []
//     });
// });

// app.use((data, req, res, next) => {
//     data.message = data.message || 'Fetch Successfully';
//     data.data = data.data||[] ;

//     res.status(data.statusCode).json({
//         code: data.statusCode,
//         message: data.message,
//         data:data.data
//     });
// });



// // create a route at /
// app.get("/", (req, res) => {
//     res.send(`<!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Quiz App</title>
//       </head>
//       <body style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; height: 100vh;">
//         <div style="text-align: center; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
//           <h1 style="color: #333333;">Welcome to the Quiz API</h1>
//           <p style="color: #666666;">This is the first Landing Page to Quiz!</p>
//         </div>
//       </body>
//       </html>`);
//   });
  
  
// app.get("/api", (req, res) => {
    
//     const isConnected = mongoose.connection.readyState === 1;
//     console.log("API is working? " + (isConnected ? 'Connected to MongoDB' : 'Not connected to MongoDB'));
//     res.send(`
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>API Status</title>
//     </head>
//     <body style="font-family: 'Arial', sans-serif; text-align: center; background-color: #f4f4f4; margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; height: 100vh;">
//       <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
//         <h1 style="color: #333333;">Page 2 : API is working!!</h1>
//         <h2>${isConnected ? 'Connected to MongoDB' : 'Not connected to MongoDB'}</h2>
//       </div>
//     </body>
//     </html>
//   `);
// });



//   app.all('*', (req, res, next) => {
//     const error = new ErrorHandler('Page Not Found',404);
//     res.status(error.statusCode).send(`<!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>404 Not Found</title>
//         <style>
//           body {
//             font-family: 'Arial', sans-serif;
//             background-color: #f4f4f4;
//             margin: 0;
//             padding: 0;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             height: 100vh;
//             text-align: center;
//           }
//           .container {
//             background-color: #ffffff;
//             padding: 20px;
//             border-radius: 8px;
//             box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//           }
//           .error-code {
//             color: #ff0000;
//             font-size: 100px; 
//             margin: 0;
//           }
//           .message {
//             color: #333333;
//             font-size: 20px;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <h1 class="error-code">404</h1>
//           <p class="message">This page does not exist.</p>
//         </div>
//       </body>
//       </html>`);
//   });
    

// app.all('*', async (request, response, next) => {
//     next(new AppError(`Can't find ${request.originalUrl} on this server`, 404));
//   });
  


// app.listen(PORT,()=>{
//     console.log(`Server is running on port ${PORT}`);
// })



import express from "express";
const app=express();
import cors from "cors";
import 'dotenv/config';
import { connectDB, disconnectDB } from './config/dbConfig.js';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB();

// // create a route at /
app.get("/", (req, res) => {
    res.send(`<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Quiz App</title>
      </head>
      <body style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; height: 100vh;">
        <div style="text-align: center; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #333333;">Welcome to the Quiz API</h1>
          <p style="color: #666666;">This is the first Landing Page to Quiz!</p>
        </div>
      </body>
      </html>`);
  });


  
app.listen(8080,()=>{
    console.log(`Server is running on port ${8080}`);
})