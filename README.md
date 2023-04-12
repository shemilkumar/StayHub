# StayHub - Home Booking Application

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

built using MERN stack with fully Typescripted.
Live URL : **[stayhub.shemilkumar.com](https://stayhub.shemilkumar.com)**

Built Backend using Express in Node.js with MongoDB as Database. Here you can find the [Documentation](https://documenter.getpostman.com/view/25578318/2s93RUvsMi)

## Technologies

* React JS with TypeScript
* Redux Toolkit (State Management)
* TailwindCSS
* API integration using Axois
* MapBox
* Razorpay
* React datepicker
* Vite (development tool)
* Express in Node.js with TypeScript
* MongoDB (Database Management)
* Mongoose
* Multer for image processing
* Nodemailer for mailing
* JWT (secure login)
* bcryptjs and crypto (Password Encryption)
* Helmet and Cors

## Features Included
*  Ability to book homes with Razorpay payment
*  Optimization using lazy loading
*  Browsing and sorting options to help users find the perfect home
*  Handy search box for finding nearby homes in seconds
*  Home detail pages with multiple images and descriptions
*  Calendar feature that shows booked dates for each home
*  Display all upcoming bookings for the current user
*  Easy user account creation and login
*  Forgot password and Reset password in a secure way
*  Interactive map geolocation using Mapbox
*  Fully responsive design optimized for seamless mobile browsing
*  Dynamic mailing system using Nodemailer
*  Dynamic MongoDB aggregation pipelines to showcase our bestseller homes

# Usage

Create config.env in server
```python

NODE_ENV=development
PORT=8000

DB= your_mongo_url

JWT_SECRET= secret
JWT_EXPIRES_IN=7776000
JWT_COOKIE_EXPIRES_IN=90

EMAIL=your_email
EMAIL_PASSWORD=email_password

RAZORPAY_KEY_ID= key_id
RAZORPAY_SECRET= secret_id
```
Create .env in client
```python
VITE_NODE_ENV=development

VITE_RAZORPAY_KEY_ID = your_razorpay_key_id
VITE_RAZORPAY_SECRET = razorpay_secret

VITE_MAPBOX_ACCESS_TOKEN = your_mapbox_token
```
## Install Dependencies and Run

Run backend
```
  cd server
  npm install
  npm start
```

Run frontend
```
  cd client
  npm install
  npm run dev
```
* Version: 1.1.2
* License: MIT
* Author: Shemilkumar E A
