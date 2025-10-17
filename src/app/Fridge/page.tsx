"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Refrigerator,
  Snowflake,
  Home,
  Plus,
  Minus,
  Trash2,
  Search,
  SlidersHorizontal,
  CalendarIcon,
  AlertTriangle,
  Clock,
  ChevronDown,
  ChevronUp,
  Package,
  X,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const SECTION_PADDING = "px-5";
const TOP_PADDING = "pt-20 pb-24";

interface FridgeItem {
  id: string;
  name: string;
  quantity: number;
  storageLocation: "냉장" | "냉동" | "실온";
  expirationDate?: Date;
  category?: string;
  memo?: string;
  isExpanded?: boolean;
}

type SortType = "expiration" | "name" | "recent";

// 임시 데이터
const INITIAL_ITEMS: FridgeItem[] = [
  {
    id: "1",
    name: "우유",
    quantity: 2,
    storageLocation: "냉장",
    expirationDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    category: "유제품",
  },
  {
    id: "2",
    name: "계란",
    quantity: 12,
    storageLocation: "냉장",
    expirationDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    category: "기타",
  },
  {
    id: "3",
    name: "토마토",
    quantity: 3,
    storageLocation: "냉장",
    expirationDate: new Date(Date.now()),
    category: "채소",
  },
  {
    id: "4",
    name: "닭가슴살",
    quantity: 5,
    storageLocation: "냉동",
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    category: "육류",
  },
  {
    id: "5",
    name: "양파",
    quantity: 4,
    storageLocation: "실온",
    expirationDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    category: "채소",
  },
];

export default function FridgePage() {
  const [activeTab, setActiveTab] = useState<"전체" | "냉장" | "냉동" | "실온">("전체");
  const [items, setItems] = useState<FridgeItem[]>(INITIAL_ITEMS);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState<SortType>("expiration");

  // 필터링 및 정렬
  const filteredAndSortedItems = items
    .filter((item) => {
      // 탭 필터
      if (activeTab !== "전체" && item.storageLocation !== activeTab) {
        return false;
      }
      // 검색 필터
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortType) {
        case "expiration":
          if (!a.expirationDate) return 1;
          if (!b.expirationDate) return -1;
          return a.expirationDate.getTime() - b.expirationDate.getTime();
        case "name":
          return a.name.localeCompare(b.name, "ko");
        case "recent":
          return b.id.localeCompare(a.id);
        default:
          return 0;
      }
    });

  // 유통기한 임박 통계
  const getExpirationStats = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const expiringToday = items.filter(item => {
      if (!item.expirationDate) return false;
      const expDate = new Date(item.expirationDate);
      expDate.setHours(0, 0, 0, 0);
      return expDate.getTime() === today.getTime();
    }).length;

    const expiringSoon = items.filter(item => {
      if (!item.expirationDate) return false;
      const expDate = new Date(item.expirationDate);
      expDate.setHours(0, 0, 0, 0);
      const diffDays = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays > 0 && diffDays <= 3;
    }).length;

    return { expiringToday, expiringSoon };
  };

  const { expiringToday, expiringSoon } = getExpirationStats();

  // 보관 위치별 개수
  const getCountByLocation = (location: "냉장" | "냉동" | "실온") => {
    return items.filter(item => item.storageLocation === location).length;
  };

  const handleAddItem = () => {
    const newItem: FridgeItem = {
      id: Date.now().toString(),
      name: "",
      quantity: 1,
      storageLocation: activeTab === "전체" ? "냉장" : activeTab as "냉장" | "냉동" | "실온",
      isExpanded: true,
    };
    setItems([newItem, ...items]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleUpdateItem = (id: string, updatedItem: Partial<FridgeItem>) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, ...updatedItem } : item
    ));
  };

  const handleQuickUse = (id: string) => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    if (item.quantity <= 1) {
      handleRemoveItem(id);
    } else {
      handleUpdateItem(id, { quantity: item.quantity - 1 });
    }
  };

  const handleDiscard = (id: string) => {
    // TODO: 폐기 통계에 기록
    handleRemoveItem(id);
  };

  return (
    <div className={`min-h-screen bg-[#FAFAF5] ${TOP_PADDING}`}>
      {/* 헤더 */}
      <section className={`${SECTION_PADDING} mb-4`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">냉장고</h1>
            <p className="text-sm text-gray-500 mt-1">
              {items.length}개 식재료 보관 중
            </p>
          </div>
          <Button
            size="lg"
            className="bg-green-700 hover:bg-green-800 text-white"
            onClick={handleAddItem}
          >
            <Plus className="w-4 h-4 mr-1" />
            추가
          </Button>
        </div>

        {/* 긴급 알림 */}
        {(expiringToday > 0 || expiringSoon > 0) && (
          <div className="space-y-2 mb-4">
            {expiringToday > 0 && (
              <Card className="p-3 bg-red-50 border-red-200">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <p className="text-sm text-red-700">
                    <strong>{expiringToday}개</strong> 식재료가 오늘 만료돼요!
                  </p>
                </div>
              </Card>
            )}
            {expiringSoon > 0 && (
              <Card className="p-3 bg-orange-50 border-orange-200">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <p className="text-sm text-orange-700">
                    <strong>{expiringSoon}개</strong> 식재료가 3일 내 만료돼요
                  </p>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* 검색 및 정렬 */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="식재료 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40" align="end">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-700 mb-2">정렬 기준</p>
                <Button
                  variant={sortType === "expiration" ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setSortType("expiration")}
                >
                  유통기한 순
                </Button>
                <Button
                  variant={sortType === "name" ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setSortType("name")}
                >
                  이름 순
                </Button>
                <Button
                  variant={sortType === "recent" ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setSortType("recent")}
                >
                  최근 등록 순
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </section>

      {/* Tabs */}
      <section className={SECTION_PADDING}>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="전체" className="flex-1">
              <Package className="w-3 h-3 mr-1" />
              전체
              <Badge variant="secondary" className="ml-2 bg-gray-100">
                {items.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="냉장" className="flex-1">
              <Refrigerator className="w-3 h-3 mr-1" />
              냉장
              <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700">
                {getCountByLocation("냉장")}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="냉동" className="flex-1">
              <Snowflake className="w-3 h-3 mr-1" />
              냉동
              <Badge variant="secondary" className="ml-2 bg-purple-100 text-purple-700">
                {getCountByLocation("냉동")}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="실온" className="flex-1">
              <Home className="w-3 h-3 mr-1" />
              실온
              <Badge variant="secondary" className="ml-2 bg-orange-100 text-orange-700">
                {getCountByLocation("실온")}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </section>

      {/* Items List */}
      <section className={`${SECTION_PADDING} mt-5`}>
        {filteredAndSortedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Package className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-400 text-sm">
              {searchQuery ? "검색 결과가 없어요" : "등록된 식재료가 없어요"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAndSortedItems.map((item) => (
              <FridgeItemCard
                key={item.id}
                item={item}
                onRemove={() => handleRemoveItem(item.id)}
                onUpdate={(updatedItem) => handleUpdateItem(item.id, updatedItem)}
                onQuickUse={() => handleQuickUse(item.id)}
                onDiscard={() => handleDiscard(item.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function FridgeItemCard({
  item,
  onRemove,
  onUpdate,
  onQuickUse,
  onDiscard,
}: {
  item: FridgeItem;
  onRemove: () => void;
  onUpdate: (item: Partial<FridgeItem>) => void;
  onQuickUse: () => void;
  onDiscard: () => void;
}) {
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);
  const [expirationDate, setExpirationDate] = useState<Date | undefined>(item.expirationDate);
  const [storageLocation, setStorageLocation] = useState<"냉장" | "냉동" | "실온">(item.storageLocation);
  const [isExpanded, setIsExpanded] = useState(item.isExpanded || false);
  const [isNameEditing, setIsNameEditing] = useState(!item.name);

  // D-day 계산
  const getDDay = () => {
    if (!expirationDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expDate = new Date(expirationDate);
    expDate.setHours(0, 0, 0, 0);
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const dDay = getDDay();

  // D-day 색상
  const getDDayColor = () => {
    if (dDay === null) return "text-gray-500";
    if (dDay < 0) return "text-gray-400"; // 만료됨
    if (dDay === 0) return "text-red-600"; // 오늘
    if (dDay <= 3) return "text-orange-600"; // 임박
    return "text-gray-600";
  };

  const getDDayBadgeVariant = () => {
    if (dDay === null) return "outline";
    if (dDay < 0) return "outline";
    if (dDay === 0) return "destructive";
    if (dDay <= 3) return "outline";
    return "outline";
  };

  const getDDayText = () => {
    if (dDay === null) return "미설정";
    if (dDay < 0) return `D+${Math.abs(dDay)}`;
    if (dDay === 0) return "D-Day";
    return `D-${dDay}`;
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleNameChange = (newName: string) => {
    setName(newName);
    onUpdate({ name: newName });
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    onUpdate({ quantity: newQuantity });
  };

  const handleDateChange = (date: Date | undefined) => {
    setExpirationDate(date);
    onUpdate({ expirationDate: date });
  };

  const handleStorageChange = (location: "냉장" | "냉동" | "실온") => {
    setStorageLocation(location);
    onUpdate({ storageLocation: location });
  };

  const getStorageIcon = () => {
    switch (storageLocation) {
      case "냉장": return <Refrigerator className="w-3 h-3" />;
      case "냉동": return <Snowflake className="w-3 h-3" />;
      case "실온": return <Home className="w-3 h-3" />;
    }
  };

  const getStorageColor = () => {
    switch (storageLocation) {
      case "냉장": return "bg-blue-100 text-blue-700";
      case "냉동": return "bg-purple-100 text-purple-700";
      case "실온": return "bg-orange-100 text-orange-700";
    }
  };

  return (
    <Card className={cn(
      "shadow-sm hover:shadow-md transition-all",
      !item.name && "border-2 border-green-500",
      dDay !== null && dDay === 0 && "border-l-4 border-l-red-500"
    )}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          {/* 이름 */}
          <div className="flex-1">
            {isNameEditing ? (
              <Input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                onBlur={() => setIsNameEditing(false)}
                placeholder="식재료 이름을 입력하세요"
                className={cn("font-semibold", !name && "border-yellow-400")}
                autoFocus
              />
            ) : (
              <h3
                className="font-semibold text-gray-800 cursor-pointer hover:text-gray-600 transition-colors"
                onClick={() => setIsNameEditing(true)}
              >
                {name || "식재료 이름을 입력하세요"}
              </h3>
            )}

            {/* 간단 정보 - 접혀있을 때 */}
            {!isExpanded && name && (
              <div className="flex items-center gap-2 mt-1 text-xs">
                <Badge variant="secondary" className={cn("text-xs", getStorageColor())}>
                  {getStorageIcon()}
                  <span className="ml-1">{storageLocation}</span>
                </Badge>
                <span className="text-gray-500">수량 {quantity}</span>
                {expirationDate && (
                  <>
                    <span className="text-gray-400">•</span>
                    <Badge variant={getDDayBadgeVariant()} className={cn("text-xs", getDDayColor())}>
                      {getDDayText()}
                    </Badge>
                  </>
                )}
              </div>
            )}
          </div>

          {/* 빠른 액션 버튼 */}
          {!isExpanded && name && (
            <div className="flex items-center gap-1">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={onQuickUse}
                className="flex-shrink-0 text-green-600 hover:text-green-700 hover:bg-green-50"
              >
                <Minus className="w-3 h-3 mr-1" />
                사용
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={onDiscard}
                className={cn(
                  "flex-shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50",
                  dDay !== null && dDay <= 0 && "border-red-300"
                )}
              >
                <X className="w-3 h-3 mr-1" />
                폐기
              </Button>
            </div>
          )}

          {/* 삭제 버튼 */}
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={onRemove}
            className="flex-shrink-0 h-8 w-8 text-gray-400 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {/* 상세 정보 - 펼쳐진 경우만 */}
        {isExpanded && (
          <div className="space-y-3 mt-4">
            {/* 보관 위치 */}
            <div>
              <span className="text-sm text-gray-600 block mb-2">보관 위치</span>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={storageLocation === "냉장" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStorageChange("냉장")}
                  className={cn(
                    "h-8",
                    storageLocation === "냉장" && "bg-blue-600 hover:bg-blue-700"
                  )}
                >
                  <Refrigerator className="w-3 h-3 mr-1" />
                  <span className="text-xs">냉장</span>
                </Button>
                <Button
                  type="button"
                  variant={storageLocation === "냉동" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStorageChange("냉동")}
                  className={cn(
                    "h-8",
                    storageLocation === "냉동" && "bg-purple-600 hover:bg-purple-700"
                  )}
                >
                  <Snowflake className="w-3 h-3 mr-1" />
                  <span className="text-xs">냉동</span>
                </Button>
                <Button
                  type="button"
                  variant={storageLocation === "실온" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStorageChange("실온")}
                  className={cn(
                    "h-8",
                    storageLocation === "실온" && "bg-orange-600 hover:bg-orange-700"
                  )}
                >
                  <Home className="w-3 h-3 mr-1" />
                  <span className="text-xs">실온</span>
                </Button>
              </div>
            </div>

            {/* 수량 */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">수량</span>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="h-7 w-7"
                  onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="w-8 text-center font-semibold text-sm">{quantity}</span>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="h-7 w-7"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* 유통기한 */}
            <div>
              <span className="text-sm text-gray-600 block mb-2">유통기한</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal h-9 text-sm",
                      !expirationDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-3 w-3" />
                    {expirationDate ? (
                      <span className="flex items-center gap-2">
                        {format(expirationDate, "yyyy년 MM월 dd일")}
                        <Badge variant={getDDayBadgeVariant()} className={cn("text-xs", getDDayColor())}>
                          {getDDayText()}
                        </Badge>
                      </span>
                    ) : (
                      <span>날짜 선택</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={expirationDate}
                    onSelect={handleDateChange}
                    disabled={isPastDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}

        {/* 토글 버튼 */}
        {name && (
          <div className="flex justify-center mt-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-gray-400 hover:text-gray-600 h-6 px-2"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-3 h-3 mr-1" />
                  접기
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3 mr-1" />
                  상세
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
