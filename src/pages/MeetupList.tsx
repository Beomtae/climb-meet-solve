
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Users, Calendar, Clock, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import { mockMeetups } from '@/data/mockData';

const MeetupList = () => {
  const [meetups] = useState(mockMeetups);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">클라이밍 모임</h1>
            <p className="text-gray-600">함께할 클라이밍 동료를 찾아보세요</p>
          </div>
          <Link 
            to="/meetups/create"
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span>새 모임 만들기</span>
          </Link>
        </div>

        <div className="grid gap-6">
          {meetups.map((meetup) => (
            <div key={meetup.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-orange-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{meetup.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      meetup.status === 'recruiting' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {meetup.status === 'recruiting' ? '모집중' : '모집완료'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{meetup.description}</p>
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
                  <span className="text-sm">{meetup.currentParticipants}/{meetup.maxParticipants}명</span>
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
      </main>
    </div>
  );
};

export default MeetupList;
