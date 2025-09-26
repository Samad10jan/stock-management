# 📦 Stock Management Web App

A comprehensive stock management system built with Next.js, featuring role-based access control and real-time analytics for efficient inventory management.

## 🖼️ Screenshots / Demo

### 🔑 Login Page
<img width="1906" height="912" alt="image" src="https://github.com/user-attachments/assets/babe4c7a-1e22-43d6-9603-5514fe24b5f8" />

### 📊 Dashboard Overview with DarkMode On
<img width="1889" height="916" alt="image" src="https://github.com/user-attachments/assets/7dae58f6-efe8-4844-ab51-ab6b44d5ffd7" />



### 👤 Profile Page
<img width="1887" height="906" alt="image" src="https://github.com/user-attachments/assets/49ba076a-64d0-47f2-a0c8-158e6a0065e3" />



### 👨‍💼 Users Details Page
<img width="1913" height="911" alt="image" src="https://github.com/user-attachments/assets/312d0aff-9b97-44d7-ae2d-73a36d6c0b9a" />



### 🛒 Product Management
<img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/d0c55cef-6856-4228-bd0c-863f1f1fcc38" />

### Product Detail Page

<img width="1916" height="916" alt="image" src="https://github.com/user-attachments/assets/6a939200-1847-4ce4-8084-5fdd885eb2dd" />


### 👥 Admin Dashboard - User Management
<img width="1907" height="916" alt="image" src="https://github.com/user-attachments/assets/12524bfd-6e3c-46ca-b44c-eef28e148050" />



## ✨ Features

### Role-Based Access Control
- **Admin Dashboard** - Full system control with user management capabilities
- **Manager Role** - Product management and sales tracking
- **Staff Role** - Product addition and sales processing
- **Custom Authentication** - Secure user authentication using MongoDB

### Core Functionality
- **Product Management** - Add, edit, and organize inventory
- **Sales Tracking** - Record sales transactions directly from product pages
- **Visual Analytics** - Interactive sales charts by date using Recharts
- **User Management** - Admin can add users and modify roles
- **Multi-User Support** - Concurrent access with role-based permissions

### Dashboard & Analytics
- **Admin Dashboard** - User management and system overview
- **Sales Visualization** - Charts showing sales trends over time
- **Real-time Updates** - Live inventory and sales data

## 🛠️ Tech Stack

- **Framework:** Next.js 14 with App Router
- **Database:** MongoDB with Prisma ORM
- **API:** GraphQL for efficient data fetching
- **Authentication:** Custom authentication system
- **UI Components:** Tailwind CSS + Radix UI
- **State Management:** React Context API and useState
- **Charts:** For data visualization
- **Styling:** Tailwind CSS

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js (version 18 or higher)
- MongoDB database (local or cloud instance)
- npm, yarn, pnpm, or bun package manager

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Samad10jan/stock-managemen.git
   cd stock-management-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL="mongodb://your-mongodb-connection-string"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Push database schema
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 👥 User Roles & Permissions

### Admin
- Access to admin dashboard
- Create and manage user accounts
- Edit user roles and permissions
- Full system access

### Manager
- Add and manage products
- Process sales transactions
- View sales analytics and reports
- Product inventory management

### Staff
- Add new products to inventory
- Record sales from product pages
- Basic inventory operations

## 🎯 Usage

### Getting Started as Admin
1. Log in with admin credentials
2. Access the Admin Dashboard
3. Add users and assign roles (Manager/Staff)
4. Set up initial product inventory

### Managing Products (Manager/Staff)
1. Navigate to Products section
2. Click "Add Product" to create new inventory items
3. Fill in product details (name, price, quantity, etc.)

### Recording Sales
1. Go to any product page
2. Click "Add Sale" button
3. Enter sale details and quantity
4. View updated inventory and sales data

### Viewing Analytics
1. Access the dashboard or analytics section
2. View sales charts organized by date
3. Analyze trends using interactive Recharts visualizations

## 🗄️ Database Schema

The application uses Prisma with MongoDB for:
- User management and authentication
- Product inventory tracking
- Sales transaction records
- Role-based access control

## 🔗 API

The application uses GraphQL for efficient data operations:
- User authentication and management
- Product CRUD operations
- Sales data queries and mutations
- Real-time updates

## 🔒 Security Features

- Custom authentication system
- Role-based authorization
- Secure session management
- Protected API routes

## 📊 Technologies Used

- **Frontend:** Next.js, React, Tailwind CSS, Radix UI
- **Backend:** Node.js, GraphQL, Prisma
- **Database:** MongoDB
- **Charts:** Recharts
- **Authentication:** Custom implementation
- **State Management:** React Context API

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

Project Link: [https://github.com/Samad10jan/stock-managemen](https://github.com/Samad10jan/stock-management)

---

⭐ **Built with Next.js, MongoDB, and GraphQL** ⭐
