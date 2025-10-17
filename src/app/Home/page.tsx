"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  ShoppingCart,
  TrendingDown,
  Package,
  CheckCircle2,
  Clock
} from "lucide-react";

const SECTION_PADDING = "px-5";
const PAGE_VERTICAL_SPACE = "space-y-6 pt-20 pb-24";

// 임시 데이터
const todayBriefing = {
  expiringToday: [
    { name: "토마토", location: "냉장", quantity: 3 },
    { name: "우유", location: "냉장", quantity: 1 },
  ],
  expiringSoon: [
    { name: "계란", daysLeft: 2, location: "냉장" },
    { name: "양상추", daysLeft: 3, location: "냉장" },
    { name: "두부", daysLeft: 3, location: "냉장" },
  ],
  shoppingList: 5,
  totalItems: 51,
  lastUpdate: "2시간 전",
};

const quickStats = [
  { label: "전체 재고", value: 51, icon: Package, color: "text-blue-600", bgColor: "bg-blue-50" },
  { label: "오늘 만료", value: 2, icon: AlertTriangle, color: "text-red-600", bgColor: "bg-red-50" },
  { label: "쇼핑 목록", value: 5, icon: ShoppingCart, color: "text-green-600", bgColor: "bg-green-50" },
];

export default function HomePage() {
  const today = React.useMemo(
    () =>
      new Date().toLocaleDateString("ko-KR", {
        month: "long",
        day: "numeric",
        weekday: "short",
      }),
    []
  );

  return (
    <div className={`relative min-h-screen bg-[#FAFAF5] ${PAGE_VERTICAL_SPACE}`}>
      {/* 헤더 */}
      <section className={SECTION_PADDING}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">오늘의 브리핑</h1>
            <p className="text-sm text-gray-500 mt-1">{today}</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="w-3 h-3" />
            {todayBriefing.lastUpdate}
          </div>
        </div>
      </section>

      {/* 퀵 통계 */}
      <section className={SECTION_PADDING}>
        <div className="grid grid-cols-3 gap-3">
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-3">
                <div className="flex flex-col items-center">
                  <div className={`p-2 rounded-full ${stat.bgColor} mb-2`}>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                  <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 오늘 만료 - 긴급 */}
      {todayBriefing.expiringToday.length > 0 && (
        <section className={SECTION_PADDING}>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-bold text-gray-800">오늘 만료 (긴급!)</h2>
          </div>
          <div className="space-y-2">
            {todayBriefing.expiringToday.map((item, index) => (
              <Card key={index} className="p-4 border-l-4 border-l-red-500">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.location} · {item.quantity}개
                    </p>
                  </div>
                  <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100">
                    D-Day
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* 임박 만료 (1-3일) */}
      <section className={SECTION_PADDING}>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-5 h-5 text-orange-600" />
          <h2 className="text-lg font-bold text-gray-800">만료 임박 (1-3일)</h2>
        </div>
        <Card className="p-4">
          <div className="space-y-3">
            {todayBriefing.expiringSoon.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.location}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-orange-600 border-orange-300">
                  D-{item.daysLeft}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* 오늘의 액션 아이템 */}
      <section className={SECTION_PADDING}>
        <h2 className="text-lg font-bold text-gray-800 mb-3">오늘의 할 일</h2>
        <div className="space-y-2">
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-full">
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">만료 임박 식재료 확인</p>
                <p className="text-xs text-gray-500 mt-1">2개 항목이 오늘 만료돼요</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-full">
                <ShoppingCart className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">쇼핑 목록 체크</p>
                <p className="text-xs text-gray-500 mt-1">{todayBriefing.shoppingList}개 항목이 대기중이에요</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 이번 주 성과 */}
      <section className={SECTION_PADDING}>
        <h2 className="text-lg font-bold text-gray-800 mb-3">이번 주 성과</h2>
        <Card className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-100 rounded-full">
              <TrendingDown className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">폐기율 5% 감소!</p>
              <p className="text-xs text-gray-600 mt-1">
                지난주보다 더 효율적으로 관리하고 있어요
              </p>
              <div className="flex items-center gap-2 mt-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span className="text-xs text-green-700 font-medium">잘하고 있어요!</span>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
