import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, MessageSquare, Clock, User, Heart } from 'lucide-react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUserContext } from '@/context/UserContext';
import { boardPosts } from '@/data/mockData';

const BoardList = () => {
  const { user } = useUserContext();
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const categories = ['전체', '질문', '잡담', '정보공유', '팁'];

  const filteredPosts = selectedCategory === '전체' 
    ? boardPosts 
    : boardPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header />
      
      <main className="container mx-auto px-4 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">클라이밍 게시판</h1>
            <p className="text-gray-600">클라이머들과 자유롭게 소통해보세요</p>
          </div>
          {user && (
            <Link to="/board/create">
              <Button className="mt-4 md:mt-0">
                <Plus className="w-4 h-4 mr-2" />
                글 작성하기
              </Button>
            </Link>
          )}
        </div>

        {/* 카테고리 필터 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-orange-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 게시글 목록 */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Link key={post.id} to={`/board/${post.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        {post.isHot && <Badge variant="destructive">인기</Badge>}
                      </div>
                      <CardTitle className="text-lg hover:text-orange-600 transition-colors">
                        {post.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.createdAt}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {post.comments}
                      </div>
                      {post.likes && (
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {post.likes}
                        </div>
                      )}
                      <div>조회 {post.views}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {!user && (
          <div className="text-center mt-8 p-6 bg-white rounded-lg shadow">
            <p className="text-gray-600 mb-4">게시글을 작성하려면 로그인이 필요합니다.</p>
            <Link to="/login">
              <Button>로그인하기</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default BoardList;