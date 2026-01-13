# 📌 Todo Backend – Hono 🚀  

 **lightweight, high-performance** Work-Manager backend built using **Hono, TypeScript, Prisma, and PostgreSQL**, designed for fast API responses and seamless integration.

## ✨ Features  

✅ **Hono-powered API** for minimal overhead & fast routing  
✅ **Prisma ORM** for efficient database management  
✅ **PostgreSQL** as the database for scalability & performance  
✅ **JWT Authentication** for secure access  
✅ **Cloudflare Workers Integration** 

## ⚙️ Tech Stack  

- **Backend:** Hono, TypeScript, Node.js 
- **Database:** Prisma ORM, PostgreSQL  
- **Authentication:** JWT, bcrypt  
- **Deployment:** Cloudflare Workers

## 🔧 What This Backend Runs

This backend is responsible for running the core API services for the Work-Manager application.

It handles:
- User authentication and authorization
- Task and todo management
- Secure database operations
- Communication with the AI service (via internal API calls)

The backend does **not run the LLM directly**.  
AI-related logic is handled by a separate Node.js service located in the `callAi/` directory.
