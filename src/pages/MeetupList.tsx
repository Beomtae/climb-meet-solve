import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Users, Calendar, Clock, MapPin, Filter } from "lucide-react";
import Header from "@/components/Header";
import { useMeetupContext } from "@/context/MeetupContext";
import { useUserContext } from "@/context/UserContext";
import { mockUserProfiles } from "@/data/mockData";

const MeetupList = () => {
  const { meetups } = useMeetupContext();
  const { userProfile } = useUserContext();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    levelRequired: "any",
    ageGroup: "any",
    genderPreference: "any",
    climbingStyle: "all",
    techLevel: "any",
  });

  const filteredMeetups = meetups.filter((meetup) => {
    if (!meetup.conditions) return true;

    // 내 프로필과 모임 조건이 맞는지 확인
    if (userProfile) {
      const { conditions } = meetup;
      
      // 레벨 조건 체크
      if (conditions.levelRequired && conditions.levelRequired !== "any") {
        const levelOrder = { beginner: 0, intermediate: 1, advanced: 2 };
        if (levelOrder[userProfile.level] < levelOrder[conditions.levelRequired]) {
          return false;
        }
      }

      // 연령대 조건 체크
      if (conditions.ageGroup && conditions.ageGroup !== "any" && 
          userProfile.ageGroup !== conditions.ageGroup) {
        return false;
      }

      // 성별 선호 체크
      if (conditions.genderPreference && conditions.genderPreference !== "any" && 
          conditions.genderPreference !== "mixed" && 
          userProfile.gender !== conditions.genderPreference) {
        return false;
      }

      // 클라이밍 스타일 체크
      if (conditions.climbingStyle && conditions.climbingStyle !== "all" && 
          userProfile.climbingStyle !== "all" && 
          userProfile.climbingStyle !== conditions.climbingStyle) {
        return false;
      }

      // 기술 레벨 체크
      if (conditions.techLevel && conditions.techLevel !== "any") {
        const techOrder = { "V0-V3": 0, "V4-V7": 1, "V8-V11": 2, "V12+": 3 };
        if (techOrder[userProfile.techLevel] < techOrder[conditions.techLevel]) {
          return false;
        }
      }
    }

    // 사용자가 설정한 필터 적용
    if (filters.levelRequired !== "any" && 
        (!meetup.conditions?.levelRequired || meetup.conditions.levelRequired !== filters.levelRequired)) {
      return false;
    }

    if (filters.ageGroup !== "any" && 
        (!meetup.conditions?.ageGroup || meetup.conditions.ageGroup !== filters.ageGroup)) {
      return false;
    }

    if (filters.genderPreference !== "any" && 
        (!meetup.conditions?.genderPreference || meetup.conditions.genderPreference !== filters.genderPreference)) {
      return false;
    }

    if (filters.climbingStyle !== "all" && 
        (!meetup.conditions?.climbingStyle || meetup.conditions.climbingStyle !== filters.climbingStyle)) {
      return false;
    }

    if (filters.techLevel !== "any" && 
        (!meetup.conditions?.techLevel || meetup.conditions.techLevel !== filters.techLevel)) {
      return false;
    }

    return true;
  });

  const getLevelText = (level: string) => {
    switch (level) {
      case "beginner": return "초급자";
      case "intermediate": return "중급자";
      case "advanced": return "고급자";
      default: return "제한없음";
    }
  };

  const getAgeGroupText = (ageGroup: string) => {
    switch (ageGroup) {
      case "20s": return "20대";
      case "30s": return "30대";
      case "40s": return "40대";
      case "50s+": return "50대+";
      default: return "제한없음";
    }
  };

  const getGenderText = (gender: string) => {
    switch (gender) {
      case "male": return "남성만";
      case "female": return "여성만";
      case "mixed": return "남녀무관";
      default: return "제한없음";
    }
  };

  const getClimbingStyleText = (style: string) => {
    switch (style) {
      case "bouldering": return "볼더링";
      case "lead": return "리드";
      case "toprope": return "탑로프";
      default: return "전체";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              클라이밍 모임
            </h1>
            <p className="text-gray-600">함께할 클라이밍 동료를 찾아보세요</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white text-orange-600 px-4 py-3 rounded-xl border-2 border-orange-200 hover:bg-orange-50 transition-all duration-300 flex items-center space-x-2"
            >
              <Filter className="w-5 h-5" />
              <span>필터</span>
            </button>
            <Link
              to="/meetups/create"
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>새 모임 만들기</span>
            </Link>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-orange-100">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">모임 필터</h3>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">레벨</label>
                <select
                  value={filters.levelRequired}
                  onChange={(e) => setFilters(prev => ({ ...prev, levelRequired: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="any">전체</option>
                  <option value="beginner">초급자</option>
                  <option value="intermediate">중급자</option>
                  <option value="advanced">고급자</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">연령대</label>
                <select
                  value={filters.ageGroup}
                  onChange={(e) => setFilters(prev => ({ ...prev, ageGroup: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="any">전체</option>
                  <option value="20s">20대</option>
                  <option value="30s">30대</option>
                  <option value="40s">40대</option>
                  <option value="50s+">50대+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">성별</label>
                <select
                  value={filters.genderPreference}
                  onChange={(e) => setFilters(prev => ({ ...prev, genderPreference: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="any">전체</option>
                  <option value="mixed">남녀무관</option>
                  <option value="male">남성만</option>
                  <option value="female">여성만</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">스타일</label>
                <select
                  value={filters.climbingStyle}
                  onChange={(e) => setFilters(prev => ({ ...prev, climbingStyle: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="all">전체</option>
                  <option value="bouldering">볼더링</option>
                  <option value="lead">리드</option>
                  <option value="toprope">탑로프</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">기술레벨</label>
                <select
                  value={filters.techLevel}
                  onChange={(e) => setFilters(prev => ({ ...prev, techLevel: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="any">전체</option>
                  <option value="V0-V3">V0-V3</option>
                  <option value="V4-V7">V4-V7</option>
                  <option value="V8-V11">V8-V11</option>
                  <option value="V12+">V12+</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-6">
          {filteredMeetups.map((meetup) => (
            <div
              key={meetup.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-orange-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-800">
                      {meetup.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        meetup.status === "recruiting"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {meetup.status === "recruiting" ? "모집중" : "모집완료"}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{meetup.description}</p>
                  
                  {meetup.conditions && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {meetup.conditions.levelRequired && meetup.conditions.levelRequired !== "any" && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {getLevelText(meetup.conditions.levelRequired)}
                        </span>
                      )}
                      {meetup.conditions.ageGroup && meetup.conditions.ageGroup !== "any" && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                          {getAgeGroupText(meetup.conditions.ageGroup)}
                        </span>
                      )}
                      {meetup.conditions.genderPreference && meetup.conditions.genderPreference !== "any" && (
                        <span className="px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded-full">
                          {getGenderText(meetup.conditions.genderPreference)}
                        </span>
                      )}
                      {meetup.conditions.climbingStyle && meetup.conditions.climbingStyle !== "all" && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {getClimbingStyleText(meetup.conditions.climbingStyle)}
                        </span>
                      )}
                      {meetup.conditions.techLevel && meetup.conditions.techLevel !== "any" && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          {meetup.conditions.techLevel}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{meetup.date}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{meetup.time}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{meetup.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">
                    {meetup.currentParticipants}/{meetup.maxParticipants}명
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  주최자: {meetup.author}
                </div>
                <Link
                  to={`/meetups/${meetup.id}`}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-semibold"
                >
                  자세히 보기
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredMeetups.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            조건에 맞는 모임이 없습니다.
          </div>
        )}
      </main>
    </div>
  );
};

export default MeetupList;