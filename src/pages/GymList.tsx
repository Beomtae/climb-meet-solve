import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import Header from "@/components/Header";
import { mockGyms } from "@/data/mockData";

const GymList = () => {
  const [gyms] = useState(mockGyms);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">암장 정보</h1>
          <p className="text-gray-600">암장별 문제 풀이 정보를 확인해보세요</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gyms.map((gym) => (
            <Link key={gym.id} to={`/gyms/${gym.id}`} className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:scale-105">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={gym.image}
                    alt={gym.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  {gym.congestion && (
                    <span
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold shadow
                        ${
                          gym.congestion === "여유"
                            ? "bg-green-100 text-green-800"
                            : ""
                        }
                        ${
                          gym.congestion === "보통"
                            ? "bg-orange-100 text-orange-800"
                            : ""
                        }
                        ${
                          gym.congestion === "혼잡"
                            ? "bg-red-100 text-red-800"
                            : ""
                        }
                      `}
                    >
                      {gym.congestion}
                    </span>
                  )}
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{gym.name}</h3>
                    <div className="flex items-center space-x-1 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{gym.location}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">섹션</h4>
                    <div className="flex flex-wrap gap-2">
                      {gym.sections.map((section, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
                        >
                          {section}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      문제 색상
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {gym.colors.slice(0, 4).map((color, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {color}
                        </span>
                      ))}
                      {gym.colors.length > 4 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{gym.colors.length - 4}개
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default GymList;
