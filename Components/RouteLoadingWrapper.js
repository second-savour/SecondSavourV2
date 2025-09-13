"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTransition } from "./TransitionProvider";

export default function RouteLoadingWrapper({ children }) {
  const pathname = usePathname();
  const { startLoading, stopLoading } = useTransition();
  const timeoutRef = useRef(null);
  const previousPathnameRef = useRef("");
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip the very first render to avoid loading on initial page load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      previousPathnameRef.current = pathname;
      return;
    }

    // Only trigger if pathname actually changed
    if (pathname === previousPathnameRef.current) {
      return;
    }

    console.log(`Route changed from ${previousPathnameRef.current} to ${pathname}`);
    previousPathnameRef.current = pathname;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Start loading immediately
    startLoading("Loading page...");
    
    // Stop loading after exactly 1 second
    timeoutRef.current = setTimeout(() => {
      console.log("Stopping loading after 1 second");
      stopLoading();
      timeoutRef.current = null;
    }, 1000);

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [pathname]); // Only depend on pathname, not the functions

  return children;
}
