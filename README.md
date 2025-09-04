# 🚀 Laptop Finder

A modern web application that helps users find laptops based on their specific requirements using Flipkart data. Built with Node.js, Express, and vanilla JavaScript with a beautiful cyberpunk-inspired UI.

## ✨ Features

- **Smart Search**: Filter laptops by brand, RAM, storage, use case, and battery life
- **Price Range**: Set minimum and maximum price limits
- **Real-time Results**: Get instant laptop recommendations
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Demo Mode**: Works offline with sample data for demonstration
- **Modern UI**: Cyberpunk-inspired design with smooth animations

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **APIs**: Google Search Results API (SerpAPI)
- **Styling**: Custom CSS with responsive design
- **Deployment**: GitHub Pages ready

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- SerpAPI key (for live search functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/R1zE-Hackz/Laptop_finder.git
   cd Laptop_finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in backend directory
   cd backend
   echo "SERPAPI_KEY=your_api_key_here" > .env
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5000` to view the frontend

## 📁 Project Structure

```
Laptop_finder/
├── backend/
│   ├── server.js          # Express server
│   ├── flipkartscraper.js # Flipkart data scraper
│   └── .env              # Environment variables
├── frontend/
│   ├── index.html        # Main HTML file
│   ├── main.js          # Frontend JavaScript
│   └── style.css        # Styling
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🔧 Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm run build` - Build the project (frontend is static)
- `npm test` - Run tests (placeholder)

## 🌐 API Endpoints

### Health Check
```
GET /health
```
Returns server status and health information.

### Search Laptops
```
GET /api/laptops?q=<search_query>
```
Search for laptops based on the provided query.

**Query Parameters:**
- `q` (required): Search query string

**Example:**
```
GET /api/laptops?q=HP 16GB 512GB gaming
```

**Response:**
```json
{
  "success": true,
  "query": "HP 16GB 512GB gaming",
  "results": [
    {
      "id": 1,
      "title": "HP Pavilion Gaming Laptop...",
      "link": "https://flipkart.com/...",
      "snippet": "Gaming laptop with...",
      "source": "Flipkart",
      "position": 1
    }
  ],
  "count": 1
}
```

## 🎨 Customization

### Adding New Brands
Edit `frontend/index.html` and add new options to the brand select element.

### Modifying Search Criteria
Update the form elements in `frontend/index.html` and adjust the query building logic in `frontend/main.js`.

### Styling Changes
Modify `frontend/style.css` to customize the appearance. The app uses CSS custom properties and modern CSS features.

## 🚀 Deployment

### GitHub Pages
The frontend is already configured for GitHub Pages deployment. Simply push your changes to the main branch.

### Backend Deployment
For production use, deploy the backend to a service like:
- Heroku
- Railway
- Render
- DigitalOcean

Remember to:
1. Set the `PORT` environment variable
2. Set the `SERPAPI_KEY` environment variable
3. Update the frontend API URL to point to your deployed backend

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SERPAPI_KEY` | Your SerpAPI key for Google search results | Yes |
| `PORT` | Server port (defaults to 5000) | No |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [SerpAPI](https://serpapi.com/) for providing search results
- [Flipkart](https://flipkart.com/) for laptop data
- [Orbitron Font](https://fonts.google.com/specimen/Orbitron) for the cyberpunk aesthetic

## 📞 Support

If you have any questions or need help, please:
1. Check the [Issues](https://github.com/R1zE-Hackz/Laptop_finder/issues) page
2. Create a new issue if your problem isn't already addressed
3. Contact the maintainer

---

**Made with ❤️ by R1zE-Hackz**
