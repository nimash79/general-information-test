# General Information Test

A Windows desktop application for taking general knowledge quizzes, built with **Electron, Node.js, and MongoDB**. The application organizes questions by levels and categories, presents quiz questions with answer choices, and provides feedback for correct answers, incorrect answers, and timeouts.

Quiz levels, categories, and questions are stored in MongoDB, allowing the quiz content to be updated without hardcoding it into the interface.

## Features

- **Level-based quizzes:** Organize questions by difficulty or level.
- **Category selection:** Browse and select quiz categories.
- **Dynamic questions:** Retrieve questions from MongoDB based on the selected category and level.
- **Multiple-choice questions:** Display answer choices for each question.
- **Answer feedback:** Distinguish correct and incorrect answers.
- **Timed questions:** Handle situations in which the allotted time expires.
- **Question rotation:** Track previously displayed questions and cycle through questions within a category and level.
- **Desktop experience:** Run the application as a Windows-oriented desktop application using Electron.

## Tech Stack

| Technology | Purpose |
|---|---|
| JavaScript | Application logic |
| Electron | Desktop application framework |
| Node.js | Main-process runtime |
| MongoDB | Persistent storage for categories and questions |
| Mongoose | MongoDB connection and data access |
| HTML, CSS, and jQuery | User interface |
| Electron Local Shortcut | Keyboard shortcut handling |

## Architecture

The application uses Electron's main process to manage the desktop window and communicate with MongoDB. The user interface is loaded from a local HTML file, while Electron's IPC (Inter-Process Communication) mechanism connects interface actions to database operations.

```text
┌──────────────────────────────┐
│      Electron Desktop App    │
│                              │
│  HTML / CSS / jQuery UI      │
│              │               │
│              ▼               │
│       Electron IPC           │
│              │               │
│              ▼               │
│  Main Process (Node.js)      │
│              │               │
│              ▼               │
│       Mongoose ODM           │
└──────────────┬───────────────┘
               │
               ▼
         MongoDB Database
         ├── Categories
         └── Questions
```

## Project Structure

```text
general-information-test/
├── src/
│   ├── database/       # Database models and access logic
│   ├── pages/          # HTML interface pages
│   └── ...             # Other interface assets and scripts
├── main.js             # Electron main process and IPC handlers
├── forge.config.js     # Electron Forge publishing configuration
├── package.json        # Dependencies and npm scripts
├── package-lock.json   # Dependency lockfile
├── .gitignore
└── README.md
```

## Requirements

Before running the application, ensure you have:

- [Node.js](https://nodejs.org/) and npm installed.
- Access to a MongoDB database.
- A compatible Windows environment for the intended desktop experience.

## Installation

**1. Clone the repository**

```bash
git clone https://github.com/nimash79/general-information-test.git
cd general-information-test
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure MongoDB**

The main process connects to MongoDB before opening the application window. Ensure the database connection is configured correctly and that the database is reachable.

The current implementation contains a database connection string in `main.js`. For safer configuration, use an environment variable such as `MONGODB_URI` instead of committing database credentials to source control. See the security note below.

**4. Launch the application**

```bash
npm start
```

The `start` script launches Electron using the repository's configured entry point.

## How to Use

1. Launch the desktop application.
2. Choose a quiz level.
3. Select a category.
4. Answer the displayed question using the available choices.
5. Review the feedback for your answer.
6. Continue answering questions. The application handles question timeouts when the allotted time expires.

The available levels, categories, and questions are managed through the database.

## Database Content

The application uses MongoDB collections accessed through Mongoose models for categories and questions.

The main process supports operations including:

- Retrieving available categories.
- Retrieving questions for a selected category and level.
- Tracking whether questions have already been displayed and resetting that state when necessary.
- Adding questions to the database.

To change the quiz content, update the corresponding database records using a suitable database client or an application workflow that supports those changes.

The exact document fields and validation requirements should be taken from the models in `src/database/`.

## Development

To launch the application during development:

```bash
npm start
```

The project also includes Electron reload tooling to support development changes.

The `npm test` command currently runs a placeholder script and exits with an error because automated tests have not been configured.

## Security Considerations

- **Protect database credentials.** Do not commit MongoDB connection strings containing usernames or passwords. If credentials have already been published in the repository, rotate them immediately.
- **Use environment variables.** Read the database URI from `process.env.MONGODB_URI` and provide it through a local environment configuration or secure deployment settings.
- **Review Electron security settings.** The current main process enables Node integration and disables context isolation. These settings should be reviewed before distributing the application, particularly if any untrusted content could be loaded.
- **Restrict database permissions.** Use a database account with only the permissions required by the application.

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a branch for your changes.
3. Implement and test your changes.
4. Submit a pull request describing the changes.

For major changes, open an issue first to discuss the proposed approach.

## License

The repository's README identifies the project as MIT-licensed. See the repository's license information for the applicable terms.

## Demo

### Levels
![Screenshot (34)](https://github.com/nimash79/general-information-test/assets/55561627/07ed4d7a-5c4e-405d-9d62-e6aa261c6c8b)
### Categories
![Screenshot (35)](https://github.com/nimash79/general-information-test/assets/55561627/a4c6614b-aa6f-42fb-bcb4-35e8e90ca8f2)
### Question
![Screenshot (36)](https://github.com/nimash79/general-information-test/assets/55561627/c1d93bf1-272a-444b-ad6f-4beb62f5998b)
### Question (multiple choices)
![Screenshot (37)](https://github.com/nimash79/general-information-test/assets/55561627/187ce89b-2829-4e13-b84d-2a63af0316bb)
### Question (wrong answer)
![Screenshot (38)](https://github.com/nimash79/general-information-test/assets/55561627/ddbcd835-5de3-433a-9503-59af19c6d2b5)
### Question (correct answer)
![Screenshot (39)](https://github.com/nimash79/general-information-test/assets/55561627/efe453aa-43b3-42f6-8b83-6826cf8f5606)
### Question (time's up)
![Screenshot (40)](https://github.com/nimash79/general-information-test/assets/55561627/3fdfb7cc-461e-4f46-b002-5eda4ef52d2f)
