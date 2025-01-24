'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function ChatWidgetScript() {
  useEffect(() => {
    const loadMarked = () => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
      script.onload = () => {
        console.log('Debug: Marked.js loaded dynamically');
        if (window.marked) {
          window.marked.setOptions({
            breaks: true,
            gfm: true,
            headerIds: false,
            mangle: false,
            sanitize: false,
          });
          console.log('Debug: Marked configured');
        }
      };
      document.head.appendChild(script);
    };

    loadMarked();
  }, []);

  return (
    <Script
      src="/service-agent/chat-widget.js"
      strategy="afterInteractive"
      onReady={() => {
        console.log('Debug: Chat widget script ready');
        if (window.chatWidget) {
          // Small delay to ensure marked.js is loaded
          setTimeout(() => {
            if (window.marked) {
              console.log('Debug: Both chat widget and marked are ready');
              window.chatWidget.init();
            } else {
              console.warn('Debug: Marked not available after delay');
            }
          }, 500);
        }
      }}
    />
  );
} 