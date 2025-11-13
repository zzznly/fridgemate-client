"use client";

import { Card } from "@/components/ui/card";
import {
  Refrigerator,
  Snowflake,
  Home,
  TrendingUp,
  AlertTriangle,
  ShoppingCart,
  Package,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
} from "recharts";

const SECTION_PADDING = "px-5";
const PAGE_VERTICAL_SPACE = "space-y-6 pt-20 pb-24";

// 임시 데이터
const storageData = [
  { name: "냉장", value: 24, icon: Refrigerator, color: "#3b82f6" },
  { name: "냉동", value: 15, icon: Snowflake, color: "#8b5cf6" },
  { name: "실온", value: 12, icon: Home, color: "#f59e0b" },
];

const mostWastedData = [
  { name: "토마토", count: 5, category: "채소" },
  { name: "우유", count: 4, category: "유제품" },
  { name: "계란", count: 3, category: "기타" },
  { name: "양상추", count: 3, category: "채소" },
  { name: "두부", count: 2, category: "기타" },
];

const mostPurchasedData = [
  { name: "계란", count: 12, category: "기타" },
  { name: "우유", count: 10, category: "유제품" },
  { name: "양파", count: 8, category: "채소" },
  { name: "당근", count: 7, category: "채소" },
  { name: "닭가슴살", count: 6, category: "육류" },
];

const categoryData = [
  { name: "채소", value: 18, color: "#10b981" },
  { name: "육류", value: 12, color: "#ef4444" },
  { name: "유제품", value: 9, color: "#f59e0b" },
  { name: "기타", value: 12, color: "#6b7280" },
];

const wasteData = [
  { name: "폐기", value: 8, color: "#ef4444" },
  { name: "소비", value: 43, color: "#10b981" },
];

const avgConsumptionData = [
  { name: "우유", days: 5, category: "유제품" },
  { name: "토마토", days: 3, category: "채소" },
  { name: "계란", days: 12, category: "기타" },
  { name: "양파", days: 14, category: "채소" },
  { name: "닭가슴살", days: 4, category: "육류" },
];

const weeklyPatternData = [
  { day: "월", count: 3 },
  { day: "화", count: 5 },
  { day: "수", count: 4 },
  { day: "목", count: 6 },
  { day: "금", count: 8 },
  { day: "토", count: 12 },
  { day: "일", count: 10 },
];

export default function StatisticsPage() {
  const totalItems = storageData.reduce((sum, item) => sum + item.value, 0);
  const expiringToday = 3;
  const expiringSoon = 7;

  return (
    <div className={`relative min-h-screen bg-[#FAFAF5] ${PAGE_VERTICAL_SPACE}`}>
      {/* 헤더 */}
      <div className={`${SECTION_PADDING} mb-6`}>
        <h1 className="text-2xl font-bold text-gray-800">통계</h1>
        <p className="text-sm text-gray-500 mt-1">식재료 관리 현황을 한눈에 확인하세요</p>
      </div>

      {/* 주요 지표 카드 */}
      <div className={`${SECTION_PADDING} mb-6`}>
        <div className="grid grid-cols-2 gap-3">
          {/* 전체 재고 */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">전체 재고</p>
                <p className="text-2xl font-bold text-gray-800">{totalItems}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </Card>

          {/* 오늘 만료 */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">오늘 만료</p>
                <p className="text-2xl font-bold text-red-600">{expiringToday}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-full">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </Card>

          {/* 임박 만료 */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">임박 만료</p>
                <p className="text-2xl font-bold text-orange-600">{expiringSoon}</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-full">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </Card>

          {/* 쇼핑 목록 */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">쇼핑 목록</p>
                <p className="text-2xl font-bold text-green-600">12</p>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <ShoppingCart className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 보관 위치별 재고 */}
      <div className={`${SECTION_PADDING} mb-6`}>
        <h2 className="text-lg font-bold text-gray-800 mb-3">보관 위치별 재고</h2>
        <div className="grid grid-cols-3 gap-3">
          {storageData.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.name} className="p-4">
                <div className="flex flex-col items-center">
                  <div className="p-3 rounded-full mb-2" style={{ backgroundColor: `${item.color}20` }}>
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{item.name}</p>
                  <p className="text-xl font-bold" style={{ color: item.color }}>{item.value}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 자주 버리는 식재료 TOP 5 */}
      <div className={`${SECTION_PADDING} mb-6`}>
        <h2 className="text-lg font-bold text-gray-800 mb-3">자주 버리는 식재료 TOP 5</h2>
        <Card className="p-4">
          <div className="space-y-3">
            {mostWastedData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600 text-xs font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-800">{item.name}</span>
                    <span className="text-xs text-gray-500">{item.category}</span>
                  </div>
                  <div className="mt-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 rounded-full"
                      style={{ width: `${(item.count / mostWastedData[0].count) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-bold text-red-600">{item.count}회</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 자주 구매하는 식재료 TOP 5 */}
      <div className={`${SECTION_PADDING} mb-6`}>
        <h2 className="text-lg font-bold text-gray-800 mb-3">자주 구매하는 식재료 TOP 5</h2>
        <Card className="p-4">
          <div className="space-y-3">
            {mostPurchasedData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-800">{item.name}</span>
                    <span className="text-xs text-gray-500">{item.category}</span>
                  </div>
                  <div className="mt-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(item.count / mostPurchasedData[0].count) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-bold text-blue-600">{item.count}회</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 평균 소비 기간 */}
      <div className={`${SECTION_PADDING} mb-6`}>
        <h2 className="text-lg font-bold text-gray-800 mb-3">평균 소비 기간</h2>
        <Card className="p-4">
          <div className="space-y-3">
            {avgConsumptionData.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-800">{item.name}</span>
                    <span className="text-xs text-gray-500">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                        style={{ width: `${Math.min((item.days / 14) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-700">{item.days}일</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 요일별 소비 패턴 */}
      <div className={`${SECTION_PADDING} mb-6`}>
        <h2 className="text-lg font-bold text-gray-800 mb-3">요일별 소비 패턴</h2>
        <Card className="p-4">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyPatternData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-center text-gray-500 mt-3">
            주말에 소비가 가장 많아요
          </p>
        </Card>
      </div>

      {/* 카테고리별 분포 & 폐기율 */}
      <div className={`${SECTION_PADDING} mb-6`}>
        <div className="grid grid-cols-2 gap-3">
          {/* 카테고리별 분포 */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-3">카테고리별</h3>
            <Card className="p-4 relative">
              <div className="flex items-center justify-center z-10 w-full h-full bg-black/50 absolute top-0 left-0 rounded-xl backdrop-blur-xs">
                <span className="text-center text-2xl font-bold text-white">
                  Coming Soon
                </span>
              </div>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {categoryData.map((item) => (
                  <div key={item.name} className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-xs text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* 폐기율 */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-3">이번 달 폐기율</h3>
            <Card className="p-4">
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={wasteData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    dataKey="value"
                  >
                    {wasteData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center mt-3">
                <p className="text-2xl font-bold text-red-600">15.7%</p>
                <p className="text-xs text-gray-500">폐기율</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* 인사이트 카드 */}
      <div className={`${SECTION_PADDING} mb-6`}>
        <h2 className="text-lg font-bold text-gray-800 mb-3">인사이트</h2>
        <div className="space-y-3">
          <Card className="p-4 border-l-4 border-l-green-500">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-50 rounded-full">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">효율적인 관리</p>
                <p className="text-xs text-gray-600 mt-1">
                  지난달 대비 폐기율이 5% 감소했어요!
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-l-4 border-l-orange-500">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-orange-50 rounded-full">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">주의 필요</p>
                <p className="text-xs text-gray-600 mt-1">
                  3일 내 만료 예정 식재료가 7개 있어요.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}