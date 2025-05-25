import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";

// Magic numbers/strings as named constants
const SECTION_PADDING = "px-5";
const PAGE_VERTICAL_SPACE = "space-y-6 pt-20";
const TAB_LIST = [
  { value: "all", label: "전체" },
  { value: "expiring", label: "유통기한 임박" },
  { value: "sort", label: "정렬" },
];

const FRIDGE_ITEMS = [
  {
    name: "Eggs",
    quantity: "2",
    desc: "Quantity: 1 dozen",
    dDay: "D-1",
  },
  {
    name: "Milk",
    quantity: "1",
    desc: "Quantity: 1 gallon",
    dDay: "D-3",
  },
];

const STATISTICS = [
  { label: "Haru", date: "05/23/2025" },
  { label: "Mom", date: "05/29/2025" },
  { label: "Dad", date: "05/24/2025" },
];

function FridgeInventoryTabs() {
  return (
    <Tabs className="w-full" defaultValue={TAB_LIST[0].value}>
      <TabsList>
        {TAB_LIST.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

function AllUsedUpButton() {
  return (
    <Button
      className="w-full bg-red-500 rounded-lg py-2 mt-4"
      size="lg"
      disabled
    >
      <Check className="w-4 h-4" />
      <span className="text-white font-semibold">전체 사용 완료</span>
    </Button>
  );
}

function StatisticsTable() {
  return (
    <div className="mt-6">
      <div className="font-bold mb-2">통계</div>
      <table className="w-full text-sm">
        <tbody>
          {STATISTICS.map((row) => (
            <tr key={row.label} className="border-b last:border-0">
              <td className="py-2 font-semibold text-gray-700">{row.label}</td>
              <td className="py-2 text-right text-gray-500">{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function FridgePage() {
  return (
    <div
      className={`relative min-h-screen bg-[#FAFAF5] ${PAGE_VERTICAL_SPACE}`}
    >
      <section className={SECTION_PADDING}>
        <FridgeInventoryTabs />
      </section>

      <section className={SECTION_PADDING}>
        <ul className="space-y-2">
          {FRIDGE_ITEMS.map((item) => (
            <Card key={item.name}>
              <div className="px-4 flex flex-col gap-1">
                <div className="flex justify-between w-full">
                  <span className="font-bold">{item.name}</span>
                  <span className="text-xs text-gray-500">{item.dDay}</span>
                </div>
                <span className="text-xs text-gray-400">{item.desc}</span>
              </div>
            </Card>
          ))}
        </ul>
        <AllUsedUpButton />
      </section>

      <section className={SECTION_PADDING}>
        <StatisticsTable />
      </section>
    </div>
  );
}
