# Service Review System

A full-stack web application that allows users to review and interact with services. 
Users can register/login, add services, post reviews, update/delete their submissions, and browse all existing services and reviews.

**Live Site:** [https://service-scope.netlify.app/]

## Features

### Home Page

* **Banner Section**: Carousel with service highlights
* **Featured Services**: Displays 6 services using MongoDB's `limit(6)`
* **Partners Section**: Logos and info about partners
* **Two Meaningful Extra Sections** : Why choose us? and also users reviews.

### Authentication System

* Email/password-based login and registration
* Google login integration
* Form validation for strong passwords
* Toast/sweet alert for success/failure feedback

### Add Service (Private Route)

* Authenticated users can add services through a form
* Auto-fills added date and user's email
* Stores data to MongoDB
* Shows success toast/alert

### All Services

* Lists all service cards with details, image, and price
* Includes search and filter features by keyword or category

### Service Details Page

* Full info of a service
* Total reviews and individual review list
* Users can submit reviews with rating and text (must be logged in)

### My Services (Private Route)
* logged-in user's added their own company services
* Update and Delete functionality with modals

### My Reviews (Private Route)

* Shows only user's own reviews
* Update and Delete options

## Extra Features

* Spinner for loading states
* Dynamic page title with each route
* JWT: API security and protected routes
* Custom 404 Not Found page
* Search & Filter functionality
* CountUp for total users, services, and reviews

## Technologies Used

### Frontend:

* React.js
* React Router
* Firebase Authentication
* Tailwind CSS & Daisy UI
* Framer Motion
* React CountUp
* SweetAlert / React Toastify
* React Icons

### Backend:

* Node.js
* Express.js
* MongoDB
* JWT for Authorization

## NPM Packages Used
- `react`
- `react-router`
- `firebase`
- `axios`
- `react-toastify`
- `react-icons`
- `framer-motion`
- `dotenv`
- `mongodb`
- `express`
- `cors`

- **Deployment:** Netlify for frontend, vercel for backend

## Summary

Logged-in users can securely add a new service through the Add Services page. This page is protected by a private route and allows the user to enter service information such as title, image, company, and price. Once submitted, 
the data is sent to the backend and stored in MongoDB with the user's email and the current date. A success message is shown, and the new service becomes visible under All Services and My Services pages. 
All API routes are protected using JWT authentication, ensuring only authorized users can add services.

---

## Add Services: Full Website Workflow (Private Route)

### ##1. Route Protection

* The "Add Services" page is secured with a Private Route.
* Unauthenticated users trying to access it are redirected to the login page.

### ##2. Authenticated User Access

* Logged-in users can access the Add Service page from the navbar.
* A form is presented to collect service information.

### ##3. Form Handling

* Fields: Title, Image, Company Name, Website, Description, Category, Price
* Validation prevents empty or invalid entries using toast or alert.

### ##4. Submit and Save

* Form submission captures:

  * Current date as `addedDate`
  * Logged-in user's email from context
* Sends data to backend → stores in MongoDB

### ##5. Confirmation

* Shows a toast/sweet alert message: "Service Added Successfully"
* Optionally redirects user to My Services page

### ##6. Service Display

* Newly added services appear:

  * On "All Services" page (public)
  * On "My Services" page (for that user)
  * Each card includes a "See Details" button to view full info


## Installation
1. Clone the repository: 

   git clone in client side - https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-sourav-dn
   
   git clone in server side - https://github.com/Programming-Hero-Web-Course4/b11a11-server-side-sourav-dn



















# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
