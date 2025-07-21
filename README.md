## Library App GraphQL API

##  Features
This project provides a GraphQL API for user authentication, library management, book borrowing, and book management.

##  Live Demo
Check out the live version of the app:
🔗 [Library App](https://library-app-bice.vercel.app/)

##  API Documentation
Explore the full API documentation For GraphQl:
🔗 [GraphQl Documentation](https://library-app-bice.vercel.app/playground)

##  Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/raneemmagdy/Library-App.git
cd Library-App
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file and configure the following variables:
```env
PORT=3000
MONGO_DB_URI=your_mongodb_connection_string
PREFIX_FOR_USER=Bearer
PREFIX_FOR_ADMIN=Admin
ACCESS_JWT_SECRET_USER=your_access_jwt_secret_user
ACCESS_JWT_SECRET_ADMIN=your_access_jwt_secret_admin
REFRESH_JWT_SECRET_USER=your_refresh_jwt_secret_user
REFRESH_JWT_SECRET_ADMIN=your_refresh_jwt_secret_admin
SALT_ROUND=12
EMAIL_SENDER=your_email@example.com
PASSWORD_FOR_EMAIL_SENDER=your_email_password
CLIENT_ID=your_client_id
SECRET_KEY_PHONE=your_secret_key_for_phone
CONFIRM_SECRET_KEY=your_secret_key_for_confirm_email
USER_CONFIRM_SECRET_KEY=your_secret_key_for_confirm_email_for_user
ADMIN_CONFIRM_SECRET_KEY=your_secret_key_for_confirm_email_for_admin
```

### 4️⃣ Start the Server
```sh
npm run dev
```
Server will be running at `http://localhost:3000`

##  GraphQL API Endpoints

### 🔹 User Model
- `registerUser`: Register a new user.
- `loginUser`: Authenticate a user and return tokens.
- `confirmEmail`: Confirm user email address.
- `getOneUserById`: Retrieve a single user by ID.
- `getAllUsers`: Fetch all users.
- `deleteUser`: Delete a user by Token.
- `refreshTokenCheck`: Generate Refresh token.

### 🔹 Library Model
- `getAllLibraries`: Retrieve all libraries.
- `addLibrary`: Add a new library.
- `getOneLibraryById`: Fetch a single library by ID.

### 🔹 BorrowedBook Model
- `borrowBook`: Borrow a book from the library.
- `markBookAsAvailable`: Mark a borrowed book as available.
- `getOneBorrowedBookById`: Retrieve details of a borrowed book by ID.
- `getAllBorrowedBook`: Fetch all borrowed books.
- `getOverdueBooks`: Get a list of overdue books.

### 🔹 Book Model
- `addBook`: Add a new book to the library.
- `getOneBookById`: Retrieve book details by ID.
- `getAllBooks`: Fetch all books from the library.

## 🛠️ Usage
Access GraphQL API using a GraphQL client such as Apollo Studio or Postman by sending queries and mutations to:
```
http://localhost:3000/graphql
```

### Example Query
#### Fetch All Books
```graphql
query{
    getAllBooks {
        id
        title
        author
        publishedYear
        genre
        isDeleted
        availableCopies
    }
}

```

### Example Mutation
#### Register User
```graphql
mutation  {
    registerUser(
        name: "raneem"
        email: "raneemmagdy@gmail.com"
        password: "R123456@"
        cPassword: "R123456@"
        phone: "01122254066"
    ) {
        message
        user {
            id
            name
            email
            password
            phone
            isDeleted
            confirmed
            role
            borrowedBooks
        }
    }
}

```



