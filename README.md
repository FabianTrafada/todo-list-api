# Todo-List API Server

A RESTful API server built with Express.js, TypeScript, and PostgreSQL using Drizzle ORM. This server provides authentication and todo management functionality.

## Features

- **Authentication** - JWT-based user registration and login
- **Todo Management** - Full CRUD operations for todos
- **Security** - Password hashing with bcrypt and JWT token verification
- **Database** - PostgreSQL with Drizzle ORM
- **Type Safety** - Full TypeScript support
- **Validation** - Request validation and error handling

## Project Structure

```
apps/server/
├── src/
│   ├── controllers/
│   │   ├── authController.controller.ts    # Authentication endpoints
│   │   └── toDoController.controller.ts    # Todo CRUD operations
│   ├── db/
│   │   ├── index.ts                        # Database connection
│   │   └── schema.ts                       # Database schema and types
│   ├── routers/
│   │   ├── authRoutes.ts                   # Authentication routes
│   │   └── toDoRoutes.ts                   # Todo routes
│   ├── services/
│   │   ├── hash.service.ts                 # Password hashing utilities
│   │   └── token.service.ts                # JWT token utilities
│   ├── types/
│   │   ├── express.type.d.ts               # Express type extensions
│   │   ├── jwt.type.ts                     # JWT payload types
│   │   ├── todo.type.ts                    # Todo interfaces
│   │   └── user.type.ts                    # User interfaces
│   └── index.ts                            # Application entry point
├── .env.example                            # Environment variables template
├── drizzle.config.ts                       # Drizzle ORM configuration
├── package.json                            # Dependencies and scripts
└── tsconfig.json                           # TypeScript configuration
```

## Environment Setup

1. Copy the environment example file:
```bash
cp .env.example .env
```

2. Configure your environment variables in `.env`:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/todo-list-api
JWT_SECRET=your-secret-key-here
PORT=3000
CORS_ORIGIN=http://localhost:3000
```

## Installation

Install dependencies:
```bash
bun install
```

## Database Setup

1. Make sure PostgreSQL is running
2. Create a database for the application
3. Push the schema to your database:
```bash
bun db:push
```

## Available Scripts

- `bun dev` - Start development server with hot reload
- `bun build` - Build the application
- `bun start` - Start production server
- `bun check-types` - Run TypeScript type checking
- `bun compile` - Compile to a single executable
- `bun db:push` - Push schema changes to database
- `bun db:studio` - Open Drizzle Studio (database GUI)
- `bun db:generate` - Generate database migrations
- `bun db:migrate` - Run database migrations

## API Endpoints

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Todos (Protected Routes)

All todo endpoints require authentication via Bearer token.

#### Create Todo
```http
POST /todos
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Learn TypeScript",
  "description": "Complete TypeScript tutorial"
}
```

#### Get Todos (Paginated)
```http
GET /todos?page=1&limit=10
Authorization: Bearer <token>
```

#### Update Todo
```http
PATCH /todos/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description"
}
```

#### Delete Todo
```http
DELETE /todos/:id
Authorization: Bearer <token>
```

## Database Schema

### Users Table
- `id` - Primary key (serial)
- `name` - User's full name (varchar 255)
- `email` - User's email (varchar 255, unique)
- `password` - Hashed password (varchar 10)
- `createdAt` - Timestamp of creation
- `updatedAt` - Timestamp of last update

### Todos Table
- `id` - Primary key (serial)
- `title` - Todo title (varchar 255)
- `description` - Todo description (text)
- `userId` - Foreign key to users table
- `createdAt` - Timestamp of creation
- `updatedAt` - Timestamp of last update

## Authentication Flow

1. User registers with [`register`](src/controllers/authController.controller.ts) endpoint
2. Password is hashed using [`hashPassword`](src/services/hash.service.ts)
3. User receives JWT token via [`generateToken`](src/services/token.service.ts)
4. Protected routes verify token using [`verifyToken`](src/services/token.service.ts) middleware
5. User information is attached to request object for use in controllers

## Key Components

- **Database Connection**: [`db`](src/db/index.ts) - Neon PostgreSQL connection with Drizzle
- **Schema**: [`schema.ts`](src/db/schema.ts) - Database tables and relations
- **Auth Controller**: [`authController.controller.ts`](src/controllers/authController.controller.ts) - Handle registration and login
- **Todo Controller**: [`toDoController.controller.ts`](src/controllers/toDoController.controller.ts) - CRUD operations for todos
- **Token Service**: [`token.service.ts`](src/services/token.service.ts) - JWT generation and verification
- **Hash Service**: [`hash.service.ts`](src/services/hash.service.ts) - Password hashing and comparison

## Development

Start the development server:
```bash
bun dev
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## Production

Build and start the production server:
```bash
bun build
bun start
```

## Technologies Used

- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Drizzle ORM** - Database ORM
- **PostgreSQL** - Database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Bun** - Runtime and package manager

## Project Idea
[Roadmap](https://roadmap.sh/projects/todo-list-api)