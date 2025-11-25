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
  UserPlus,
  Settings as SettingsIcon,
  Crown,
  AlertTriangle,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

const SECTION_PADDING = "px-5";
const TOP_PADDING = "pt-20 pb-24";

// 임시 데이터
const INITIAL_FAMILY_GROUP = {
  id: "group-1",
  name: "다람쥐 가족",
  invitationCode: "ABC123XYZ",
  members: [
    { id: "1", name: "엄마", email: "mom@example.com", role: "owner" as const },
    { id: "2", name: "아빠", email: "dad@example.com", role: "member" as const },
    { id: "3", name: "나", email: "me@example.com", role: "member" as const },
  ],
  createdAt: "2024.01.15",
};

const USER_ACCOUNT = {
  id: "3",
  name: "도토리",
  email: "dotori@example.com",
  joinDate: "2024.01.15",
};

type FamilyMember = {
  id: string;
  name: string;
  email: string;
  role: "owner" | "member";
};

type FamilyGroup = {
  id: string;
  name: string;
  invitationCode: string;
  members: FamilyMember[];
  createdAt: string;
} | null;

export default function SettingsPage() {
  // 가족 그룹 관련
  const [familyGroup, setFamilyGroup] = useState<FamilyGroup>(INITIAL_FAMILY_GROUP);
  const [createGroupDialogOpen, setCreateGroupDialogOpen] = useState(false);
  const [joinGroupDialogOpen, setJoinGroupDialogOpen] = useState(false);
  const [manageGroupDialogOpen, setManageGroupDialogOpen] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [inviteCodeCopied, setInviteCodeCopied] = useState(false);
  const [leaveGroupAlertOpen, setLeaveGroupAlertOpen] = useState(false);
  const [deleteGroupAlertOpen, setDeleteGroupAlertOpen] = useState(false);
  const [removeMemberId, setRemoveMemberId] = useState<string | null>(null);

  // 프로필 관련
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

  // 알림 설정
  const [notifications, setNotifications] = useState({
    expirationAlert: true,
    dailySummary: false,
    wasteAlert: true,
  });
  const [expirationDays, setExpirationDays] = useState(3);

  // 유틸리티
  const isGroupOwner = familyGroup?.members.find(m => m.id === USER_ACCOUNT.id)?.role === "owner";

  // 그룹 관련 핸들러
  const handleCreateGroup = (groupName: string) => {
    const newGroup: FamilyGroup = {
      id: `group-${Date.now()}`,
      name: groupName,
      invitationCode: generateInviteCode(),
      members: [
        {
          id: USER_ACCOUNT.id,
          name: USER_ACCOUNT.name,
          email: USER_ACCOUNT.email,
          role: "owner",
        },
      ],
      createdAt: new Date().toLocaleDateString("ko-KR"),
    };
    setFamilyGroup(newGroup);
    setCreateGroupDialogOpen(false);
  };

  const handleJoinGroup = (inviteCode: string) => {
    // TODO: API 연동 - 초대 코드로 그룹 찾기 및 참여
    // 임시로 더미 그룹 생성
    const newGroup: FamilyGroup = {
      id: `group-${Date.now()}`,
      name: "새로운 가족",
      invitationCode: inviteCode,
      members: [
        { id: "owner-1", name: "그룹장", email: "owner@example.com", role: "owner" },
        {
          id: USER_ACCOUNT.id,
          name: USER_ACCOUNT.name,
          email: USER_ACCOUNT.email,
          role: "member",
        },
      ],
      createdAt: new Date().toLocaleDateString("ko-KR"),
    };
    setFamilyGroup(newGroup);
    setJoinGroupDialogOpen(false);
  };

  const handleUpdateGroupName = (newName: string) => {
    if (familyGroup) {
      setFamilyGroup({ ...familyGroup, name: newName });
    }
  };

  const handleRemoveMember = (memberId: string) => {
    if (familyGroup) {
      setFamilyGroup({
        ...familyGroup,
        members: familyGroup.members.filter(m => m.id !== memberId),
      });
    }
    setRemoveMemberId(null);
  };

  const handleLeaveGroup = () => {
    setFamilyGroup(null);
    setLeaveGroupAlertOpen(false);
    setManageGroupDialogOpen(false);
  };

  const handleDeleteGroup = () => {
    setFamilyGroup(null);
    setDeleteGroupAlertOpen(false);
    setManageGroupDialogOpen(false);
  };

  const handleCopyInviteCode = () => {
    if (familyGroup) {
      navigator.clipboard.writeText(familyGroup.invitationCode);
      setInviteCodeCopied(true);
      setTimeout(() => setInviteCodeCopied(false), 2000);
    }
  };

  const generateInviteCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 9; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  // 알림 설정 핸들러
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
          {!familyGroup ? (
            <Card className="p-4">
              <div className="text-center py-4">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-600 mb-4">
                  가족 그룹에 참여하여 함께 냉장고를 관리하세요
                </p>
                <div className="space-y-2">
                  <Button
                    className="w-full bg-green-700 hover:bg-green-800"
                    onClick={() => setCreateGroupDialogOpen(true)}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    새 그룹 만들기
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setJoinGroupDialogOpen(true)}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    그룹 참여하기
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-gray-800">{familyGroup.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {familyGroup.members.length}명
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setInviteDialogOpen(true)}
                    className="text-green-700 border-green-300 hover:bg-green-50"
                  >
                    초대
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setManageGroupDialogOpen(true)}
                  >
                    <SettingsIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                {familyGroup.members.slice(0, 3).map((member) => (
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
                        <Crown className="w-3 h-3 mr-1" />
                        그룹장
                      </Badge>
                    )}
                  </div>
                ))}
              </div>

              {familyGroup.members.length > 3 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2 text-xs text-gray-500"
                  onClick={() => setManageGroupDialogOpen(true)}
                >
                  {familyGroup.members.length - 3}명 더보기
                </Button>
              )}
            </Card>
          )}
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

      {/* 그룹 생성 다이얼로그 */}
      <CreateGroupDialog
        open={createGroupDialogOpen}
        onOpenChange={setCreateGroupDialogOpen}
        onCreateGroup={handleCreateGroup}
      />

      {/* 그룹 참여 다이얼로그 */}
      <JoinGroupDialog
        open={joinGroupDialogOpen}
        onOpenChange={setJoinGroupDialogOpen}
        onJoinGroup={handleJoinGroup}
      />

      {/* 초대 다이얼로그 */}
      {familyGroup && (
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
                    value={familyGroup.invitationCode}
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
      )}

      {/* 그룹 관리 다이얼로그 */}
      {familyGroup && (
        <ManageGroupDialog
          open={manageGroupDialogOpen}
          onOpenChange={setManageGroupDialogOpen}
          familyGroup={familyGroup}
          isOwner={isGroupOwner}
          currentUserId={USER_ACCOUNT.id}
          onUpdateGroupName={handleUpdateGroupName}
          onRemoveMember={(memberId) => setRemoveMemberId(memberId)}
          onLeaveGroup={() => setLeaveGroupAlertOpen(true)}
          onDeleteGroup={() => setDeleteGroupAlertOpen(true)}
        />
      )}

      {/* 멤버 추방 확인 AlertDialog */}
      <AlertDialog open={!!removeMemberId} onOpenChange={() => setRemoveMemberId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>멤버 추방</AlertDialogTitle>
            <AlertDialogDescription>
              정말로 이 멤버를 그룹에서 추방하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => removeMemberId && handleRemoveMember(removeMemberId)}
              className="bg-red-600 hover:bg-red-700"
            >
              추방
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 그룹 탈퇴 확인 AlertDialog */}
      <AlertDialog open={leaveGroupAlertOpen} onOpenChange={setLeaveGroupAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>그룹 탈퇴</AlertDialogTitle>
            <AlertDialogDescription>
              정말로 이 그룹에서 탈퇴하시겠습니까? 다시 참여하려면 새로운 초대 코드가 필요합니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLeaveGroup}
              className="bg-red-600 hover:bg-red-700"
            >
              탈퇴
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 그룹 삭제 확인 AlertDialog */}
      <AlertDialog open={deleteGroupAlertOpen} onOpenChange={setDeleteGroupAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                그룹 삭제
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription>
              정말로 이 그룹을 삭제하시겠습니까? 모든 멤버가 그룹에서 제거되며, 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteGroup}
              className="bg-red-600 hover:bg-red-700"
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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

// 그룹 생성 다이얼로그 컴포넌트
function CreateGroupDialog({
  open,
  onOpenChange,
  onCreateGroup,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateGroup: (groupName: string) => void;
}) {
  const [groupName, setGroupName] = useState("");

  const handleSubmit = () => {
    if (groupName.trim()) {
      onCreateGroup(groupName.trim());
      setGroupName("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>새 가족 그룹 만들기</DialogTitle>
          <DialogDescription>
            가족과 함께 사용할 그룹을 만들어보세요
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              그룹 이름
            </label>
            <Input
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="예: 김가네 가족"
              maxLength={20}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
            />
            <p className="text-xs text-gray-500 mt-1">
              {groupName.length}/20
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-xs text-green-800">
              💡 그룹을 만들면 초대 코드가 생성됩니다. 가족들에게 코드를 공유하여 초대하세요!
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!groupName.trim()}
            className="bg-green-700 hover:bg-green-800"
          >
            만들기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// 그룹 참여 다이얼로그 컴포넌트
function JoinGroupDialog({
  open,
  onOpenChange,
  onJoinGroup,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onJoinGroup: (inviteCode: string) => void;
}) {
  const [inviteCode, setInviteCode] = useState("");

  const handleSubmit = () => {
    if (inviteCode.trim().length >= 6) {
      onJoinGroup(inviteCode.trim());
      setInviteCode("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>가족 그룹 참여하기</DialogTitle>
          <DialogDescription>
            초대 코드를 입력하여 가족 그룹에 참여하세요
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              초대 코드
            </label>
            <Input
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
              placeholder="ABC123XYZ"
              className="font-mono text-lg tracking-wider text-center"
              maxLength={9}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
            />
            <p className="text-xs text-gray-500 mt-1">
              9자리 초대 코드를 입력하세요
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-800">
              💡 그룹장에게 초대 코드를 받아 입력하세요
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={inviteCode.trim().length < 6}
            className="bg-green-700 hover:bg-green-800"
          >
            참여하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// 그룹 관리 다이얼로그 컴포넌트
function ManageGroupDialog({
  open,
  onOpenChange,
  familyGroup,
  isOwner,
  currentUserId,
  onUpdateGroupName,
  onRemoveMember,
  onLeaveGroup,
  onDeleteGroup,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  familyGroup: NonNullable<FamilyGroup>;
  isOwner: boolean;
  currentUserId: string;
  onUpdateGroupName: (newName: string) => void;
  onRemoveMember: (memberId: string) => void;
  onLeaveGroup: () => void;
  onDeleteGroup: () => void;
}) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [newGroupName, setNewGroupName] = useState(familyGroup.name);

  const handleSaveGroupName = () => {
    if (newGroupName.trim() && newGroupName !== familyGroup.name) {
      onUpdateGroupName(newGroupName.trim());
    }
    setIsEditingName(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>그룹 관리</DialogTitle>
          <DialogDescription>
            그룹 정보 및 멤버를 관리할 수 있습니다
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* 그룹 이름 */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              그룹 이름
            </label>
            {isEditingName && isOwner ? (
              <div className="flex gap-2">
                <Input
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  maxLength={20}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveGroupName();
                    if (e.key === "Escape") setIsEditingName(false);
                  }}
                  autoFocus
                />
                <Button size="sm" onClick={handleSaveGroupName}>
                  <Check className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setNewGroupName(familyGroup.name);
                    setIsEditingName(false);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-800">{familyGroup.name}</span>
                {isOwner && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditingName(true)}
                    className="text-xs"
                  >
                    수정
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* 멤버 목록 */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              멤버 ({familyGroup.members.length}명)
            </label>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {familyGroup.members.map((member) => (
                <Card key={member.id} className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {member.name}
                          </p>
                          {member.id === currentUserId && (
                            <Badge variant="outline" className="text-xs">나</Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 truncate">{member.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {member.role === "owner" ? (
                        <Badge className="text-xs bg-yellow-100 text-yellow-700">
                          <Crown className="w-3 h-3 mr-1" />
                          그룹장
                        </Badge>
                      ) : (
                        <>
                          {isOwner && member.id !== currentUserId && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => onRemoveMember(member.id)}
                              className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* 그룹 정보 */}
          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">생성일</span>
              <span className="text-gray-800 font-medium">{familyGroup.createdAt}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">초대 코드</span>
              <code className="text-gray-800 font-mono">{familyGroup.invitationCode}</code>
            </div>
          </div>

          {/* 위험 작업 */}
          <div className="pt-4 border-t space-y-2">
            {!isOwner ? (
              <Button
                variant="outline"
                className="w-full text-red-600 border-red-300 hover:bg-red-50"
                onClick={onLeaveGroup}
              >
                <LogOut className="w-4 h-4 mr-2" />
                그룹 탈퇴
              </Button>
            ) : (
              <Button
                variant="outline"
                className="w-full text-red-600 border-red-300 hover:bg-red-50"
                onClick={onDeleteGroup}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                그룹 삭제
              </Button>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button type="button" onClick={() => onOpenChange(false)}>
            닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
