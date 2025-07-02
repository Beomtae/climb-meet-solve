import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { mockProblems } from "@/data/mockData";
import { useUserContext } from "@/context/UserContext";
import { useVideoContext } from "@/context/VideoContext";


const ProblemDetail = () => {
  const { id } = useParams();
  const problem = mockProblems.find((p) => p.id === id);
  const { user } = useUserContext();
  const { getVideos, addVideo, likeVideo, addComment } = useVideoContext();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [commentText, setCommentText] = useState<{ [videoId: string]: string }>(
    {}
  );

  if (!problem)
    return <div className="p-8 text-center">문제를 찾을 수 없습니다.</div>;

  const videos = getVideos(problem.id);
  const bestVideo = videos.reduce(
    (prev, curr) =>
      curr.likes.length > (prev?.likes.length || 0) ? curr : prev,
    videos[0]
  );

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile || !user) return;
    // 실제로는 파일을 서버에 업로드하고 URL을 받아야 하지만, 
    // mock 데이터를 위해 파일명을 사용
    addVideo(problem.id, videoFile.name, user);
    setVideoFile(null);
  };

  const handleLike = (videoId: string) => {
    if (!user) {
      window.alert("로그인이 필요합니다");
      return;
    }
    likeVideo(videoId, user);
  };

  const handleAddComment = (videoId: string) => {
    if (!user) {
      window.alert("로그인이 필요합니다");
      return;
    }
    if (!commentText[videoId]?.trim()) return;
    addComment(videoId, user, commentText[videoId]);
    setCommentText((prev) => ({ ...prev, [videoId]: "" }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-2">{problem.title}</h1>
        <div className="mb-4 text-gray-600">{problem.description}</div>
        <div className="mb-6">
          <div className="font-semibold mb-2">좋아요가 가장 많은 영상</div>
          {bestVideo ? (
            <video
              className="w-64 h-36 rounded-lg object-cover"
              controls
              poster={problem.thumbnail}
            >
              <source src={bestVideo.videoUrl} type="video/mp4" />
              비디오를 재생할 수 없습니다.
            </video>
          ) : (
            <img
              src={problem.thumbnail}
              alt="문제 썸네일"
              className="w-64 h-36 rounded-lg object-cover"
            />
          )}
        </div>
        <form onSubmit={handleAddVideo} className="flex gap-2 mb-8">
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            disabled={!user}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white rounded-lg"
            disabled={!user || !videoFile}
          >
            영상 등록
          </button>
        </form>
        <div>
          <h2 className="text-xl font-bold mb-4">문제 해결 영상</h2>
          {videos.length === 0 && (
            <div className="text-gray-500">아직 등록된 영상이 없습니다.</div>
          )}
          {videos.map((video) => (
            <div
              key={video.id}
              className="mb-8 p-4 border rounded-lg bg-orange-50"
            >
              <div className="flex items-center gap-4 mb-2">
                <video
                  className="w-32 h-20 rounded object-cover"
                  controls
                  poster={problem.thumbnail}
                >
                  <source src={video.videoUrl} type="video/mp4" />
                  비디오를 재생할 수 없습니다.
                </video>
                <div className="flex-1">
                  <div className="font-semibold">{video.uploader}</div>
                  <div className="text-gray-600 text-sm">
                    파일명: {video.videoUrl.split('/').pop()}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    등록일: {new Date(video.createdAt).toLocaleString()}
                  </div>
                </div>
                <button
                  className={`px-3 py-1 rounded-lg font-semibold text-sm ${
                    user && !video.likes.includes(user)
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "bg-gray-300 text-gray-600"
                  }`}
                  onClick={() => handleLike(video.id)}
                  disabled={!user || video.likes.includes(user)}
                >
                  👍 좋아요 {video.likes.length}
                </button>
              </div>
              <div className="mt-2">
                <div className="font-semibold mb-1">댓글</div>
                <div className="space-y-2 mb-2">
                  {video.comments.length === 0 && (
                    <div className="text-gray-400 text-sm">
                      아직 댓글이 없습니다.
                    </div>
                  )}
                  {video.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-white rounded px-3 py-2 border text-sm flex items-center gap-2"
                    >
                      <span className="font-semibold text-orange-600">
                        {comment.user}
                      </span>
                      <span>{comment.text}</span>
                      <span className="ml-auto text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="댓글을 입력하세요"
                    value={commentText[video.id] || ""}
                    onChange={(e) =>
                      setCommentText((prev) => ({
                        ...prev,
                        [video.id]: e.target.value,
                      }))
                    }
                    className="flex-1 px-3 py-2 border rounded"
                    disabled={!user}
                  />
                  <button
                    onClick={() => handleAddComment(video.id)}
                    className="px-3 py-2 bg-orange-500 text-white rounded"
                    disabled={!user || !commentText[video.id]?.trim()}
                  >
                    등록
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
