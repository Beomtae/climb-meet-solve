
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import { mockMeetups } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const MeetupDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const meetup = mockMeetups.find(m => m.id === id);
  const [isParticipating, setIsParticipating] = useState(false);

  if (!meetup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">모임을 찾을 수 없습니다</h1>
          <Link to="/meetups" className="text-orange-600 hover:text-orange-700 mt-4 inline-block">
            모임 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const handleParticipate = () => {
    if (meetup.status === 'full') {
      toast({
        title: "참가 불가",
        description: "이미 모집이 완료된 모임입니다.",
        variant: "destructive"
      });
      return;
    }

    setIsParticipating(true);
    toast({
      title: "참가 완료!",
      description: `${meetup.title} 모임에 참가하셨습니다.`,
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

        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <h1 className="text-3xl font-bold text-gray-800">{meetup.title}</h1>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                meetup.status === 'recruiting' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {meetup.status === 'recruiting' ? '모집중' : '모집완료'}
              </span>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">{meetup.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">모임 정보</h3>
              
              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <Calendar className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="font-semibold text-gray-800">날짜</div>
                  <div className="text-gray-600">{meetup.date}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <Clock className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="font-semibold text-gray-800">시간</div>
                  <div className="text-gray-600">{meetup.time}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <MapPin className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="font-semibold text-gray-800">장소</div>
                  <div className="text-gray-600">{meetup.location}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <Users className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="font-semibold text-gray-800">인원</div>
                  <div className="text-gray-600">{meetup.currentParticipants}/{meetup.maxParticipants}명</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">참가자 목록</h3>
              <div className="space-y-2">
                {meetup.participants.map((participant, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {participant[0]}
                    </div>
                    <span className="text-gray-800">{participant}</span>
                    {index === 0 && (
                      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">주최자</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleParticipate}
              disabled={meetup.status === 'full' || isParticipating}
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                meetup.status === 'full' || isParticipating
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl'
              }`}
            >
              {isParticipating 
                ? '참가 완료!' 
                : meetup.status === 'full' 
                  ? '모집 완료' 
                  : '참가하기'
              }
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MeetupDetail;
