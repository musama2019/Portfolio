$(document).ready(function() {
    // Open modal when Learn More button is clicked
    $('.learn-more-btn').click(function() {
        const modalId = $(this).data('modal');
        $(`#${modalId}`).addClass('active');
        $('body').addClass('modal-open');
    });

    // Close modal when close button or outside the modal is clicked
    $('.modal-close, .modal-overlay').click(function(e) {
        // Only close if clicking the overlay or close button, not the modal content
        if ($(e.target).hasClass('modal-overlay') || $(e.target).hasClass('modal-close') || $(e.target).closest('.modal-close').length) {
            $('.modal-overlay').removeClass('active');
            $('body').removeClass('modal-open');
        }
    });

    // Close modal with ESC key
    $(document).keydown(function(e) {
        if (e.keyCode === 27) { // ESC key
            $('.modal-overlay').removeClass('active');
            $('body').removeClass('modal-open');
        }
    });
});

// AI Chatbot Functionality
// API key is now secure on server side via serverless function
class UsamaChatbot {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        
        // No API key needed in frontend anymore! 🎉
        // All API calls go through our secure serverless function
        
        this.portfolioData = null;
        this.systemPrompt = "";
        
        this.init();
    }
    
    init() {
        this.extractPortfolioData();
        this.buildComprehensiveSystemPrompt();
        this.bindEvents();
        this.loadChatHistory();
    }
    
    extractPortfolioData() {
        // Extract all portfolio information dynamically
        this.portfolioData = {
            personal: this.extractPersonalInfo(),
            experience: this.extractExperience(),
            education: this.extractEducation(),
            projects: this.extractProjects(),
            skills: this.extractSkills(),
            contact: this.extractContact()
        };
        
        console.log('Extracted Portfolio Data:', this.portfolioData);
    }
    
    extractPersonalInfo() {
        const aboutSection = document.getElementById('about');
        const leadSection = document.getElementById('lead');
        
        const personalInfo = {
            name: "Muhammad Usama",
            title: "",
            description: "",
            aboutText: ""
        };
        
        // Extract title from lead section
        const titleElement = leadSection?.querySelector('h2');
        if (titleElement) {
            personalInfo.title = titleElement.textContent.trim();
        }
        
        // Extract description from lead section
        const descElement = leadSection?.querySelector('.lead-description');
        if (descElement) {
            personalInfo.description = descElement.textContent.trim();
        }
        
        // Extract about text
        const aboutText = aboutSection?.querySelector('.about-summary p');
        if (aboutText) {
            personalInfo.aboutText = aboutText.textContent.trim();
        }
        
        return personalInfo;
    }
    
    extractExperience() {
        const experienceBlocks = document.querySelectorAll('.experience-block');
        const experiences = [];
        
        experienceBlocks.forEach(block => {
            const company = block.querySelector('h3')?.textContent.trim();
            const position = block.querySelector('h4')?.textContent.trim();
            const date = block.getAttribute('data-date');
            const location = block.querySelector('.location')?.textContent.trim();
            const shortDesc = block.querySelector('.experience-short-desc p')?.textContent.trim();
            
            // Extract modal content for detailed description
            const modalId = block.querySelector('[data-modal]')?.getAttribute('data-modal');
            let detailedDesc = "";
            
            if (modalId) {
                const modal = document.getElementById(modalId);
                const modalBody = modal?.querySelector('.modal-body');
                if (modalBody) {
                    const paragraphs = modalBody.querySelectorAll('p');
                    detailedDesc = Array.from(paragraphs).map(p => p.textContent.trim()).join(' ');
                }
            }
            
            experiences.push({
                company,
                position,
                date,
                location,
                shortDescription: shortDesc,
                detailedDescription: detailedDesc
            });
        });
        
        return experiences;
    }
    
    extractEducation() {
        const educationBlocks = document.querySelectorAll('.education-block');
        const education = [];
        
        educationBlocks.forEach(block => {
            const institution = block.querySelector('h3')?.textContent.trim();
            const degree = block.querySelector('h4')?.textContent.trim();
            const date = block.querySelector('.education-date')?.textContent.trim();
            const grade = block.querySelector('.final-grade')?.textContent.trim();
            
            const details = [];
            const listItems = block.querySelectorAll('li');
            listItems.forEach(item => {
                details.push(item.textContent.trim());
            });
            
            education.push({
                institution,
                degree,
                date,
                grade,
                details: details.join(' ')
            });
        });
        
        return education;
    }
    
    extractProjects() {
        const projectBlocks = document.querySelectorAll('.project');
        const projects = [];
        
        projectBlocks.forEach(block => {
            const title = block.querySelector('.project-info h3')?.textContent.trim();
            const description = block.querySelector('.project-info p')?.textContent.trim();
            const link = block.querySelector('.project-info a')?.getAttribute('href');
            
            const tags = [];
            const tagElements = block.querySelectorAll('.tag');
            tagElements.forEach(tag => {
                tags.push(tag.textContent.trim());
            });
            
            const categories = [];
            const classList = Array.from(block.classList);
            classList.forEach(cls => {
                if (cls.includes('ai-ml') || cls.includes('web-dev') || cls.includes('data-scraping') || cls.includes('mobile-app')) {
                    categories.push(cls);
                }
            });
            
            projects.push({
                title,
                description,
                tags: tags.join(', '),
                categories: categories.join(', '),
                link
            });
        });
        
        return projects;
    }
    
    extractSkills() {
        const skillsList = document.querySelectorAll('.skills-list li a');
        const skills = [];
        
        skillsList.forEach(skill => {
            skills.push(skill.textContent.trim());
        });
        
        return skills;
    }
    
    extractContact() {
        const contactInfo = document.querySelector('.contact-info');
        const contact = {
            email: "",
            phone: "",
            social: {}
        };
        
        // Extract email and phone
        const contactItems = contactInfo?.querySelectorAll('p');
        contactItems?.forEach(item => {
            const text = item.textContent.trim();
            if (text.includes('@')) {
                contact.email = text.replace(/.*\s/, '').trim();
            }
            if (text.includes('+')) {
                contact.phone = text.replace(/.*\s/, '').trim();
            }
        });
        
        // Extract social links
        const socialLinks = document.querySelectorAll('.social a, .menu-links a');
        socialLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href?.includes('linkedin')) {
                contact.social.linkedin = href;
            }
            if (href?.includes('github')) {
                contact.social.github = href;
            }
            if (href?.includes('fiverr')) {
                contact.social.fiverr = href;
            }
        });
        
        return contact;
    }
    
    buildComprehensiveSystemPrompt() {
        const data = this.portfolioData;
        
        this.systemPrompt = `You are Muhammad Usama's AI assistant on his portfolio website. Be enthusiastic, professional, and knowledgeable about his work.

ABOUT USAMA:
Name: Muhammad Usama
Title: ${data.personal.title || 'AI Developer & Full-Stack Engineer'}
Summary: ${data.personal.description || 'AI Developer at NUST specializing in LLMs, RAG systems, and MERN stack development'}

EXPERIENCE:
${data.experience.map(exp => `• ${exp.company} - ${exp.position} (${exp.date}): ${exp.shortDescription}`).join('\n')}

EDUCATION:
${data.education.map(edu => `• ${edu.institution} - ${edu.degree} (${edu.date})`).join('\n')}

KEY PROJECTS:
${data.projects.slice(0, 8).map(proj => `• ${proj.title}: ${proj.description.substring(0, 150)}...`).join('\n')}

SKILLS: ${data.skills.slice(0, 20).join(', ')}

CONTACT: ${data.contact.email} | ${data.contact.phone}

GUIDELINES:
- Answer questions about Usama's experience, projects, skills, and background
- Be specific and mention actual project names and technologies
- Encourage contacting Usama for collaboration: ${data.contact.email}
- For unrelated topics, politely redirect to his professional work
- Keep responses concise but informative (2-4 sentences)
- Show enthusiasm for his achievements

FALLBACK: Only for completely unrelated questions say: "I'm here to discuss Muhammad Usama's professional work and expertise. For other topics, contact him at ${data.contact.email}. What would you like to know about his projects or experience?"`;
    }
    
    bindEvents() {
        const chatbotButton = document.getElementById('chatbot-button');
        const chatbotClose = document.getElementById('chatbot-close');
        const chatbotSend = document.getElementById('chatbot-send');
        const chatbotInput = document.getElementById('chatbot-input');
        
        chatbotButton?.addEventListener('click', () => this.toggleChat());
        chatbotClose?.addEventListener('click', () => this.closeChat());
        chatbotSend?.addEventListener('click', () => this.sendMessage());
        
        chatbotInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // Quick question buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-btn')) {
                const question = e.target.getAttribute('data-question');
                this.sendMessage(question);
            }
        });
    }
    
    toggleChat() {
        const container = document.getElementById('chatbot-container');
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            container.classList.add('active');
        } else {
            container.classList.remove('active');
        }
    }
    
    closeChat() {
        const container = document.getElementById('chatbot-container');
        container.classList.remove('active');
        this.isOpen = false;
    }
    
    async sendMessage(message = null) {
        const input = document.getElementById('chatbot-input');
        const userMessage = message || input.value.trim();
        
        if (!userMessage) return;
        
        // Add user message to chat
        this.addMessage(userMessage, 'user');
        
        // Clear input
        if (!message) input.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            // Get AI response from serverless function
            const response = await this.getAIResponse(userMessage);
            this.hideTypingIndicator();
            this.addMessage(response, 'bot');
        } catch (error) {
            console.error('Error generating response:', error);
            this.hideTypingIndicator();
            
            // Simple fallback only for API errors
            const fallbackResponse = "I'm having a technical issue right now. Please feel free to contact Usama directly at musama2019@namal.edu.pk for any questions about his work and experience!";
            this.addMessage(fallbackResponse, 'bot');
        }
    }
    
    async getAIResponse(userMessage) {
        try {
            // Call our secure serverless function instead of Together AI directly
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: userMessage,
                    portfolioData: this.portfolioData,
                    systemPrompt: this.systemPrompt
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Serverless function error:', response.status, errorText);
                throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            
            if (!data.response) {
                console.error('Invalid response structure:', data);
                throw new Error('Invalid response structure from serverless function');
            }
            
            return data.response;
            
        } catch (error) {
            console.error('Serverless function call error:', error);
            throw error;
        }
    }
    
    addMessage(content, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = `<p>${content}</p>`;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Save to conversation history
        this.conversationHistory.push({ content, sender, timestamp: Date.now() });
        this.saveChatHistory();
    }
    
    showTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        indicator.style.display = 'flex';
        
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        indicator.style.display = 'none';
    }
    
    saveChatHistory() {
        try {
            localStorage.setItem('usama_chatbot_history', JSON.stringify(this.conversationHistory));
        } catch (e) {
            console.warn('Could not save chat history:', e);
        }
    }
    
    loadChatHistory() {
        try {
            const history = localStorage.getItem('usama_chatbot_history');
            if (history) {
                this.conversationHistory = JSON.parse(history);
            }
        } catch (e) {
            console.warn('Could not load chat history:', e);
        }
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new UsamaChatbot();
}); 