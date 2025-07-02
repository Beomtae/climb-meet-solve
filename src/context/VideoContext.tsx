import React, { createContext, useContext, useEffect, useState } from "react";

export interface Video {
  id: string;
  problemId: string;
  uploader: string;
  videoUrl: string;
  likes: string[]; // user 이름 배열
  comments: { id: string; user: string; text: string; createdAt: string }[];
  createdAt: string;
}

interface VideoContextType {
  getVideos: (problemId: string) => Video[];
  addVideo: (problemId: string, videoUrl: string, uploader: string) => void;
  likeVideo: (videoId: string, user: string) => void;
  addComment: (videoId: string, user: string, text: string) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);
const LOCAL_STORAGE_KEY = "videos";

const mockVideos: Video[] = [
  {
    id: "v1",
    problemId: "1",
    uploader: "김클라이머",
    videoUrl: "/src/data/assets/IMG_0660.MOV",
    likes: ["이산악", "박등반"],
    comments: [
      {
        id: "c1",
        user: "이산악",
        text: "정말 멋진 해결입니다!",
        createdAt: new Date().toISOString(),
      },
      {
        id: "c2",
        user: "박등반",
        text: "동작 참고할게요!",
        createdAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "v2",
    problemId: "1",
    uploader: "이산악",
    videoUrl: "/src/data/assets/IMG_0660.MOV",
    likes: ["김클라이머"],
    comments: [
      {
        id: "c3",
        user: "김클라이머",
        text: "깔끔하게 푸셨네요!",
        createdAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "v3",
    problemId: "2",
    uploader: "최등반",
    videoUrl: "/src/data/assets/IMG_0660.MOV",
    likes: ["정클라임", "강산악"],
    comments: [
      {
        id: "c4",
        user: "정클라임",
        text: "파워풀하네요!",
        createdAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "v4",
    problemId: "3",
    uploader: "이초보",
    videoUrl: "/src/data/assets/IMG_0660.MOV",
    likes: [],
    comments: [],
    createdAt: new Date().toISOString(),
  },
];

const getInitialVideos = (): Video[] => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  return mockVideos;
};

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [videos, setVideos] = useState<Video[]>(getInitialVideos());

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(videos));
  }, [videos]);

  const getVideos = (problemId: string) =>
    videos.filter((v) => v.problemId === problemId);

  const addVideo = (problemId: string, videoUrl: string, uploader: string) => {
    const newVideo: Video = {
      id: Date.now().toString(),
      problemId,
      uploader,
      videoUrl,
      likes: [],
      comments: [],
      createdAt: new Date().toISOString(),
    };
    setVideos((prev) => [newVideo, ...prev]);
  };

  const likeVideo = (videoId: string, user: string) => {
    setVideos((prev) =>
      prev.map((v) =>
        v.id === videoId
          ? {
              ...v,
              likes: v.likes.includes(user) ? v.likes : [...v.likes, user],
            }
          : v
      )
    );
  };

  const addComment = (videoId: string, user: string, text: string) => {
    setVideos((prev) =>
      prev.map((v) =>
        v.id === videoId
          ? {
              ...v,
              comments: [
                ...v.comments,
                {
                  id: Date.now().toString(),
                  user,
                  text,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : v
      )
    );
  };

  return (
    <VideoContext.Provider
      value={{ getVideos, addVideo, likeVideo, addComment }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const ctx = useContext(VideoContext);
  if (!ctx) throw new Error("VideoContext를 Provider로 감싸주세요.");
  return ctx;
};
