"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Plus, Minus, X, Refrigerator, Snowflake, Home, Check, ShoppingBasket, Sparkles, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const SECTION_PADDING = "px-5";
const TOP_PADDING = "pt-20 pb-24";

interface ShoppingItem {
  id: string;
  title: string;
  quantity: number;
  isCompleted: boolean;
  isNew?: boolean;
}

interface FridgeItemData {
  name: string;
  quantity: number;
  expirationDate?: Date;
  storageLocation: "냉장" | "냉동" | "실온";
}

// 자주 구매하는 항목 (추천)
const frequentItems = [
  { name: "우유", icon: "🥛" },
  { name: "계란", icon: "🥚" },
  { name: "양파", icon: "🧅" },
  { name: "당근", icon: "🥕" },
];

export default function ShoppingPage() {
  const [activeTab, setActiveTab] = useState<"pending" | "completed">("pending");
  const [items, setItems] = useState<ShoppingItem[]>([
    {
      id: "1",
      title: "된장찌개 밀키트",
      quantity: 1,
      isCompleted: false
    },
    {
      id: "2",
      title: "두부",
      quantity: 2,
      isCompleted: true,
    },
  ]);
  const [itemToMove, setItemToMove] = useState<ShoppingItem | null>(null);

  const pendingItems = items.filter(item => !item.isCompleted);
  const completedItems = items.filter(item => item.isCompleted);
  const displayItems = activeTab === "pending" ? pendingItems : completedItems;

  const handleAddItem = () => {
    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      title: "",
      quantity: 1,
      isCompleted: false,
      isNew: true,
    };
    setItems([newItem, ...items]);
    setActiveTab("pending");
  };

  const handleQuickAdd = (itemName: string) => {
    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      title: itemName,
      quantity: 1,
      isCompleted: false,
      isNew: false,
    };
    setItems([newItem, ...items]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (id: string, updatedItem: Partial<ShoppingItem>) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, ...updatedItem, isNew: false } : item
      )
    );
  };

  const handleToggleComplete = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const handleMoveToFridge = (item: ShoppingItem) => {
    setItemToMove(item);
  };

  const handleConfirmMove = (fridgeData: FridgeItemData) => {
    if (!itemToMove) return;

    // TODO: 실제로는 냉장고 페이지의 상태 관리와 연동 필요
    console.log("냉장고로 이동:", fridgeData);

    // 쇼핑 목록에서 제거
    handleRemoveItem(itemToMove.id);
    setItemToMove(null);
  };

  return (
    <div className={`min-h-screen bg-[#FAFAF5] ${TOP_PADDING}`}>
      {/* 헤더 */}
      <section className={`${SECTION_PADDING} mb-4`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">쇼핑 목록</h1>
            <p className="text-sm text-gray-500 mt-1">
              {pendingItems.length}개 구매 예정
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
      </section>

      {/* 자주 구매하는 항목 - 빈 상태일 때만 표시 */}
      {pendingItems.length === 0 && activeTab === "pending" && (
        <section className={`${SECTION_PADDING} mb-4`}>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-yellow-600" />
            <h3 className="text-sm font-semibold text-gray-700">자주 구매하는 항목</h3>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {frequentItems.map((item) => (
              <Button
                key={item.name}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAdd(item.name)}
                className="flex-shrink-0 border-dashed hover:border-solid hover:border-green-500"
              >
                <span className="mr-1">{item.icon}</span>
                {item.name}
                <Plus className="w-3 h-3 ml-1" />
              </Button>
            ))}
          </div>
        </section>
      )}

      {/* Tabs */}
      <section className={SECTION_PADDING}>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "pending" | "completed")} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="pending" className="flex-1">
              구매 예정
              {pendingItems.length > 0 && (
                <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700">
                  {pendingItems.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex-1">
              구매 완료
              {completedItems.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {completedItems.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </section>

      {/* Shopping Items */}
      <section className={`${SECTION_PADDING} mt-5`}>
        {displayItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <ShoppingBasket className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-400 text-sm">
              {activeTab === "pending" ? "쇼핑 목록이 비어있어요" : "구매 완료된 항목이 없어요"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayItems.map((item) => (
              <ShoppingCard
                key={item.id}
                item={item}
                onRemove={() => handleRemoveItem(item.id)}
                onUpdate={(updatedItem) => handleUpdateItem(item.id, updatedItem)}
                onToggleComplete={() => handleToggleComplete(item.id)}
                onMoveToFridge={item.isCompleted ? () => handleMoveToFridge(item) : undefined}
              />
            ))}
          </div>
        )}
      </section>

      {/* 냉장고로 이동 다이얼로그 */}
      {itemToMove && (
        <MoveToFridgeDialog
          item={itemToMove}
          onClose={() => setItemToMove(null)}
          onConfirm={handleConfirmMove}
        />
      )}
    </div>
  );
}

function ShoppingCard({
  item,
  onRemove,
  onUpdate,
  onToggleComplete,
  onMoveToFridge,
}: {
  item: ShoppingItem;
  onRemove: () => void;
  onUpdate: (item: Partial<ShoppingItem>) => void;
  onToggleComplete: () => void;
  onMoveToFridge?: () => void;
}) {
  const [title, setTitle] = useState(item.title);
  const [totalQuantity, setTotalQuantity] = useState(item.quantity);
  const [isTitleEditing, setIsTitleEditing] = useState(item.isNew || false);
  const [isQuantityEditing, setIsQuantityEditing] = useState(item.isNew || false);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    onUpdate({ title: newTitle });
  };

  const handleQuantityChange = (newQuantity: number) => {
    setTotalQuantity(newQuantity);
    onUpdate({ quantity: newQuantity });
  };

  const handleTitleClick = () => {
    if (!isTitleEditing && !item.isCompleted) {
      setIsTitleEditing(true);
    }
  };

  const handleTitleBlur = () => {
    setIsTitleEditing(false);
    if (item.isNew && title) {
      onUpdate({ isNew: false });
    }
  };

  const handleQuantityClick = () => {
    if (!item.isCompleted) {
      setIsQuantityEditing(true);
    }
  };

  const handleQuantityBlur = () => {
    if (!item.isNew) {
      setIsQuantityEditing(false);
    }
  };

  return (
    <Card className={cn(
      "shadow-sm hover:shadow-md transition-all",
      item.isNew && "border-2 border-green-500",
      item.isCompleted && "opacity-60"
    )}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          {/* 체크박스 */}
          <button
            onClick={onToggleComplete}
            className={cn(
              "flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors mt-1",
              item.isCompleted
                ? "bg-green-600 border-green-600"
                : "border-gray-300 hover:border-green-500"
            )}
          >
            {item.isCompleted && <Check className="w-4 h-4 text-white" />}
          </button>

          {/* 제목 */}
          <div className="flex-1">
            {isTitleEditing ? (
              <Input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                onBlur={handleTitleBlur}
                placeholder="식재료 이름을 입력하세요"
                className={cn(
                  "font-semibold",
                  !title && "border-yellow-400"
                )}
                autoFocus
              />
            ) : (
              <h3
                className={cn(
                  "font-semibold text-gray-800 cursor-pointer hover:text-gray-600 transition-colors",
                  item.isCompleted && "line-through text-gray-500"
                )}
                onClick={handleTitleClick}
              >
                {title || "식재료 이름을 입력하세요"}
              </h3>
            )}

            {/* 수량 정보 - 클릭하면 편집 가능 */}
            {!item.isNew && !item.isCompleted && (
              <div
                className="flex items-center gap-2 mt-1 text-xs text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={handleQuantityClick}
              >
                <span>수량 {totalQuantity} (클릭해서 수정)</span>
              </div>
            )}
            {!item.isNew && item.isCompleted && (
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                <span>수량 {totalQuantity}</span>
              </div>
            )}
          </div>

          {/* 냉장고로 이동 버튼 - 구매 완료된 항목만 */}
          {onMoveToFridge && (
            <Button
              type="button"
              size="sm"
              onClick={onMoveToFridge}
              className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ArrowRight className="w-3 h-3 mr-1" />
              냉장고로
            </Button>
          )}

          {/* 삭제 버튼 */}
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={onRemove}
            className="flex-shrink-0 h-8 w-8 text-gray-400 hover:text-red-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* 수량 조절 - 새 항목이거나 수량 편집 중일 때 */}
        {(item.isNew || isQuantityEditing) && !item.isCompleted && (
          <div className="flex justify-between items-center mt-4 pl-9">
            <span className="text-sm text-gray-600">수량</span>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="h-7 w-7"
                onClick={() => handleQuantityChange(Math.max(1, totalQuantity - 1))}
                disabled={totalQuantity <= 1}
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="w-8 text-center font-semibold text-sm">{totalQuantity}</span>
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="h-7 w-7"
                onClick={() => handleQuantityChange(totalQuantity + 1)}
              >
                <Plus className="w-3 h-3" />
              </Button>
              {!item.isNew && (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={handleQuantityBlur}
                  className="ml-2 text-xs"
                >
                  완료
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

// 냉장고로 이동 다이얼로그
function MoveToFridgeDialog({
  item,
  onClose,
  onConfirm,
}: {
  item: ShoppingItem;
  onClose: () => void;
  onConfirm: (data: FridgeItemData) => void;
}) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [expirationDate, setExpirationDate] = useState<Date | undefined>(undefined);
  const [storageLocation, setStorageLocation] = useState<"냉장" | "냉동" | "실온">("냉장");

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleConfirm = () => {
    onConfirm({
      name: item.title,
      quantity,
      expirationDate,
      storageLocation,
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>냉장고에 등록</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* 식재료 이름 */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              식재료
            </label>
            <p className="text-base font-medium">{item.title}</p>
          </div>

          {/* 보관 위치 */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              보관 위치
            </label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={storageLocation === "냉장" ? "default" : "outline"}
                size="sm"
                onClick={() => setStorageLocation("냉장")}
                className={cn(
                  "flex-1",
                  storageLocation === "냉장" && "bg-blue-600 hover:bg-blue-700"
                )}
              >
                <Refrigerator className="w-3 h-3 mr-1" />
                냉장
              </Button>
              <Button
                type="button"
                variant={storageLocation === "냉동" ? "default" : "outline"}
                size="sm"
                onClick={() => setStorageLocation("냉동")}
                className={cn(
                  "flex-1",
                  storageLocation === "냉동" && "bg-purple-600 hover:bg-purple-700"
                )}
              >
                <Snowflake className="w-3 h-3 mr-1" />
                냉동
              </Button>
              <Button
                type="button"
                variant={storageLocation === "실온" ? "default" : "outline"}
                size="sm"
                onClick={() => setStorageLocation("실온")}
                className={cn(
                  "flex-1",
                  storageLocation === "실온" && "bg-orange-600 hover:bg-orange-700"
                )}
              >
                <Home className="w-3 h-3 mr-1" />
                실온
              </Button>
            </div>
          </div>

          {/* 수량 */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              수량
            </label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* 유통기한 */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              유통기한
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !expirationDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {expirationDate ? format(expirationDate, "yyyy년 MM월 dd일") : <span>날짜 선택</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={expirationDate}
                  onSelect={setExpirationDate}
                  disabled={isPastDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button type="button" onClick={handleConfirm} className="bg-green-700 hover:bg-green-800">
            냉장고에 등록
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
