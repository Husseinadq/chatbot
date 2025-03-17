(function() {
    // Get the current script element and its data attributes
    const currentScript = document.currentScript;
    const storeId = currentScript.getAttribute('data-store-id');
    const storeName = currentScript.getAttribute('data-store-name'); // available if needed

    // Function to initialize the chat widget after the API validation
    function initChatWidget() {
        // Create the chat widget HTML structure
        function createChatWidget() {
            // Create main container
            const chatWidget = document.createElement('div');
            chatWidget.id = 'merchant-chat-widget';
            
            // Chat window
            const chatWindow = document.createElement('div');
            chatWindow.id = 'chat-window';
            
            // Chat header
            const chatHeader = document.createElement('div');
            chatHeader.id = 'chat-header';
            chatHeader.innerHTML = '<div>Store Support</div><span id="close-chat">✕</span>';
            
            // Chat messages
            const chatMessages = document.createElement('div');
            chatMessages.id = 'chat-messages';
            
            // Welcome message
            const welcomeMessage = document.createElement('div');
            welcomeMessage.className = 'welcome-message';
            welcomeMessage.textContent = 'Hello! How can we help you today?';
            chatMessages.appendChild(welcomeMessage);
            
            // Chat input container
            const chatInputContainer = document.createElement('div');
            chatInputContainer.id = 'chat-input-container';
            chatInputContainer.innerHTML = `
                <input type="text" id="message-input" placeholder="Type a message...">
                <button id="send-message">
                    <svg id="send-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 2L11 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            `;
            
            // Chat button
            const chatButton = document.createElement('button');
            chatButton.id = 'chat-button';
            chatButton.innerHTML = `
                <svg id="chat-button-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Chat Support
            `;
            
            // Assemble the chat widget
            chatWindow.appendChild(chatHeader);
            chatWindow.appendChild(chatMessages);
            chatWindow.appendChild(chatInputContainer);
            chatWidget.appendChild(chatWindow);
            chatWidget.appendChild(chatButton);
            
            // Add the widget to the document body
            document.body.appendChild(chatWidget);
            
            // Set up event listeners for chat functionality
            setupEventListeners();
        }
        
        // Set up event listeners for chat interactions
        function setupEventListeners() {
            const chatButton = document.getElementById('chat-button');
            const chatWindow = document.getElementById('chat-window');
            const closeChat = document.getElementById('close-chat');
            const sendMessage = document.getElementById('send-message');
            const messageInput = document.getElementById('message-input');
            
            // Toggle chat window visibility
            chatButton.addEventListener('click', function() {
                chatWindow.style.display = (chatWindow.style.display === 'none' || chatWindow.style.display === '') ? 'flex' : 'none';
            });
            
            // Close chat window
            closeChat.addEventListener('click', function() {
                chatWindow.style.display = 'none';
            });
            
            // Send message functionality
            function handleSendMessage() {
                const message = messageInput.value.trim();
                const chatMessages = document.getElementById('chat-messages');
                
                if (message) {
                    // Append user message
                    const userMessage = document.createElement('div');
                    userMessage.className = 'user-message';
                    userMessage.textContent = message;
                    chatMessages.appendChild(userMessage);
                    
                    // Clear input
                    messageInput.value = '';
                    
                    // Scroll to the bottom of the chat
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                    
                    // Simulate bot auto-reply
                    setTimeout(function() {
                        const botMessage = document.createElement('div');
                        botMessage.className = 'bot-message';
                        botMessage.textContent = 'Thanks for your message! A support agent will respond shortly.';
                        chatMessages.appendChild(botMessage);
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    }, 1000);
                }
            }
            
            sendMessage.addEventListener('click', handleSendMessage);
            messageInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    handleSendMessage();
                }
            });
        }
        
        // Initialize the chat widget once the DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createChatWidget);
        } else {
            createChatWidget();
        }
    }
    if(true){
        initChatWidget();
    }

    // Send a POST request to check if the store id is allowed
    // fetch("https://ai.trameaz.com/api/isalowd", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({ storeId: storeId })
    // })
    // .then(response => response.json())
    // .then(data => {
    //     // Check for allowed response (adapt this condition based on your API's response structure)
    //     if (data === true || data.allowed === true) {
    //         initChatWidget();
    //     } else {
    //         console.warn("Store not allowed: Chat widget will not load.");
    //     }
    // })
    // .catch(error => {
    //     console.error("Error during store validation:", error);
    // });
})();
