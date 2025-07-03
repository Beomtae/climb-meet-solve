
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Mountain, MessageSquare, ShoppingBag } from 'lucide-react';
import Header from '@/components/Header';
import ClimbingIcon from '@/components/ClimbingIcon';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header />
      
      <main className="container mx-auto px-4 pt-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <ClimbingIcon className="text-orange-600" size={48} />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              클라이밋
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            클라이밍 동료를 찾고 문제 풀이를 공유하세요
          </p>
        </div>

        {/* Main Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* 클라이밍 모임 카드 */}
          <Link to="/meetups" className="group">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-orange-100 group-hover:border-orange-300">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">클라이밍 모임</h2>
              <p className="text-gray-600 mb-4">
                같이 클라이밍할 동료를 찾아보세요. 새로운 모임을 만들거나 기존 모임에 참여할 수 있습니다.
              </p>
              <div className="flex items-center text-orange-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                모임 찾기 →
              </div>
            </div>
          </Link>

          {/* 암장 정보 카드 */}
          <Link to="/gyms" className="group">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-orange-100 group-hover:border-orange-300">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mountain className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">암장 정보</h2>
              <p className="text-gray-600 mb-4">
                암장별 문제 풀이 정보를 확인하세요. 색상과 섹션별로 문제를 찾아볼 수 있습니다.
              </p>
              <div className="flex items-center text-orange-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                암장 둘러보기 →
              </div>
            </div>
          </Link>

          {/* 게시판 카드 */}
          <Link to="/board" className="group">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-orange-100 group-hover:border-orange-300">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">클라이밍 게시판</h2>
              <p className="text-gray-600 mb-4">
                클라이머들과 자유롭게 소통하고 정보를 공유하세요. 질문, 팁, 경험담을 나눠보세요.
              </p>
              <div className="flex items-center text-orange-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                게시판 보기 →
              </div>
            </div>
          </Link>

          {/* 중고거래 카드 */}
          <Link to="/marketplace" className="group">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-orange-100 group-hover:border-orange-300">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">중고거래</h2>
              <p className="text-gray-600 mb-4">
                믿을 수 있는 클라이머들과 안전하게 클라이밍 용품을 거래해보세요.
              </p>
              <div className="flex items-center text-orange-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                중고거래 보기 →
              </div>
            </div>
          </Link>
        </div>

        {/* 통계 섹션 */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">클라이밋과 함께하는 클라이밍</h3>
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-gray-600">활성 모임</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">200+</div>
              <div className="text-gray-600">등록된 문제</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">1000+</div>
              <div className="text-gray-600">클라이머</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
