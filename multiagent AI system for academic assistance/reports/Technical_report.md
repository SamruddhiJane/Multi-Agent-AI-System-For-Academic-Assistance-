Technical Report

Multi-Agent AI Learning Assistant

Team Project Report

---

1. Introduction

The Multi-Agent AI Learning Assistant is a web-based educational platform designed to provide students with study materials, answer academic questions, and generate quizzes through multiple specialized agents. The system uses a modular multi-agent architecture where different agents collaborate to handle user requests efficiently.

The project was developed using Node.js, Express.js, React, HTML, CSS, and JavaScript.

---

2. Problem Statement

Students often require multiple educational services, such as study notes, doubt solving, and quiz generation. Traditional systems usually provide only a single functionality at a time.

This project aims to develop a Multi-Agent AI Learning Assistant that automatically identifies user requirements and activates the appropriate agents to provide a comprehensive learning experience.

---

3. Objectives

The objectives of the project are:

- Develop a multi-agent educational platform.
- Implement automatic agent selection based on user queries.
- Build a backend using Node.js and Express.js.
- Create a user-friendly frontend using React.
- Enable communication between frontend and backend through REST APIs.
- Support study material generation, question answering, and quiz generation.

---

4. System Architecture

The system follows a client-server architecture with multiple specialized agents.

User
  ↓
React Frontend
  ↓ POST /api/chat
Node.js + Express Backend
  ↓
Agent Router (detectAgents)
  ├── Study Agent
  ├── Question Answering Agent
  └── Quiz Agent
  ↓
JSON Response
  ↓
Frontend Display

---

5. Technologies Used

Component| Technology
Frontend| React, HTML, CSS, JavaScript
Backend| Node.js, Express.js
API Testing| Thunder Client
Version Control| Git, GitHub
Package Manager| npm
HTTP Requests| Axios

---

6. Backend Development

The backend was developed using Express.js and follows a modular structure.

Folder Structure

backend/
├── agents/
│   ├── studyAgent.js
│   ├── qaAgent.js
│   └── quizAgent.js
│
├── routes/
│   └── chatRoutes.js
│
├── utils/
│   └── agentRouter.js
│
├── server.js
├── package.json
└── package-lock.json

Implemented Agents

Study Material Agent

Responsibilities:

- Generate study notes
- Explain concepts
- Support learning activities

Question Answering Agent

Responsibilities:

- Answer academic questions
- Clarify doubts
- Provide explanations

Quiz Agent

Responsibilities:

- Generate MCQs
- Create practice questions
- Support self-assessment

---

7. API Documentation

The system uses a single API endpoint.

Endpoint

POST /api/chat

Sample Request

{
    "message": "Give me C programming notes and 5 quiz questions"
}

Sample Response

{
    "userMessage": "Give me C programming notes and 5 quiz questions",
    "agentsUsed": [
        "study",
        "quiz"
    ],
    "data": {
        "studyMaterial": "Study Material Agent: Explanation about Give me C programming notes and 5 quiz questions",
        "quiz": "Quiz Agent: 5 MCQs generated for Give me C programming notes and 5 quiz questions"
    }
}

---

8. Frontend Development

The frontend was developed using React and Vite.

Features Implemented

- Input text box
- Submit button
- Response display area
- Loading indicator
- Backend API integration

Frontend Structure

frontend/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── package.json
└── package-lock.json

---

9. Sequence Diagram

The interaction flow of the system is shown below:

User
 ↓
Frontend (React)
 ↓ POST /api/chat
Backend (Express)
 ↓
detectAgents()
 ↓
Study Agent / QA Agent / Quiz Agent
 ↓
JSON Response
 ↓
Frontend
 ↓
User

---

10. Testing

The backend APIs were tested using Thunder Client.

Test Case

Input:

Give me C programming notes and 5 quiz questions

Expected Result:

- Study Material Agent activated
- Quiz Agent activated
- Structured JSON response returned

Result:

The system successfully generated responses from both agents.

---

11. Future Enhancements

Possible future improvements include:

- Integration with Large Language Models (LLMs)
- Database support for storing user data
- Authentication and user profiles
- Timetable and planner agents
- Career guidance agents
- Personalized learning recommendations

---

12. Conclusion

The Multi-Agent AI Learning Assistant was successfully developed using a modular multi-agent architecture. The system supports automatic agent detection, collaborative agent responses, frontend-backend integration, and a user-friendly interface. The project provides a strong foundation for future AI-powered educational applications.
