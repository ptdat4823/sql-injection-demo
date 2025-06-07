# Project Setup Guide

This guide will help you set up the project, including the database, backend, and frontend environments.

---

## 🗄️ Set Up the Database

1. **Install MySQL Workbench and MySQL Server**

   - Download and install both from the [MySQL Installer](https://dev.mysql.com/downloads/installer/).

2. **Create a Database**

   - Open MySQL Workbench.
   - Connect to your MySQL server.
   - Create a new database (schema). Remember the following values:
     - **Host**
     - **Database Name**
     - **User**
     - **Password**

3. **Import Initial Data**

   - Open the `sql_injection_dtb_account.sql` file.
   - Copy its content and paste it into a new MySQL query tab.
   - Run the query to create and populate the database.

4. **Configure Backend Environment**

   - In the `back-end` folder, create a `.env` file with the following environment variables:

     ```env
     DB_HOST=your_host
     DB_NAME=your_db_name
     DB_USER=your_db_user
     DB_PASSWORD=your_db_password
     ```

---

## 🧠 Set Up the Backend

1. From the root folder, navigate to the `back-end` folder:

```bash
   cd back-end
```

2. Install dependencies:

```bash
   npm install
```

3. Start the development server:

```bash
   npm run dev
```

## 🎨 Set Up the Frontend

1. From the root folder, navigate to the `front-end` folder:

```bash
    cd front-end
```

2. Install dependencies:

```bash
    npm install
```

3. Start the development server:

```bash
    npm run dev
```
