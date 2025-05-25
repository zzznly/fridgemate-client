import React from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

// Magic numbers/strings as named constants
const SECTION_PADDING = "px-5";
const PAGE_VERTICAL_SPACE = "space-y-6 py-16";
const FAMILY_GROUP = {
  invitation: "abc123",
  members: ["Mom"],
};
const ACCOUNT = {
  name: "dotori",
};
const NOTIFICATIONS = [
  { label: "Expiration Data Notations", checked: true },
  { label: "Real-time Notifications", checked: true },
];

function FamilyGroupSection() {
  return (
    <section className="bg-white rounded-xl shadow p-4 mb-4">
      <div className="font-bold mb-2">Family Group</div>
      <div className="flex justify-between items-center mb-2">
        <span>Invitation</span>
        <span className="text-gray-500">{FAMILY_GROUP.invitation}</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Members</span>
        <span className="text-gray-500">{FAMILY_GROUP.members.join(", ")}</span>
      </div>
      <Button variant="ghost" className="p-0 h-auto text-green-700 font-semibold mt-2">Invite</Button>
    </section>
  );
}

function AccountSection() {
  return (
    <section className="bg-white rounded-xl shadow p-4 mb-4">
      <div className="font-bold mb-2">Account</div>
      <div className="flex justify-between items-center">
        <span>Name</span>
        <span className="text-gray-500">{ACCOUNT.name}</span>
      </div>
    </section>
  );
}

function NotificationSection() {
  return (
    <section className="bg-white rounded-xl shadow p-4 mb-4">
      <div className="font-bold mb-2">Notifications</div>
      {NOTIFICATIONS.map((item) => (
        <div key={item.label} className="flex justify-between items-center mb-2 last:mb-0">
          <span>{item.label}</span>
          <Switch checked={item.checked} />
        </div>
      ))}
    </section>
  );
}

export default function SettingsPage() {
  return (
    <div className={`relative min-h-screen bg-[#FAFAF5] ${PAGE_VERTICAL_SPACE}`}>
      <div className={SECTION_PADDING}>
        <FamilyGroupSection />
        <AccountSection />
        <NotificationSection />
        {/* 로그아웃 버튼 및 기타 하단 메뉴 */}
        <div className="flex flex-col gap-2 mt-8">
          <Button variant="outline" className="w-full">Log out</Button>
        </div>
      </div>
    </div>
  );
} 