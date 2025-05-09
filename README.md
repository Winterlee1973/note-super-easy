Note Super Easy

A simple, beginner-friendly note-taking web application using Node.js, Express, and PostgreSQL.

🚀 Getting Started (For Beginners)

This guide is designed for first-time developers using VS Code, Roo Code, and Gemini 2.5. Follow each step carefully to get the app running locally on port 5001.

🧰 Prerequisites

Before you start, ensure the following are installed on your system:

Node.js (v18+)

PostgreSQL (with a local user and database)

VS Code

Git (comes with most VS Code installs)

🗂 Folder Structure

note-super-easy/
├── middleware/           # Custom Express middleware
├── public/               # Static HTML, CSS, and JS files
├── routes/               # Route controllers
├── .env.example          # Environment variable template
├── db.js                 # PostgreSQL connection config
├── migrations.sql        # SQL to set up tables
├── package.json          # Project metadata and scripts
├── server.js             # Entry point of the app
├── setup.js              # Script to initialize the database
└── README.md             # This file

⚙️ Setup Instructions (VS Code + Roo Code + Gemini)

1. Clone the Repository

Open VS Code and in the terminal:

git clone https://github.com/Winterlee1973/note-super-easy.git
cd note-super-easy

2. Install Dependencies

npm install

3. Set Up Environment Variables

Copy .env.example to .env

Edit .env to include your PostgreSQL DATABASE_URL:

DATABASE_URL=postgres://username:password@localhost:5432/yourdbname
PORT=5001

4. Set Up the Database

Make sure PostgreSQL is running. Then run:

npm run setup

This executes the migrations.sql file to create tables.

5. Start the Development Server

npm run dev

Your app should be live at: http://localhost:5001

🔄 Available Scripts

Script

Description

npm run dev

Starts server with nodemon

npm run setup

Runs database migration setup

💡 Tips for Roo Code & Gemini 2.5

Use Roo Code to manage and explore code structure.

Ask Gemini 2.5 specific questions about:

What each file does (start with server.js)

How routing works in Express

How PostgreSQL connections are configured in db.js

How to extend the app (e.g., add tags to notes)

🧽 Cleanup

To reset your local database:

psql -U yourusername -c "DROP DATABASE yourdbname;"

Then rerun the setup steps.

📄 License

This project is open-source under the MIT License.

Happy Coding! 🚀

