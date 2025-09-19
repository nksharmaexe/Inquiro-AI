# 🤖 Inquiro AI

<div align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</div>

<div align="center">
  <h3>🚀 A Modern Full-Stack AI Chat Application</h3>
  <p>Powered by Google Gemini & Perplexity AI with real-time search capabilities</p>
</div>

---

## ✨ Features

### 🎯 Core Functionality
- **Dual AI Models**: Switch between Google Gemini and Perplexity AI
- **Thread Management**: Create, manage, and delete chat conversations
- **Real-time Responses**: Streaming AI responses with typing animation
- **Search Integration**: Web search results with Perplexity AI
- **Persistent Storage**: MongoDB integration for chat history
- **Dark Theme**: Beautiful dark mode interface

### 🎨 User Experience
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Collapsible Sidebar**: Clean navigation with chat history
- **Markdown Support**: Rich text rendering with syntax highlighting
- **Real-time Updates**: Live chat interface with smooth animations
- **Model Selection**: Easy switching between AI providers

### 🛠️ Technical Features
- **Modern Stack**: React 19, Node.js, Express, MongoDB
- **Component Library**: Radix UI components with custom styling
- **Environment Config**: Secure API key management
- **Error Handling**: Comprehensive error management
- **RESTful API**: Clean API architecture with proper routing

---

## 🏗️ Project Structure

```
inquiro-ai/
├── 📁 client/                 # Frontend React Application
│   ├── 📁 src/
│   │   ├── 📁 components/     # Reusable UI components
│   │   │   └── 📁 ui/         # Radix UI components
│   │   ├── 📁 pages/          # Main application pages
│   │   │   ├── AppSidebar.jsx # Sidebar navigation
│   │   │   ├── Chat.jsx       # Chat messages display
│   │   │   └── ChatWindow.jsx # Main chat interface
│   │   ├── App.jsx            # Root component
│   │   ├── MyContext.jsx      # React Context for state
│   │   └── main.jsx           # Application entry point
│   ├── index.html             # HTML template
│   ├── package.json           # Frontend dependencies
│   └── vite.config.js         # Vite configuration
│
├── 📁 server/                 # Backend Node.js Application
│   ├── 📁 routes/
│   │   └── chat.js            # Chat API endpoints
│   ├── 📁 models/
│   │   └── Thread.js          # MongoDB schema
│   ├── 📁 utils/
│   │   ├── gemini.js          # Google Gemini integration
│   │   └── perplexity.js      # Perplexity AI integration
│   ├── index.js               # Server entry point
│   └── package.json           # Backend dependencies
│
└── README.md                  # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **API Keys** for Gemini and Perplexity

### 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/inquiro-ai.git
   cd inquiro-ai
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

### ⚙️ Environment Setup

Create environment files for both frontend and backend:

#### Backend Environment (`.env` in `/server`)
```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/inquiro-ai
# or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/database

# AI API Keys
GEMINI_API_KEY=your_google_gemini_api_key_here
PPLX_API_KEY=your_perplexity_api_key_here

# Server Configuration
PORT=5000
NODE_ENV=development
```

#### Frontend Environment (`.env` in `/client`)
```env
VITE_API_URL=http://localhost:5000/api
```

### 🔑 Getting API Keys

#### Google Gemini API
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `.env` file

#### Perplexity AI API
1. Sign up at [Perplexity AI](https://www.perplexity.ai/settings/api)
2. Generate an API key
3. Add it to your environment variables

---

## 🏃‍♂️ Running the Application

### Development Mode

1. **Start the Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:5000`

2. **Start the Frontend Application**
   ```bash
   cd client
   npm run dev
   ```
   Application will run on `http://localhost:5173`

### Production Build

1. **Build the Frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Start Production Server**
   ```bash
   cd server
   npm start
   ```

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 🗨️ Chat Management

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `POST` | `/chat` | Send message and get AI response | `{threadId, message, model}` |
| `GET` | `/threads` | Get all chat threads | - |
| `GET` | `/thread/:threadId` | Get specific thread messages | - |
| `DELETE` | `/thread/:threadId` | Delete a chat thread | - |

#### 📝 Request/Response Examples

**Send Chat Message**
```javascript
POST /api/chat
Content-Type: application/json

{
  "threadId": "uuid-thread-id",
  "message": "What is artificial intelligence?",
  "model": "gemini" // or "perplexity"
}
```

**Response**
```javascript
{
  "reply": "Artificial intelligence (AI) is...",
  "role": "model",
  "model": "gemini",
  "searchResults": [] // Only for Perplexity
}
```

---


## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and conventions
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation as needed

---

## 📝 License

This project is licensed under the ISC License - see the package.json files for details.

---

## 🙏 Acknowledgments

- **Google Gemini** for powerful AI capabilities
- **Perplexity AI** for web-search integration
- **Radix UI** for accessible component primitives
- **Tailwind CSS** for utility-first styling
- **React** and **Node.js** communities for excellent documentation

---


<div align="center">
  <p>Made with ❤️ by nk sharma</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>