"use client"
import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";


export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      
      <div className="animate-pulse flex ">
        <div className="rounded-full bg-slate-700 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="space-y-3">
           
          </div>
        </div>
      </div>

    );

  if (resolvedTheme === "dark") {
    return <FiSun onClick={() => setTheme("light")} size={25} />;
  }

  if (resolvedTheme === "light") {
    return <FiMoon onClick={() => setTheme("dark")} size={25}/>;
  }
}
