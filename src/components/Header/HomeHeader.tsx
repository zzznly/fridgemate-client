'use client';

import { Bell } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

export const HomeHeader = () => {
  return (
    <div className="flex items-center justify-between h-14">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>가족 그룹 선택</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>다람쥐 가족</NavigationMenuLink>
              <NavigationMenuLink>도토리 가족</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Bell className="w-5 h-5" onClick={() => alert('Coming soon')} />
    </div>
  );
};
