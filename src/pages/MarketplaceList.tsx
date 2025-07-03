import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Heart, Clock, MapPin } from "lucide-react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUserContext } from "@/context/UserContext";
import { marketplaceItems } from "@/data/mockData";

const MarketplaceList = () => {
  const { user } = useUserContext();
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  const categories = ["전체", "신발", "하네스", "로프", "카라비너", "기타"];

  const filteredItems =
    selectedCategory === "전체"
      ? marketplaceItems
      : marketplaceItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header />

      <main className="container mx-auto px-4 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              클라이밍 중고거래
            </h1>
            <p className="text-gray-600">
              믿을 수 있는 클라이머들과 안전하게 거래하세요
            </p>
          </div>
          {user && (
            <Link to="/marketplace/create">
              <Button className="mt-4 md:mt-0">
                <Plus className="w-4 h-4 mr-2" />
                판매글 등록
              </Button>
            </Link>
          )}
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
          {/* 카테고리 필터 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-orange-600 text-white"
                    : "bg-white text-gray-600 hover:bg-orange-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          {/* 상품 목록 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Link key={item.id} to={`/marketplace/${item.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant={
                          item.status === "판매중" ? "default" : "secondary"
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg hover:text-orange-600 transition-colors line-clamp-1">
                      {item.title}
                    </CardTitle>
                    <div className="text-2xl font-bold text-orange-600">
                      {item.price.toLocaleString()}원
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {item.location}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {item.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {item.createdAt}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {!user && (
          <div className="text-center mt-8 p-6 bg-white rounded-lg shadow">
            <p className="text-gray-600 mb-4">
              상품을 등록하려면 로그인이 필요합니다.
            </p>
            <Link to="/login">
              <Button>로그인하기</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default MarketplaceList;
