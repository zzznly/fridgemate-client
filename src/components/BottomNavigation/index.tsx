"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Home", icon: "🏠", href: "/Home" },
  { label: "Shopping", icon: "🛒", href: "/Shopping" },
  { label: "Fridge", icon: "🧊", href: "/Fridge" },
  { label: "Settings", icon: "⚙️", href: "/Settings" },
];

export default function BottomNavigation() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <ul className="flex justify-between items-center h-18 px-2">
        {NAV_ITEMS.map((item, idx) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.label} className="flex-1">
              <Link
                href={item.href}
                className={`flex flex-col items-center justify-center w-full h-full ${
                  isActive ? "text-green-700 font-bold" : "text-gray-500"
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
