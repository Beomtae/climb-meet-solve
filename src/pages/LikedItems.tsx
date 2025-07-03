import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, MapPin, Clock } from 'lucide-react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUserContext } from '@/context/UserContext';
import { marketplaceItems } from '@/data/mockData';

const LikedItems = () => {
  const { user, likedItems } = useUserContext();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Header />
        <main className="container mx-auto px-4 pt-8">
          <div className="text-center">
            <p className="text-gray-600 mb-4">좋아요한 상품을 보려면 로그인이 필요합니다.</p>
            <Link to="/login">
              <Button>로그인하기</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const likedMarketplaceItems = marketplaceItems.filter(item => likedItems.includes(item.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header />
      
      <main className="container mx-auto px-4 pt-8">
        <Link to="/marketplace" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          중고거래로 돌아가기
        </Link>

        <div className="flex items-center gap-2 mb-8">
          <Heart className="w-6 h-6 text-red-500" />
          <h1 className="text-3xl font-bold text-gray-800">좋아요한 상품</h1>
        </div>

        {likedMarketplaceItems.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600 text-lg mb-4">아직 좋아요한 상품이 없습니다.</p>
            <Link to="/marketplace">
              <Button>상품 둘러보기</Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {likedMarketplaceItems.map((item) => (
              <Link key={item.id} to={`/marketplace/${item.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant={item.status === '판매중' ? 'default' : 'secondary'}>
                        {item.status}
                      </Badge>
                    </div>
                    <div className="absolute top-2 left-2">
                      <div className="bg-red-500 text-white p-1 rounded-full">
                        <Heart className="w-4 h-4 fill-current" />
                      </div>
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
                    <p className="text-gray-600 mb-3 line-clamp-2">{item.description}</p>
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
        )}
      </main>
    </div>
  );
};

export default LikedItems;