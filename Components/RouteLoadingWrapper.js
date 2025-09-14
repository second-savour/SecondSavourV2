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

    if (pathname === previousPathnameRef.current) {
      return;
    }

    previousPathnameRef.current = pathname;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    startLoading("Loading page...");
    
    timeoutRef.current = setTimeout(() => {
      stopLoading();
      timeoutRef.current = null;
    }, 1000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [pathname]);

  return children;
}
