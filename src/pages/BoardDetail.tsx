import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, User, Clock, Heart } from 'lucide-react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useUserContext } from '@/context/UserContext';
import { boardPosts, boardComments } from '@/data/mockData';

const BoardDetail = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const [comment, setComment] = useState('');
  
  const post = boardPosts.find(p => p.id === id);
  const postComments = boardComments.filter(c => c.postId === id);

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const handleCommentSubmit = () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (!comment.trim()) return;
    
    // 실제 앱에서는 여기서 API 호출
    alert('댓글이 등록되었습니다.');
    setComment('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header />
      
      <main className="container mx-auto px-4 pt-8 max-w-4xl">
        <Link to="/board" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          게시판으로 돌아가기
        </Link>

        {/* 게시글 내용 */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary">{post.category}</Badge>
              {post.isHot && <Badge variant="destructive">인기</Badge>}
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.createdAt}
              </div>
              <div>조회 {post.views}</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
            </div>
            <div className="flex items-center gap-4 mt-6 pt-4 border-t">
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                좋아요 {post.likes || 0}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 댓글 작성 */}
        {user && (
          <Card className="mb-6">
            <CardHeader>
              <h3 className="text-lg font-semibold">댓글 작성</h3>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="댓글을 입력하세요..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mb-4"
              />
              <Button onClick={handleCommentSubmit} disabled={!comment.trim()}>
                댓글 등록
              </Button>
            </CardContent>
          </Card>
        )}

        {/* 댓글 목록 */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              댓글 {postComments.length}개
            </h3>
          </CardHeader>
          <CardContent>
            {postComments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">아직 댓글이 없습니다.</p>
            ) : (
              <div className="space-y-4">
                {postComments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">{comment.author}</span>
                      <span className="text-sm text-gray-500">{comment.createdAt}</span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {!user && (
          <div className="text-center mt-6 p-6 bg-white rounded-lg shadow">
            <p className="text-gray-600 mb-4">댓글을 작성하려면 로그인이 필요합니다.</p>
            <Link to="/login">
              <Button>로그인하기</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default BoardDetail;