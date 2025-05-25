"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight } from "lucide-react";

// Magic numbers/strings as named constants
const SECTION_PADDING = "px-5";
const PAGE_VERTICAL_SPACE = "space-y-6 py-16";
const CARD_INNER_CLASS = "px-4 flex flex-col gap-1";
const FRIDGE_ITEMS = [
  {
    name: "계란",
    dDay: "D-1",
    desc: "풀무원 유정란",
    progress: 85,
  },
  {
    name: "우유",
    dDay: "D-3",
    desc: "매일 우유 1L",
    progress: 50,
  },
  {
    name: "치즈",
    dDay: "D-5",
    desc: "서울우유 슬라이스치즈",
    progress: undefined, // 예시: progress bar 없는 경우
  },
];
const SHOPPING_ACTIVITY = {
  user: {
    name: "도토리",
    avatarUrl: "https://github.com/shadcn.png",
    fallback: "CN",
  },
  action: "쿠키 1개를 추가하였습니다.",
};

function FridgeStatusList() {
  return (
    <ul className="space-y-2">
      {FRIDGE_ITEMS.map((item) => (
        <Card key={item.name}>
          <div className={CARD_INNER_CLASS}>
            <div className="flex justify-between w-full">
              <span className="font-bold">{item.name}</span>
              <span className="text-xs text-gray-500">{item.dDay}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">{item.desc}</span>
              {typeof item.progress === "number" && (
                <Progress
                  value={item.progress}
                  className="w-1/4"
                  color="green"
                />
              )}
            </div>
          </div>
        </Card>
      ))}
    </ul>
  );
}

function ShoppingActivityCard() {
  const { user, action } = SHOPPING_ACTIVITY;
  return (
    <Card>
      <div className="px-4 flex flex-col items-center gap-1">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.fallback}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-md font-bold">{user.name}</span>
              <span className="text-xs text-gray-500">{action}</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4" color="gray" />
        </div>
      </div>
    </Card>
  );
}

export default function HomePage() {
  // 오늘 날짜 포맷 (간단한 로직은 바로 위에)
  const today = React.useMemo(
    () =>
      new Date().toLocaleDateString("ko-KR", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    []
  );

  return (
    <div
      className={`relative min-h-screen bg-[#FAFAF5] ${PAGE_VERTICAL_SPACE}`}
    >
      {/* 상단 날짜/그룹명 */}
      <section className={SECTION_PADDING}>
        <div className="text-2xl font-bold mt-1">{today}</div>
      </section>

      {/* Fridge Status */}
      <section className={SECTION_PADDING}>
        <div className="font-bold mb-2">냉장고 현황</div>
        <FridgeStatusList />
      </section>

      {/* Today's Shopping */}
      <section className={SECTION_PADDING}>
        <div className="font-bold mb-2">오늘의 쇼핑</div>
        <ShoppingActivityCard />
      </section>
    </div>
  );
}
