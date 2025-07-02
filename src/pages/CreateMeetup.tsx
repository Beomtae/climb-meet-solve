import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useMeetupContext } from "@/context/MeetupContext";
import { useUserContext } from "@/context/UserContext";
import { MeetupConditions } from "@/data/mockData";

const CreateMeetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { createMeetup } = useMeetupContext();
  const { user } = useUserContext();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    maxParticipants: 4,
    description: "",
  });

  const [conditions, setConditions] = useState<MeetupConditions>({
    levelRequired: "any",
    ageGroup: "any",
    genderPreference: "any",
    climbingStyle: "all",
    techLevel: "any",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.date ||
      !formData.time ||
      !formData.location
    ) {
      toast({
        title: "입력 오류",
        description: "모든 필수 항목을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    createMeetup({ ...formData, author: user || "익명", conditions });
    toast({
      title: "모임 생성 완료!",
      description: `${formData.title} 모임이 생성되었습니다.`,
    });

    setTimeout(() => {
      navigate("/meetups");
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Link
          to="/meetups"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>모임 목록으로</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            새 모임 만들기
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                모임 제목 *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="예: 주말 클라이밍 정모"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  날짜 *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  시간 *
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                장소 *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="예: 더클라임 강남점"
              />
            </div>

            <div>
              <label
                htmlFor="maxParticipants"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                최대 인원
              </label>
              <select
                id="maxParticipants"
                name="maxParticipants"
                value={formData.maxParticipants}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              >
                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}명
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                모임 설명
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                placeholder="모임에 대한 간단한 설명을 입력해주세요..."
              />
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">참가 조건 설정</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    레벨 조건
                  </label>
                  <select
                    value={conditions.levelRequired}
                    onChange={(e) => setConditions(prev => ({ ...prev, levelRequired: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="any">제한없음</option>
                    <option value="beginner">초급자</option>
                    <option value="intermediate">중급자</option>
                    <option value="advanced">고급자</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    연령대
                  </label>
                  <select
                    value={conditions.ageGroup}
                    onChange={(e) => setConditions(prev => ({ ...prev, ageGroup: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="any">제한없음</option>
                    <option value="20s">20대</option>
                    <option value="30s">30대</option>
                    <option value="40s">40대</option>
                    <option value="50s+">50대 이상</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    성별 선호
                  </label>
                  <select
                    value={conditions.genderPreference}
                    onChange={(e) => setConditions(prev => ({ ...prev, genderPreference: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="any">제한없음</option>
                    <option value="mixed">남녀무관</option>
                    <option value="male">남성만</option>
                    <option value="female">여성만</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    클라이밍 스타일
                  </label>
                  <select
                    value={conditions.climbingStyle}
                    onChange={(e) => setConditions(prev => ({ ...prev, climbingStyle: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="all">전체</option>
                    <option value="bouldering">볼더링</option>
                    <option value="lead">리드클라이밍</option>
                    <option value="toprope">탑로프</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    기술 레벨
                  </label>
                  <select
                    value={conditions.techLevel}
                    onChange={(e) => setConditions(prev => ({ ...prev, techLevel: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="any">제한없음</option>
                    <option value="V0-V3">V0-V3 (초급)</option>
                    <option value="V4-V7">V4-V7 (중급)</option>
                    <option value="V8-V11">V8-V11 (고급)</option>
                    <option value="V12+">V12+ (전문가)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Link
                to="/meetups"
                className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center font-semibold"
              >
                취소
              </Link>
              <button
                type="submit"
                className="flex-1 py-3 px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all font-semibold shadow-lg hover:shadow-xl"
              >
                모임 만들기
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateMeetup;
