import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronRight, Copy, Egg, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// Magic numbers as named constants
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

export default function ShoppingPage() {
  // Example shopping items (would come from API or state)
  const shoppingItems = [
    { title: "된장찌개 밀키트", quantity: 1 },
    // ...add more items as needed
  ];

  return (
    <div className="pt-20 min-h-screen bg-[#FAFAF5]">
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
        {shoppingItems.map((item) => (
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
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <Copy />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
          <ChevronRight className="w-4 h-4" color="gray" />
        </div>
      </div>
    </Card>
  );
}
