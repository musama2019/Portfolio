# Muhammad Usama - Portfolio Website

A modern, interactive portfolio website showcasing Muhammad Usama's expertise in AI development, machine learning, and full-stack engineering.

## Features

- **🤖 Secure AI Chatbot**: API key hidden via serverless functions - no exposure risk!
- **📊 Dynamic Content Extraction**: Automatically reads all portfolio data for accurate responses
- **🎨 Modern Design**: Dark mode, animations, and responsive layout
- **🚀 Project Showcase**: Comprehensive display of AI/ML and web development projects
- **📧 Contact Form**: Direct messaging via Formspree integration
- **🌍 Multi-language Support**: Google Translate integration

## 🔒 Secure AI Chatbot Setup

The chatbot now uses **serverless functions** to keep the API key completely secure on the server side!

### 🚀 Quick Deploy (5 minutes)

#### Option 1: Deploy to Vercel (Recommended)
1. **Fork/Clone** this repository
2. **Connect to Vercel**: 
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repo
3. **Add Environment Variable**:
   - In Vercel dashboard → Settings → Environment Variables
   - Add: `TOGETHER_API_KEY` = `your_api_key_here`
4. **Deploy**: Vercel deploys automatically!

#### Option 2: Deploy to Netlify
1. **Connect repo** to Netlify
2. **Add Environment Variable**:
   - Site Settings → Environment Variables
   - Add: `TOGETHER_API_KEY` = `your_api_key_here`
3. **Deploy**: Netlify builds automatically!

### 🛡️ Security Benefits
- ✅ **API key completely hidden** from frontend code
- ✅ **No browser exposure** - key stays on server
- ✅ **Safe for public repos** - no secrets in code
- ✅ **Professional deployment** - enterprise-level security

### 🧪 Local Development
```bash
# 1. Clone the repo
git clone your-repo-url
cd Portfolio

# 2. Install Vercel CLI (optional)
npm i -g vercel

# 3. Create environment file
echo "TOGETHER_API_KEY=your_key_here" > .env.local

# 4. Run locally
vercel dev
# OR just open index.html (will use fallback)
```

### 📁 Project Structure
```
Portfolio/
├── index.html              # Main portfolio page
├── api/
│   └── chat.js            # 🔒 Secure serverless function
├── js/
│   ├── modal.js           # 🤖 Chatbot (no API key!)
│   └── *.js              # Other scripts
├── css/
│   └── styles.css         # Styling + chatbot UI
├── images/               # Portfolio assets
├── vercel.json          # Deployment config
└── README.md           # This file
```

## 🛠️ Technologies Used

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap for responsive design
- Font Awesome icons
- AOS (Animate On Scroll) library

### Backend
- **Serverless Functions** (Vercel/Netlify)
- **Together AI API** with Mixtral-8x7B model
- **Secure Environment Variables**

### Integrations
- **Formspree**: Contact form handling
- **Google Translate**: Multi-language support

## 🎯 Chatbot Features

- **🧠 Comprehensive Knowledge**: Extracts all portfolio content automatically
- **💬 Smart Responses**: Detailed answers about experience, projects, skills
- **🎭 Professional Tone**: Enthusiastic and knowledgeable
- **🔄 Contextual**: Cross-references related work and experiences
- **🛡️ Secure**: API key protected via serverless functions

## 🚀 Deployment Options

### Static + Serverless (Recommended)
- **Vercel**: Perfect for this setup, automatic deployment
- **Netlify**: Great alternative with similar features
- **Railway**: Good for more complex backends

### Static Only (Fallback Mode)
- **GitHub Pages**: Free hosting, chatbot uses fallback responses
- **Netlify Static**: Works but no AI responses
- **Any Static Host**: Basic functionality

## 📞 Contact

- **Email**: musama2019@namal.edu.pk
- **Phone**: (+92) 3096313137
- **LinkedIn**: [Muhammad Usama](https://www.linkedin.com/in/muhammad-usama-2ba170197)
- **GitHub**: [musama2019](https://github.com/musama2019)
- **Fiverr**: [usama_mlguy](https://www.fiverr.com/usama_mlguy)

## 📄 License

This portfolio is created for Muhammad Usama. Feel free to use the code structure as inspiration for your own portfolio, but please don't use the personal content, images, or branding.

## 🙏 Acknowledgments

- **Dev Portfolio** by Ryan Fitzgerald - Base template
- **Font Awesome** - Icons
- **Bootstrap** - CSS framework
- **AOS Library** - Animations
- **Together AI** - AI-powered responses
- **Vercel** - Serverless hosting
- **Formspree** - Contact form handling 