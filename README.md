ShopZilla – MERN Stack E-Commerce Web App

ShopZilla is a full-featured e-commerce web application built using the MERN stack (MongoDB, Express, React, Node.js).

The platform allows users to browse products, add them to a cart, and place orders. 

Admin users can manage products, including adding, editing, and deleting items through a secure dashboard.

🌟 Features:

  👤 User Functionality:

    🔐 User login & signup with secure authentication,

    🛒 Add products to cart,

    ✅ Place orders and view order history,

    🖼️ Browse all products with image previews and descriptions,

  🛠️ Admin Functionality:

    📦 Add, edit, and delete products,

    📋 View all products in a table,

    🖼️ Image preview while uploading,

    🧮 Manage stock, price, discount, shipping fee, and variants (color/size).

Tech Stack:

  Frontend: React + Material UI (MUI),

  Backend: Node.js + Express,

  Database: MongoDB (via Mongoose),

  Authentication: Local storage based,

  API Testing: Postman,

  Version Control: Git + GitHub,

installed dependencies :

  frontend:

    npm install react react-dom react-router-dom axios @mui/material @mui/icons-material @emotion/react @emotion/styled

  backend:

    npm install -D vite @vitejs/plugin-react eslint @eslint/js eslint-plugin-react-hooks eslint-plugin-react-refresh globals @types/react @types/react-dom

Images:

Home Page :
      
    On the homepage, users can view all available products in a clean grid layout.

    Each product displays its image, name, and price, along with buttons to view more details or add the item to the cart

  <img width="960" height="540" alt="Homepage" src="https://github.com/user-attachments/assets/1cd414ce-7556-4535-a7e4-3eb15c8f132a" />

Login page:
    
    If you already have an account, then you can log in securely using the login credentials.

  <img width="960" height="540" alt="login" src="https://github.com/user-attachments/assets/44ae8104-52a9-4442-ab13-f6ee3c8d5f4d" />

Register Page:
  
    Users can register with their name, email, and password.

  <img width="960" height="540" alt="register" src="https://github.com/user-attachments/assets/4b2336fa-8bcb-452c-b49c-519feb12c2e8" />

Product details page:

    when clicking on View Details in the home page it shows the full product information, including description, available stock, category, size, color, and more

  <img width="960" height="540" alt="Product details" src="https://github.com/user-attachments/assets/fd04b690-98fb-471d-b540-7afca5f580b0" />

Cart:

    Users can add items to the cart and access it anytime via the cart icon

  <img width="960" height="540" alt="cart" src="https://github.com/user-attachments/assets/5dd03a77-ed04-40b2-a91d-05809da689fc" />

Checkout Page:

    At checkout, they can review and confirm their order.

    The total price is automatically calculated, and once they click Place Order, the order is saved to the database.

  <img width="960" height="540" alt="Checkout" src="https://github.com/user-attachments/assets/712283ce-dbcb-49d5-bb1d-7c45ccfa330b" />

My Orders Page(order history):
  
    Users can also visit the Orders page to view all their past orders, along with the total amount and order date

  <img width="960" height="540" alt="orders" src="https://github.com/user-attachments/assets/c494009f-d90b-49c1-9a5b-cd81060df55f" />

AdminPanel Dashboard:
    
    When an admin logs in, they gain access to the Admin Panel, where they can manage various aspects of the store

  <img width="960" height="540" alt="Adminpanel" src="https://github.com/user-attachments/assets/8a686b1c-5451-4d2b-9bee-aa66cb48cdfb" />

Product management page:

    Add new products by filling in details such as name, image URL, price, stock, category, color, and size

    Preview the product image live before uploading

    Edit existing products — the form auto-fills with the selected product’s data

    Veiw all the product in the store.

    Admins can also delete products with a single click.

    All product operations are fully integrated with the backend and MongoDB database.

<img width="960" height="540" alt="product management" src="https://github.com/user-attachments/assets/7b5c7caf-35e3-47de-9802-c8098a17bcc9" />

Order Management Page:

    Admins can view all orders placed by users.

    Each order includes actions to:

         Update the delivery status — changing it from NO to the delivered date
      
         Delete the order from the database

  <img width="960" height="540" alt="Order manage" src="https://github.com/user-attachments/assets/e9373ca9-ba93-4409-9542-ada7e58b5bae" />

Users Management page:

    View all registered users

    Grant or revoke administrative access
    
    Delete any user from the database"

  <img width="960" height="540" alt="Users" src="https://github.com/user-attachments/assets/cf4d022d-bef3-4c14-a946-e947ca819fe1" />



Conclusion:

This project showcases a complete end-to-end solution, including:

    Seamless user authentication and authorization

    Dynamic product browsing and ordering system

    Fully functional admin dashboard for managing products, orders, and users

    A responsive and modern UI using Material UI

    Real-time interactions with a robust backend powered by Node.js, Express, and MongoDB.
