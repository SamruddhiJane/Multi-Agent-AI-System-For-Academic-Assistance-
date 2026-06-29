# Task 3: Backend Development

## Objective

The objective of this task was to develop the backend of the Multi-Agent AI Learning Assistant using Node.js and Express.js. The backend is responsible for receiving user queries, automatically selecting the appropriate agents, processing the requests, and returning a structured response.

---

## Technologies Used

* Node.js
* Express.js
* CORS
* dotenv
* Thunder Client (for API testing)

---

## Backend Architecture

The backend follows a modular architecture where each agent and utility is placed in a separate file for better maintainability and scalability.

### Final Folder Structure

```text
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
├── node_modules/
├── package.json
├── package-lock.json
└── server.js
```

---

## API Design

A single API endpoint was implemented for all user interactions.

### Endpoint

```http
POST /api/chat
```

### Sample Request

```json
{
    "message": "Give me C programming notes and 5 quiz questions"
}
```

---

## Agent Routing Mechanism

The system uses an Agent Router to automatically determine which agents should process the user's request.

### Routing Logic

* Keywords such as **explain** and **notes** activate the Study Material Agent.
* Keywords such as **what** and **why** activate the Question Answering Agent.
* Keywords such as **quiz** and **MCQ** activate the Quiz Agent.

The user does not manually select an agent. The backend automatically identifies the required agents based on the query.

---

## Implemented Agents

### 1. Study Material Agent

Responsibilities:

* Generate learning notes
* Provide explanations for topics
* Support concept understanding

---

### 2. Question Answering Agent

Responsibilities:

* Answer direct questions
* Resolve conceptual doubts
* Provide concise explanations

---

### 3. Quiz Agent

Responsibilities:

* Generate MCQs
* Create practice questions
* Support self-assessment

---

## Mixed Query Handling

The system supports multiple agents for a single user query.

### Example

User Input:

```text
Explain arrays and create 5 MCQs.
```

Selected Agents:

```text
Study Material Agent
Quiz Agent
```

The responses from both agents are combined and returned in a single JSON response.

This approach allows the system to function as a collaborative multi-agent learning assistant.

---

## Response Format

The backend returns a structured JSON response.

### Sample Response

```json
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
```

---

## API Testing

The API was tested using Thunder Client in Visual Studio Code.

### Testing Procedure

1. Start the backend server:

```bash
node server.js
```

2. Create a POST request:

```text
http://localhost:5000/api/chat
```

3. Select Body → JSON.

4. Send the following request:

```json
{
    "message": "Give me C programming notes and 5 quiz questions"
}
```

5. Verify that both Study Material and Quiz agents are triggered successfully.

---

## Conclusion

The backend for the Multi-Agent AI Learning Assistant was successfully implemented using Node.js and Express.js. The system supports automatic agent selection, mixed-query handling, modular code organization, and structured API responses. The implementation provides a strong foundation for future integration with actual AI models and frontend interfaces.
