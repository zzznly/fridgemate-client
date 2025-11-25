"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Package,
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
  totalItems: 51,
  lastUpdate: "2시간 전",
};

const quickStats = [
  { label: "전체 재고", value: 51, icon: Package, color: "text-blue-600", bgColor: "bg-blue-50" },
  { label: "오늘 만료", value: 2, icon: AlertTriangle, color: "text-red-600", bgColor: "bg-red-50" },
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
        <div className="grid grid-cols-2 gap-3">
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-4">
                <div className="flex flex-col items-center">
                  <div className={`p-3 rounded-full ${stat.bgColor} mb-2`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
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
    </div>
  );
}
