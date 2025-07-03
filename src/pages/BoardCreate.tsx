import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUserContext } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';

const BoardCreate = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: ''
  });

  const categories = ['질문', '잡담', '정보공유', '팁'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "로그인 필요",
        description: "게시글을 작성하려면 로그인이 필요합니다.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.title || !formData.content || !formData.category) {
      toast({
        title: "입력 오류",
        description: "모든 필드를 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    // 실제 앱에서는 여기서 API 호출
    toast({
      title: "게시글 작성 완료",
      description: "게시글이 성공적으로 작성되었습니다.",
    });
    navigate('/board');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Header />
        <main className="container mx-auto px-4 pt-8">
          <div className="text-center">
            <p className="text-gray-600 mb-4">게시글을 작성하려면 로그인이 필요합니다.</p>
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
        <Link to="/board" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          게시판으로 돌아가기
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>새 게시글 작성</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <label className="text-sm font-medium mb-2 block">제목</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="게시글 제목을 입력하세요"
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">내용</label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="게시글 내용을 입력하세요"
                  rows={10}
                  required
                />
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">게시글 등록</Button>
                <Button type="button" variant="outline" onClick={() => navigate('/board')}>
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

export default BoardCreate;