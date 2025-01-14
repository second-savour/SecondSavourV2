window.chatWidget = {
    conversationId: null,
    messageHistory: [],
    initialized: false,

    init: function() {
        // Check if already initialized to prevent double initialization
        if (this.initialized) {
            console.log('Debug: Chat widget already initialized');
            return;
        }
        
        // Check if there's an active session
        const sessionId = sessionStorage.getItem('chatSessionId');
        if (!sessionId) {
            sessionStorage.setItem('chatSessionId', Date.now().toString());
        }
        
        // Load existing messages from localStorage using session ID
        this.loadHistory();
        
        // If this is a new conversation, add the welcome message to history
        if (this.messageHistory.length === 0) {
            const welcomeMessage = "Hello! 👋 Welcome to Second Savour! I'm here to help you with any questions about our sustainable Citrus Treats or store locations. How can I assist you today?";
            this.messageHistory.push({ 
                text: welcomeMessage, 
                type: 'bot' 
            });
            this.saveHistory();
        }

        // Add CSS
        const style = document.createElement('style');
        style.textContent = `
            .chat-widget {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 99999;
                font-family: Arial, sans-serif;
            }
            .chat-button {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background-color: #005a2d;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                font-size: 24px;
                transition: transform 0.3s ease;
            }
            .chat-button:hover {
                transform: scale(1.1);
            }
            .chat-popup {
                position: fixed;
                bottom: 100px;
                right: 20px;
                width: 350px;
                height: 500px;
                background: white;
                border-radius: 15px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                transition: all 0.3s ease;
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px);
                display: flex;
                flex-direction: column;
                border: 1px solid #ddd;
            }
            .chat-popup.active {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            .chat-header {
                padding: 15px;
                background: #005a2d;
                color: white;
                border-radius: 15px 15px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .chat-messages {
                flex-grow: 1;
                overflow-y: auto;
                padding: 15px;
                background: #f8f9fa;
                display: flex;
                flex-direction: column;
                margin-bottom: 60px;
            }
            .message-container {
                display: flex;
                margin-bottom: 10px;
                width: 100%;
            }
            .message {
                max-width: 80%;
                padding: 8px 15px;
                border-radius: 15px;
                word-wrap: break-word;
                width: fit-content;
            }
            .user-message {
                background: #005a2d;
                color: white;
                margin-left: auto;
            }
            .bot-message {
                background: white;
                border: 1px solid #ddd;
                margin-right: auto;
                font-size: 14px;
                line-height: 1.4;
                font-family: var(--font-geist-sans), Arial, sans-serif;
            }
            .bot-message * {
                font-size: 14px !important;
                line-height: 1.4;
                margin: 4px 0;
                font-family: var(--font-geist-sans), Arial, sans-serif;
            }
            .bot-message p {
                margin: 8px 0;
                font-family: var(--font-geist-sans), Arial, sans-serif;
            }
            .bot-message h1, .bot-message h2, .bot-message h3 {
                font-weight: bold;
                color: #005a2d;
                font-family: var(--font-geist-sans), Arial, sans-serif;
            }
            .bot-message h1 { font-size: 16px !important; }
            .bot-message h2 { font-size: 15px !important; }
            .bot-message h3 { font-size: 14px !important; }
            .bot-message ul, .bot-message ol {
                margin: 8px 0 8px 20px;
                padding-left: 0;
                list-style-position: outside;
                font-family: var(--font-geist-sans), Arial, sans-serif;
            }
            .bot-message ul {
                list-style-type: disc;
            }
            .bot-message ul ul {
                list-style-type: circle;
            }
            .bot-message ol {
                list-style-type: decimal;
            }
            .bot-message li {
                margin: 4px 0;
                padding-left: 5px;
                display: list-item;
                font-family: var(--font-geist-sans), Arial, sans-serif;
            }
            .bot-message li p {
                margin: 0;
                display: inline-block;
            }
            .bot-message a {
                color: #005a2d;
                text-decoration: underline;
            }
            .chat-input-area {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                padding: 15px;
                border-top: 1px solid #eee;
                display: flex;
                background: white;
                border-radius: 0 0 15px 15px;
                gap: 8px;
                z-index: 1;
            }
            .chat-input {
                flex-grow: 1;
                padding: 8px 12px;
                border: 1px solid #ddd;
                border-radius: 20px;
                outline: none;
                font-size: 14px;
            }
            .chat-input:focus {
                border-color: #005a2d;
            }
            .chat-send {
                background: #005a2d;
                color: white;
                border: none;
                border-radius: 20px;
                padding: 8px 16px;
                cursor: pointer;
                transition: background-color 0.3s;
                display: flex;
                align-items: center;
                justify-content: center;
                min-width: 40px;
                width: auto;
                height: auto;
                font-size: 14px;
            }
            .chat-send i {
                font-size: 14px;
                width: 14px;
                height: 14px;
            }
            .chat-send:hover {
                background: #004020;
            }
            .message-container:last-child {
                margin-bottom: 10px;
                padding-bottom: 10px;
            }
            @media (max-width: 768px) {
                .chat-popup {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    width: 100% !important;
                    height: 100vh !important;
                    margin: 0;
                    border-radius: 0;
                    transform: translateY(100%);
                    z-index: 999999;
                }
                .chat-popup.active {
                    transform: translateY(0);
                }
                .chat-header {
                    border-radius: 0;
                }
                .chat-messages {
                    height: calc(100vh - 130px);
                    margin-bottom: 50px;
                }
                .chat-input-area {
                    position: fixed;
                    padding: 15px;
                    background: white;
                }
                .chat-popup.active + .chat-button {
                    display: none;
                }
                .bot-message, .bot-message * {
                    font-size: 13px !important;
                }
                .bot-message h1 { font-size: 15px !important; }
                .bot-message h2 { font-size: 14px !important; }
                .bot-message h3 { font-size: 13px !important; }
            }
        `;
        document.head.appendChild(style);

        // Create chat widget HTML
        const chatDiv = document.createElement('div');
        chatDiv.className = 'chat-widget';
        chatDiv.innerHTML = `
            <div class="chat-button" onclick="window.chatWidget.toggle()">
                <i class="fas fa-comments"></i>
            </div>
            <div class="chat-popup" id="chat-popup">
                <div class="chat-header">
                    <span>Chat with us</span>
                    <span onclick="window.chatWidget.toggle()" style="cursor: pointer">
                        <i class="fas fa-times"></i>
                    </span>
                </div>
                <div class="chat-messages" id="chat-messages"></div>
                <div class="chat-input-area">
                    <input type="text" class="chat-input" id="chat-input" 
                        placeholder="Type your message...">
                    <button class="chat-send" onclick="window.chatWidget.sendMessage()">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(chatDiv);

        // Add event listener for Enter key
        document.getElementById('chat-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                window.chatWidget.sendMessage();
            }
        });

        // Display all messages from history
        const messagesDiv = document.getElementById('chat-messages');
        this.messageHistory.forEach(msg => {
            this.displayMessage(msg.text, msg.type);
        });

        // Mark as initialized
        this.initialized = true;
        console.log('Debug: Chat widget initialization complete');
    },

    toggle: function() {
        const popup = document.getElementById('chat-popup');
        popup.classList.toggle('active');
        if (popup.classList.contains('active')) {
            document.getElementById('chat-input').focus();
        }
    },

    addMessage: function(text, type) {
        console.log('Adding message:', { text, type });
        // Add to history first
        this.messageHistory.push({ text, type });
        this.saveHistory();

        // Then display the message
        this.displayMessage(text, type);
    },

    displayMessage: function(text, type) {
        console.log('Displaying message:', { text, type });
        const messagesDiv = document.getElementById('chat-messages');
        const container = document.createElement('div');
        container.className = 'message-container';
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        if (type === 'bot') {
            console.log('Bot message received:', text);
            if (window.marked) {
                console.log('Parsing with marked');
                try {
                    messageDiv.innerHTML = window.marked.parse(text);
                } catch (error) {
                    console.error('Markdown parsing error:', error);
                    messageDiv.textContent = text;
                }
            } else {
                console.warn('Marked not available');
                messageDiv.textContent = text;
            }
        } else {
            messageDiv.textContent = text;
        }
        
        container.appendChild(messageDiv);
        messagesDiv.appendChild(container);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    },

    sendMessage: function() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (message) {
            this.addMessage(message, 'user');
            input.value = '';

            fetch('https://second-savour-stryve.onrender.com/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    conversation_id: this.conversationId
                })
            })
            .then(response => response.json())
            .then(data => {
                this.conversationId = data.conversation_id;
                this.addMessage(data.response, 'bot');
            })
            .catch(error => {
                console.error('Error:', error);
                this.addMessage('Sorry, there was an error processing your message.', 'bot');
            });
        }
    },

    loadHistory: function() {
        const sessionId = sessionStorage.getItem('chatSessionId');
        console.log('Loading history for session:', sessionId);
        const saved = localStorage.getItem(`chatHistory_${sessionId}`);
        console.log('Saved history:', saved);
        this.messageHistory = saved ? JSON.parse(saved) : [];
        this.conversationId = localStorage.getItem(`conversationId_${sessionId}`);
    },

    saveHistory: function() {
        const sessionId = sessionStorage.getItem('chatSessionId');
        console.log('Saving history for session:', sessionId);
        console.log('History to save:', this.messageHistory);
        localStorage.setItem(`chatHistory_${sessionId}`, JSON.stringify(this.messageHistory));
        if (this.conversationId) {
            localStorage.setItem(`conversationId_${sessionId}`, this.conversationId);
        }
    }
};

// Initialize the widget when the page loads
window.addEventListener('load', function() {
    window.chatWidget.init();
}); 