
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import { mockGyms, mockProblems } from '@/data/mockData';

const GymDetail = () => {
  const { id } = useParams();
  const gym = mockGyms.find(g => g.id === id);
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedProblem, setSelectedProblem] = useState<any>(null);

  if (!gym) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">암장을 찾을 수 없습니다</h1>
          <Link to="/gyms" className="text-orange-600 hover:text-orange-700 mt-4 inline-block">
            암장 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const filteredProblems = mockProblems.filter(problem => {
    return problem.gymId === id &&
           (selectedSection === '' || problem.section === selectedSection) &&
           (selectedColor === '' || problem.color === selectedColor);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Link 
          to="/gyms"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>암장 목록으로</span>
        </Link>

        {/* 암장 헤더 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            <img 
              src={gym.image} 
              alt={gym.name}
              className="w-24 h-24 object-cover rounded-xl"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{gym.name}</h1>
              <div className="flex items-center space-x-1 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{gym.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 필터 섹션 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">문제 찾기</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">섹션 선택</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedSection('')}
                  className={`p-3 rounded-lg border transition-all ${
                    selectedSection === '' 
                      ? 'border-orange-500 bg-orange-50 text-orange-700' 
                      : 'border-gray-300 hover:border-orange-300'
                  }`}
                >
                  전체
                </button>
                {gym.sections.map((section) => (
                  <button
                    key={section}
                    onClick={() => setSelectedSection(section)}
                    className={`p-3 rounded-lg border transition-all ${
                      selectedSection === section 
                        ? 'border-orange-500 bg-orange-50 text-orange-700' 
                        : 'border-gray-300 hover:border-orange-300'
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">색상 선택</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSelectedColor('')}
                  className={`p-3 rounded-lg border transition-all ${
                    selectedColor === '' 
                      ? 'border-orange-500 bg-orange-50 text-orange-700' 
                      : 'border-gray-300 hover:border-orange-300'
                  }`}
                >
                  전체
                </button>
                {gym.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`p-3 rounded-lg border transition-all ${
                      selectedColor === color 
                        ? 'border-orange-500 bg-orange-50 text-orange-700' 
                        : 'border-gray-300 hover:border-orange-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 문제 목록 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            문제 목록 ({filteredProblems.length}개)
          </h2>
          
          {filteredProblems.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>해당 조건의 문제가 없습니다.</p>
              <p className="text-sm mt-2">다른 섹션이나 색상을 선택해보세요.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProblems.map((problem) => (
                <div 
                  key={problem.id}
                  onClick={() => setSelectedProblem(problem)}
                  className="cursor-pointer group"
                >
                  <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <div className="aspect-video relative">
                      <img 
                        src={problem.thumbnail} 
                        alt={problem.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-semibold">
                        {problem.difficulty}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-1">{problem.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                          {problem.section}
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {problem.color}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{problem.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 문제 상세 모달 */}
        {selectedProblem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">{selectedProblem.title}</h3>
                  <button
                    onClick={() => setSelectedProblem(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="aspect-video mb-4 rounded-xl overflow-hidden">
                  <img 
                    src={selectedProblem.thumbnail} 
                    alt={selectedProblem.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-orange-50 p-3 rounded-lg text-center">
                    <div className="text-sm text-gray-600">섹션</div>
                    <div className="font-semibold text-orange-700">{selectedProblem.section}</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="text-sm text-gray-600">색상</div>
                    <div className="font-semibold text-blue-700">{selectedProblem.color}</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <div className="text-sm text-gray-600">난이도</div>
                    <div className="font-semibold text-purple-700">{selectedProblem.difficulty}</div>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed">{selectedProblem.description}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GymDetail;
