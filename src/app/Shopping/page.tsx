"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Check, Plus, X, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

// Magic numbers and classNames as named constants
const TABS = [
  { value: "pending", label: "구매 예정" },
  { value: "completed", label: "구매 완료" },
  { value: "all", label: "전체" },
];
const ADD_ITEM_BUTTON_CLASS =
  "w-full mt-5 bg-green-700 text-white font-semibold";
const CARD_SECTION_CLASS = "px-4 flex flex-col items-center gap-1";
const CARD_TITLE_CLASS = "text-md font-bold";
const CARD_SUBTITLE_CLASS = "text-xs text-gray-500";
const SECTION_PADDING = "px-5";
const TOP_PADDING = "pt-20";
const SEPARATOR_CLASS = "my-10 w-lg";
const DATE_PICKER_BUTTON_CLASS =
  "w-[280px] justify-start text-left font-normal w-full col-span-2";
const SHOPPING_ITEMS = [
  { title: "된장찌개 밀키트", quantity: 1 },
  // ...add more items as needed
];

export default function ShoppingPage() {
  return (
    <div className={`min-h-screen bg-[#FAFAF5] ${TOP_PADDING}`}>
      {/* Tabs Section */}
      <section className={SECTION_PADDING}>
        <Tabs className="w-full" defaultValue={TABS[0].value}>
          <TabsList>
            {TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </section>

      {/* Add Item Dialog Section */}
      <section className={SECTION_PADDING}>
        <AddItemDialog />
      </section>

      {/* Shopping Items Section */}
      <section className={`${SECTION_PADDING} mt-5`}>
        {SHOPPING_ITEMS.map((item) => (
          <ShoppingCard
            key={item.title}
            title={item.title}
            quantity={item.quantity}
          />
        ))}
      </section>

      <Separator className={SEPARATOR_CLASS} />

      {/* Today's Shopping Section */}
      <section className={SECTION_PADDING}>
        <div className="font-bold mb-2">오늘의 쇼핑</div>
      </section>
    </div>
  );
}

function AddItemDialog() {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState<Date>();

  // Named condition for disabling past dates
  const isPastDate = (date: Date) => date < new Date();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className={ADD_ITEM_BUTTON_CLASS}>
          <Plus className="w-4 h-4" />
          <span>항목 추가</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>보관할 식재료 추가</DialogTitle>
          <DialogDescription>
            새롭게 구매한 식재료를 신규 추가해주세요.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-3">
          <div className="grid grid-cols-3 gap-2">
            <Label htmlFor="foodName" className="col-span-1">
              식재료 이름
            </Label>
            <Input
              id="foodName"
              placeholder="식재료 이름 (ex. 계란)"
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              className="col-span-2"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Label htmlFor="quantity" className="col-span-1">
              수량
            </Label>
            <QuantityInput value={quantity} setValue={setQuantity} min={1} />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Label htmlFor="expirationDate" className="col-span-1">
              유통기한
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    DATE_PICKER_BUTTON_CLASS,
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date ? format(date, "yyyy-MM-dd") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={isPastDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="flex-1"
              >
                닫기
              </Button>
              <Button
                type="button"
                variant="default"
                size="lg"
                className="flex-1 bg-green-700"
              >
                추가
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function QuantityInput({
  value,
  setValue,
  min = 1,
  max = 99,
}: {
  value: number;
  setValue: (v: number) => void;
  min?: number;
  max?: number;
}) {
  const canDecrement = value > min;
  const canIncrement = value < max;

  return (
    <div className="flex items-center gap-2 col-span-2">
      <Button
        type="button"
        size="icon"
        variant="outline"
        onClick={() => canDecrement && setValue(value - 1)}
        disabled={!canDecrement}
        aria-label="수량 감소"
      >
        <Minus />
      </Button>
      <span className="w-8 text-center">{value}</span>
      <Button
        type="button"
        size="icon"
        variant="outline"
        onClick={() => canIncrement && setValue(value + 1)}
        disabled={!canIncrement}
        aria-label="수량 증가"
      >
        <Plus />
      </Button>
    </div>
  );
}

function ShoppingCard({
  title,
  quantity,
}: {
  title: string;
  quantity: number;
}) {
  return (
    <Card>
      <div className={CARD_SECTION_CLASS}>
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col">
            <span className={CARD_TITLE_CLASS}>{title}</span>
            <span className={CARD_SUBTITLE_CLASS}>수량: {quantity}</span>
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              size="icon"
              className="bg-green-100 hover:bg-green-200 shadow-none"
            >
              <span className="sr-only">Copy</span>
              <Check className="w-4 h-4" color="green" />
            </Button>
            <Button
              type="submit"
              size="icon"
              className="bg-red-100 hover:bg-red-200 shadow-none"
            >
              <span className="sr-only">Copy</span>
              <X className="w-4 h-4" color="red" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
