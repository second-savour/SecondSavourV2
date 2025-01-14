'use client';

import Script from 'next/script';

export default function ChatWidgetScript() {
  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"
        strategy="beforeInteractive"
        onLoad={() => {
          // Configure marked.js
          window.marked.setOptions({
            breaks: true,      // Convert line breaks to <br>
            gfm: true,         // Enable GitHub Flavored Markdown
            headerIds: false,  // Disable header IDs
            mangle: false,     // Disable mangling
            sanitize: false,   // Allow HTML in markdown
          });
        }}
      />
      <Script
        src="/service-agent/chat-widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Chat widget script loaded');
          if (window.chatWidget) {
            window.chatWidget.init();
          }
        }}
        onError={(e) => {
          console.error('Error loading chat widget:', e);
        }}
      />
    </>
  );
} 