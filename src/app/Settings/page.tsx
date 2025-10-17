"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Bell,
  Users,
  User,
  ChevronRight,
  Copy,
  Check,
  LogOut,
  Trash2,
  HelpCircle,
  Shield,
  Clock,
  Mail,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const SECTION_PADDING = "px-5";
const TOP_PADDING = "pt-20 pb-24";

// 임시 데이터
const FAMILY_GROUP = {
  name: "다람쥐 가족",
  invitationCode: "ABC123XYZ",
  members: [
    { id: "1", name: "엄마", email: "mom@example.com", role: "owner" },
    { id: "2", name: "아빠", email: "dad@example.com", role: "member" },
    { id: "3", name: "나", email: "me@example.com", role: "member" },
  ],
};

const USER_ACCOUNT = {
  name: "도토리",
  email: "dotori@example.com",
  joinDate: "2024.01.15",
};

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    expirationAlert: true,
    dailySummary: false,
    shoppingReminder: true,
    wasteAlert: true,
  });
  const [expirationDays, setExpirationDays] = useState(3);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [inviteCodeCopied, setInviteCodeCopied] = useState(false);

  const handleCopyInviteCode = () => {
    navigator.clipboard.writeText(FAMILY_GROUP.invitationCode);
    setInviteCodeCopied(true);
    setTimeout(() => setInviteCodeCopied(false), 2000);
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={`min-h-screen bg-[#FAFAF5] ${TOP_PADDING}`}>
      {/* 헤더 */}
      <section className={`${SECTION_PADDING} mb-6`}>
        <h1 className="text-2xl font-bold text-gray-800">설정</h1>
        <p className="text-sm text-gray-500 mt-1">앱 설정 및 계정 관리</p>
      </section>

      <div className={SECTION_PADDING}>
        {/* 계정 정보 */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">계정</h2>
          <Card className="p-4">
            <button
              onClick={() => setProfileDialogOpen(true)}
              className="w-full flex items-center justify-between hover:bg-gray-50 transition-colors rounded-lg p-2 -m-2"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-green-700" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-800">{USER_ACCOUNT.name}</p>
                  <p className="text-xs text-gray-500">{USER_ACCOUNT.email}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </Card>
        </div>

        {/* 가족 그룹 */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">가족 그룹</h2>
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-600" />
                <span className="font-semibold text-gray-800">{FAMILY_GROUP.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {FAMILY_GROUP.members.length}명
                </Badge>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setInviteDialogOpen(true)}
                className="text-green-700 border-green-300 hover:bg-green-50"
              >
                초대
              </Button>
            </div>

            <div className="space-y-2">
              {FAMILY_GROUP.members.slice(0, 3).map((member) => (
                <div key={member.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.email}</p>
                    </div>
                  </div>
                  {member.role === "owner" && (
                    <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-700">
                      그룹장
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* 알림 설정 */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">알림</h2>
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">유통기한 알림</p>
                    <p className="text-xs text-gray-500">만료 임박 시 알림</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.expirationAlert}
                  onCheckedChange={() => handleNotificationToggle("expirationAlert")}
                />
              </div>

              {notifications.expirationAlert && (
                <div className="ml-7 pl-4 border-l-2 border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">알림 시점</span>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 px-2"
                        onClick={() => setExpirationDays(Math.max(1, expirationDays - 1))}
                      >
                        -
                      </Button>
                      <span className="text-sm font-semibold w-12 text-center">
                        {expirationDays}일 전
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 px-2"
                        onClick={() => setExpirationDays(Math.min(7, expirationDays + 1))}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">일일 요약</p>
                    <p className="text-xs text-gray-500">매일 아침 재고 현황</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.dailySummary}
                  onCheckedChange={() => handleNotificationToggle("dailySummary")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">쇼핑 리마인더</p>
                    <p className="text-xs text-gray-500">구매 예정 항목 알림</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.shoppingReminder}
                  onCheckedChange={() => handleNotificationToggle("shoppingReminder")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Trash2 className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">폐기율 경고</p>
                    <p className="text-xs text-gray-500">폐기율 증가 시 알림</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.wasteAlert}
                  onCheckedChange={() => handleNotificationToggle("wasteAlert")}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* 기타 */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">기타</h2>
          <Card className="p-4">
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between py-2 hover:bg-gray-50 transition-colors rounded-lg px-2 -mx-2">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-800">도움말</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between py-2 hover:bg-gray-50 transition-colors rounded-lg px-2 -mx-2">
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-800">개인정보 처리방침</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <div className="flex items-center justify-between py-2 px-2">
                <span className="text-sm text-gray-500">버전</span>
                <span className="text-sm text-gray-600">1.0.0</span>
              </div>
            </div>
          </Card>
        </div>

        {/* 로그아웃 */}
        <div className="mb-6">
          <Button
            variant="outline"
            className="w-full text-red-600 border-red-300 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            로그아웃
          </Button>
        </div>

        {/* 회원탈퇴 */}
        <div className="text-center">
          <button className="text-xs text-gray-400 hover:text-gray-600 underline">
            회원탈퇴
          </button>
        </div>
      </div>

      {/* 초대 다이얼로그 */}
      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>가족 그룹 초대</DialogTitle>
            <DialogDescription>
              초대 코드를 공유하여 가족을 그룹에 초대하세요
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                초대 코드
              </label>
              <div className="flex items-center gap-2">
                <Input
                  value={FAMILY_GROUP.invitationCode}
                  readOnly
                  className="font-mono text-lg tracking-wider text-center"
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleCopyInviteCode}
                  className={cn(
                    inviteCodeCopied && "bg-green-50 border-green-300"
                  )}
                >
                  {inviteCodeCopied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                이 코드는 7일간 유효합니다
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-800">
                💡 초대받은 사람은 앱에서 &ldquo;그룹 참여하기&rdquo;를 선택한 후 이 코드를 입력하면 됩니다.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" onClick={() => setInviteDialogOpen(false)}>
              닫기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 프로필 다이얼로그 */}
      <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>프로필</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-green-700" />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                이름
              </label>
              <Input value={USER_ACCOUNT.name} />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                이메일
              </label>
              <Input value={USER_ACCOUNT.email} disabled className="bg-gray-50" />
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">가입일</span>
                <span className="text-gray-800 font-medium">{USER_ACCOUNT.joinDate}</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setProfileDialogOpen(false)}>
              취소
            </Button>
            <Button type="button" className="bg-green-700 hover:bg-green-800">
              저장
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
