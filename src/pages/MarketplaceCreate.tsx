import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUserContext } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';

const MarketplaceCreate = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    location: '',
    condition: ''
  });

  const categories = ['신발', '하네스', '로프', '카라비너', '기타'];
  const conditions = ['새상품', '거의새것', '사용감있음', '많이사용함'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "로그인 필요",
        description: "판매글을 작성하려면 로그인이 필요합니다.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.title || !formData.description || !formData.price || !formData.category || !formData.location || !formData.condition) {
      toast({
        title: "입력 오류",
        description: "모든 필드를 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    // 실제 앱에서는 여기서 API 호출
    toast({
      title: "판매글 등록 완료",
      description: "판매글이 성공적으로 등록되었습니다.",
    });
    navigate('/marketplace');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Header />
        <main className="container mx-auto px-4 pt-8">
          <div className="text-center">
            <p className="text-gray-600 mb-4">판매글을 등록하려면 로그인이 필요합니다.</p>
            <Link to="/login">
              <Button>로그인하기</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header />
      
      <main className="container mx-auto px-4 pt-8 max-w-2xl">
        <Link to="/marketplace" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          중고거래로 돌아가기
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>새 판매글 등록</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">상품 이미지</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">이미지를 업로드하세요 (선택사항)</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">카테고리</label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">상품명</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="상품명을 입력하세요"
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">가격</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="판매 가격을 입력하세요"
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">상품 상태</label>
                <Select value={formData.condition} onValueChange={(value) => setFormData({...formData, condition: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="상품 상태를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">거래 지역</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="거래 희망 지역을 입력하세요"
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">상품 설명</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="상품에 대한 자세한 설명을 입력하세요"
                  rows={6}
                  required
                />
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">판매글 등록</Button>
                <Button type="button" variant="outline" onClick={() => navigate('/marketplace')}>
                  취소
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default MarketplaceCreate;