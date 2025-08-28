# ComapareAnyThing 🔍

A full-stack web application that lets you compare any two items using AI-powered analysis. Built with Spring Boot and React, powered by Claude AI.

## ✨ Features

- **Smart Comparisons**: Compare anything - fruits, cars, technologies, products, etc.
- **AI-Powered Analysis**: Uses Claude AI to provide detailed comparisons with key features
- **Modern UI**: Clean, responsive React interface with styled components
- **Real-time Results**: Fast API responses with loading states
- **Category Support**: Multiple comparison categories (Fruits, Electronics, Vehicles, etc.)

## 🚀 Tech Stack

**Backend:**
- Spring Boot 3.2.5
- Java 17
- Claude AI API (Anthropic)
- Maven

**Frontend:**
- React 18
- Styled Components
- Modern ES6+ JavaScript

## 📋 Prerequisites

- Java 17+
- Node.js 18+
- Maven
- Anthropic API key

## ⚙️ Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/balreddygurram/ComapareAnyThing.git
   cd ComapareAnyThing
   ```

2. **Set up environment variables**
   ```bash
   export ANTHROPIC_API_KEY="your-anthropic-api-key-here"
   ```

3. **Build and run**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

4. **Access the application**
   - Open http://localhost:8080
   - Start comparing items!

## 🔒 Security

- API keys are externalized via environment variables
- No sensitive data committed to repository
- Secure HTTPS API endpoints only

## 📱 Usage

1. Select a comparison category
2. Enter two items to compare
3. Click "Compare" to get AI-powered analysis
4. View detailed comparison with key features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using Claude AI**
