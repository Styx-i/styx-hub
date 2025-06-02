👟 Styx Hub – Shoe Selling Web App

[Live Demo](https://styx-hub.vercel.app/)

Styx Hub is a modern web-based shoe selling platform where users can browse, shop, and manage their accounts. It supports both buyers and sellers, with full user authentication powered by Clerk API. The app is designed with a responsive UI using Tailwind CSS and a powerful backend integrated with MongoDB Atlas, Inngest, and Cloudinary for media handling.

---

Features

Buyer Side
- User Authentication: Secure sign-up/sign-in using Clerk API.
- Browse Products: View a variety of shoes available for sale.
- Shopping Cart: Add selected items to the cart for purchase.
- Checkout Process:
  - Add an address before placing an order.
  - Confirm and submit orders securely.
- User Account Management:
  - View and manage personal details.
  - Delete account if needed.

Seller Side
- Seller Account Setup:
  - Sign up via Clerk, then request admin to change your role to "seller" via [Clerk Dashboard](https://clerk.com/).
  - Seller email used for demo: seller@gmail.com
  - Password: sellerpassword
- Seller Dashboard:
  - Add new products (with images uploaded via Cloudinary).
  - Manage product listings.

---

Tech Stack

Next.js: React framework for SSR and routing
Tailwind CSS: Modern styling framework
Clerk API: Authentication & user management
Inngest API: Workflow/event handling (background jobs)
Cloudinary: Image hosting and upload management
MongoDB Atlas: Cloud database for storing users, products, orders

Demo Credentials

Seller Account (Pre-configured)
> You cannot create a seller account directly. You need admin assistance to assign the role manually via Clerk.

Email: seller@gmail.com  
Password: sellerpassword

Buyer Account
- Create your account on the [Live Site](https://styx-hub.vercel.app/)  
- Sign up using Clerk API (internet connection required)

How to Run Locally

1. Clone the repository
git clone https://github.com/your-username/styx-hub.git
cd styx-hub

2. Install dependencies
npm install

3. Setup environment variables
Create a .env.local file and add:
CLERK_API_KEY=
CLERK_FRONTEND_API=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
MONGODB_URI=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
INNGEST_EVENT_KEY=

4. Run the development server
npm run dev

Visit http://localhost:3000
