# Finance CRUD Application

A full-stack Finance Management Application built with **React** for the frontend and **Spring Boot** for the backend. The project is designed to help users manage financial records and perform CRUD (Create, Read, Update, Delete) operations through a user-friendly interface.

## Features

- **Dashboard Overview** – View a summary of financial information.
- **Transaction Management** – Create, view, update, and delete financial records.
- **Income and Expense Tracking** – Organize transactions by type.
- **REST API Integration** – Connect the React frontend with the Spring Boot backend.
- **Interactive UI** – Manage financial records through a simple web interface.

## Tech Stack

### Frontend
- React.js
- JavaScript
- CSS
- REST API integration

### Backend
- Java
- Spring Boot
- Spring Web / REST APIs

### Tools
- Git and GitHub
- Visual Studio Code
- Spring Tool Suite (STS)
- npm

## Project Structure

```text
Finance-Crud/
├── finance-react-frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
├── finance-back-end/
│   ├── src/
│   └── pom.xml
├── .gitignore
└── README.md
```

## Prerequisites

Make sure you have the following installed:

- Java Development Kit (JDK)
- Node.js and npm
- Maven (if not using the Maven Wrapper)
- Git

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Vaishnavi-Dontula/Finance-Crud.git
cd Finance-Crud
```

### 2. Start the Backend

Open a terminal and navigate to the backend directory:

```bash
cd finance-back-end
```

Run the Spring Boot application using Maven:

```bash
mvn spring-boot:run
```

Alternatively, open the backend project in Spring Tool Suite (STS) and run the main Spring Boot application class.

### 3. Start the Frontend

Open a **new terminal** and navigate to the frontend directory:

```bash
cd finance-react-frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

If your project uses Vite, run `npm run dev` instead.

### 4. Access the Application

Open the local URL displayed in your frontend terminal. For a typical React setup, this may be:

```text
http://localhost:3000
```

The backend runs on the port configured in your Spring Boot application, commonly `8080`.

## API Configuration

Configure the frontend API base URL to match the backend server address and port.

For example:

```javascript
http://localhost:8080
```

The actual API endpoints depend on the REST controllers configured in the backend.

## CRUD Operations

The application supports the following core operations:

| Operation | Description |
|---|---|
| Create | Add a financial record |
| Read | View existing financial records |
| Update | Modify an existing record |
| Delete | Remove a financial record |

## Future Improvements

- Add charts and visual analytics for income and expenses.
- Implement user authentication and authorization.
- Add transaction filtering and search.
- Improve responsive design for mobile devices.
- Add financial reports and monthly summaries.

## Author

**Vaishnavi Dontula**

GitHub: [Vaishnavi-Dontula](https://github.com/Vaishnavi-Dontula)

## License

This project is available for learning and personal development. Add a specific open-source license if you intend to distribute it under defined terms.
