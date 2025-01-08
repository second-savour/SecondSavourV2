'use client';

import Script from 'next/script';

export default function ChatWidgetScript() {
  return (
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
  );
} 