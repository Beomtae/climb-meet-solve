import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, MapPin, Clock, User, MessageSquare } from 'lucide-react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUserContext } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';
import { marketplaceItems } from '@/data/mockData';

const MarketplaceDetail = () => {
  const { id } = useParams();
  const { user, likedItems, toggleLike } = useUserContext();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  
  const item = marketplaceItems.find(i => i.id === id);

  if (!item) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  const handleContact = () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }
    alert('판매자에게 연락하기 기능은 실제 앱에서 구현됩니다.');
  };

  const handleLike = () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header />
      
      <main className="container mx-auto px-4 pt-8 max-w-4xl">
        <Link to="/marketplace" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          중고거래로 돌아가기
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 상품 이미지 */}
          <div className="space-y-4">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* 상품 정보 */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant={item.status === '판매중' ? 'default' : 'secondary'}>
                  {item.status}
                </Badge>
                <Badge variant="outline">{item.category}</Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{item.title}</h1>
              <div className="text-3xl font-bold text-orange-600 mb-6">
                {item.price.toLocaleString()}원
              </div>
            </div>

            {/* 판매자 정보 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <div className="font-semibold">{item.seller}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {item.location}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 액션 버튼 */}
            <div className="flex gap-3">
              <Button 
                onClick={handleLike}
                variant="outline" 
                className="flex-1"
              >
                <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                찜하기 ({item.likes + (isLiked ? 1 : 0)})
              </Button>
              <Button 
                onClick={handleContact}
                className="flex-1"
                disabled={item.status === '판매완료'}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                {item.status === '판매완료' ? '판매완료' : '연락하기'}
              </Button>
            </div>

            {/* 상품 설명 */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">상품 설명</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">{item.description}</p>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {item.createdAt}
                  </div>
                  <div>조회 {item.views || 0}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {!user && (
          <div className="text-center mt-8 p-6 bg-white rounded-lg shadow">
            <p className="text-gray-600 mb-4">판매자와 연락하려면 로그인이 필요합니다.</p>
            <Link to="/login">
              <Button>로그인하기</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default MarketplaceDetail;