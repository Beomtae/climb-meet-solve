export interface UserProfile {
  username: string;
  level: "beginner" | "intermediate" | "advanced";
  ageGroup: "20s" | "30s" | "40s" | "50s+";
  gender: "male" | "female" | "other";
  climbingStyle: "bouldering" | "lead" | "toprope" | "all";
  techLevel: "V0-V3" | "V4-V7" | "V8-V11" | "V12+";
}

export interface MeetupConditions {
  levelRequired?: "beginner" | "intermediate" | "advanced" | "any";
  ageGroup?: "20s" | "30s" | "40s" | "50s+" | "any";
  genderPreference?: "male" | "female" | "mixed" | "any";
  climbingStyle?: "bouldering" | "lead" | "toprope" | "all";
  techLevel?: "V0-V3" | "V4-V7" | "V8-V11" | "V12+" | "any";
}

export interface Meetup {
  id: string;
  title: string;
  author: string;
  date: string;
  time: string;
  location: string;
  currentParticipants: number;
  maxParticipants: number;
  description: string;
  status: "recruiting" | "full";
  participants: string[];
  conditions?: MeetupConditions;
}

export interface Gym {
  id: string;
  name: string;
  location: string;
  address: string;
  image: string;
  sections: string[];
  colors: string[];
  price: string;
  openHours: string;
  phone?: string;
  homepage?: string;
}

export interface Problem {
  id: string;
  gymId: string;
  section: string;
  color: string;
  difficulty: string;
  thumbnail: string;
  title: string;
  description: string;
}

export const mockUserProfiles: { [username: string]: UserProfile } = {
  김클라이머: {
    username: "김클라이머",
    level: "intermediate",
    ageGroup: "30s",
    gender: "male",
    climbingStyle: "bouldering",
    techLevel: "V4-V7",
  },
  이산악: {
    username: "이산악",
    level: "advanced",
    ageGroup: "30s",
    gender: "male",
    climbingStyle: "all",
    techLevel: "V8-V11",
  },
  박등반: {
    username: "박등반",
    level: "beginner",
    ageGroup: "20s",
    gender: "female",
    climbingStyle: "bouldering",
    techLevel: "V0-V3",
  },
  최등반: {
    username: "최등반",
    level: "advanced",
    ageGroup: "40s",
    gender: "male",
    climbingStyle: "bouldering",
    techLevel: "V12+",
  },
  정클라임: {
    username: "정클라임",
    level: "intermediate",
    ageGroup: "30s",
    gender: "female",
    climbingStyle: "lead",
    techLevel: "V4-V7",
  },
  강산악: {
    username: "강산악",
    level: "advanced",
    ageGroup: "40s",
    gender: "male",
    climbingStyle: "all",
    techLevel: "V8-V11",
  },
  조바위: {
    username: "조바위",
    level: "intermediate",
    ageGroup: "20s",
    gender: "male",
    climbingStyle: "bouldering",
    techLevel: "V4-V7",
  },
  이초보: {
    username: "이초보",
    level: "beginner",
    ageGroup: "20s",
    gender: "male",
    climbingStyle: "toprope",
    techLevel: "V0-V3",
  },
  김신입: {
    username: "김신입",
    level: "beginner",
    ageGroup: "20s",
    gender: "female",
    climbingStyle: "bouldering",
    techLevel: "V0-V3",
  },
};

export const mockMeetups: Meetup[] = [
  {
    id: "1",
    title: "주말 클라이밍 정모",
    author: "김클라이머",
    date: "2025-01-05",
    time: "14:00",
    location: "더클라임 강남점",
    currentParticipants: 3,
    maxParticipants: 6,
    description: "주말에 편하게 클라이밍하실 분들 모집합니다. 초보자도 환영!",
    status: "recruiting",
    participants: ["김클라이머", "이산악", "박등반"],
    conditions: {
      levelRequired: "beginner",
      ageGroup: "20s",
      genderPreference: "male",
      climbingStyle: "bouldering",
      techLevel: "V0-V3",
    },
  },
  {
    id: "2",
    title: "볼더링 스터디 모임",
    author: "최등반",
    date: "2025-01-06",
    time: "19:00",
    location: "클라이밍파크 홍대점",
    currentParticipants: 4,
    maxParticipants: 4,
    description: "볼더링 기술 향상을 위한 스터디 모임입니다.",
    status: "full",
    participants: ["최등반", "정클라임", "강산악", "조바위"],
    conditions: {
      levelRequired: "intermediate",
      ageGroup: "30s",
      genderPreference: "female",
      climbingStyle: "lead",
      techLevel: "V4-V7",
    },
  },
  {
    id: "3",
    title: "초보자 환영 클라이밍",
    author: "이초보",
    date: "2025-01-07",
    time: "18:30",
    location: "더클라임 잠실점",
    currentParticipants: 2,
    maxParticipants: 8,
    description:
      "클라이밍을 처음 시작하시는 분들을 위한 모임입니다. 천천히 기초부터!",
    status: "recruiting",
    participants: ["이초보", "김신입"],
    conditions: {
      levelRequired: "beginner",
      ageGroup: "any",
      genderPreference: "mixed",
      climbingStyle: "all",
      techLevel: "any",
    },
  },
  {
    id: "4",
    title: "고수만 모여라! 리드 클라이밍",
    author: "강산악",
    date: "2025-01-10",
    time: "20:00",
    location: "클라이밍파크 홍대점",
    currentParticipants: 5,
    maxParticipants: 8,
    description: "고급자 리드 클라이밍 세션, 실력자 환영!",
    status: "recruiting",
    participants: ["강산악", "최등반"],
    conditions: {
      levelRequired: "advanced",
      ageGroup: "40s",
      genderPreference: "any",
      climbingStyle: "lead",
      techLevel: "V8-V11",
    },
  },
  {
    id: "5",
    title: "여성 볼더링 초급 모임",
    author: "정클라임",
    date: "2025-01-12",
    time: "15:00",
    location: "더클라임 강남점",
    currentParticipants: 3,
    maxParticipants: 5,
    description: "여성 초급자만 모여서 볼더링 연습해요!",
    status: "recruiting",
    participants: ["정클라임", "박등반", "김신입"],
    conditions: {
      levelRequired: "beginner",
      ageGroup: "20s",
      genderPreference: "female",
      climbingStyle: "bouldering",
      techLevel: "V0-V3",
    },
  },
  {
    id: "6",
    title: "탑로프 중급자 모임",
    author: "조바위",
    date: "2025-01-15",
    time: "19:30",
    location: "더클라임 잠실점",
    currentParticipants: 4,
    maxParticipants: 8,
    description: "탑로프 중급자 이상만!",
    status: "recruiting",
    participants: ["조바위", "이초보"],
    conditions: {
      levelRequired: "intermediate",
      ageGroup: "30s",
      genderPreference: "any",
      climbingStyle: "toprope",
      techLevel: "V4-V7",
    },
  },
];

export const mockGyms: Gym[] = [
  {
    id: "1",
    name: "더클라임 강남점",
    location: "서울 강남구",
    address: "서울특별시 강남구 테헤란로 123",
    image:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20221025_87%2F1666674763427DfSNN_JPEG%2FCCA27AB7-09DA-40C9-862F-B3EF2FC8441D.jpeg",
    sections: ["A섹션", "B섹션", "C섹션", "D섹션"],
    colors: ["흰색", "노랑", "초록", "파랑", "빨강", "검정"],
    price: "1일권 20,000원 / 월회원 120,000원",
    openHours: "평일 10:00~23:00, 주말 10:00~22:00",
    phone: "02-1234-5678",
    homepage: "https://theclimb.co.kr/",
  },
  {
    id: "2",
    name: "클라이밍파크 홍대점",
    location: "서울 마포구",
    address: "서울특별시 마포구 양화로 45",
    image:
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=400&h=300&fit=crop",
    sections: ["1구역", "2구역", "3구역"],
    colors: ["흰색", "노랑", "초록", "파랑", "빨강", "보라"],
    price: "1일권 18,000원 / 월회원 110,000원",
    openHours: "평일 11:00~22:00, 주말 11:00~21:00",
    phone: "02-2345-6789",
    homepage: "https://climbingpark.co.kr/",
  },
  {
    id: "3",
    name: "더클라임 잠실점",
    location: "서울 송파구",
    address: "서울특별시 송파구 올림픽로 240",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop",
    sections: ["East", "West", "Center"],
    colors: ["흰색", "노랑", "초록", "파랑", "빨강", "오렌지"],
    price: "1일권 19,000원 / 월회원 115,000원",
    openHours: "평일 10:00~23:00, 주말 10:00~22:00",
    phone: "02-3456-7890",
    homepage: "https://theclimb.co.kr/",
  },
];

export const mockProblems: Problem[] = [
  {
    id: "1",
    gymId: "1",
    section: "A섹션",
    color: "노랑",
    difficulty: "V2",
    thumbnail:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyNTA2MjJfMjYx%2FMDAxNzUwNTk0MDc5NDAz.dZBzuyWC0MQvAbZVQ0ETPKaVLlf69peILD6kaDABfosg.YzFjmHzkQiscO1oPb9sEPYP64jj3h0RWuVRzLsKr3Xwg.JPEG%2FIMG_6883.jpeg%3Ftype%3Dw1500_60_sharpen",
    title: "기본 오버행 문제",
    description: "오버행 구간에서의 기본 밸런스를 연습할 수 있는 문제입니다.",
  },
  {
    id: "2",
    gymId: "1",
    section: "A섹션",
    color: "초록",
    difficulty: "V4",
    thumbnail:
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAyMDA3MTFfMTE3%2FMDAxNTk0NDI4OTUzNzI1.pnBxx_gQVSpWj406ab2uOwSKKQYznLJZmmnB-LvHva4g.9egNLllRZNleHvxq8bUcjg8lNVrOBdIxpuArfBtm0bgg.JPEG%2FexternalFile.jpg&type=sc960_832",
    title: "파워풀한 다이노 문제",
    description: "강한 다이나믹 무브가 필요한 도전적인 문제입니다.",
  },
  {
    id: "3",
    gymId: "1",
    section: "B섹션",
    color: "파랑",
    difficulty: "V3",
    thumbnail:
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fimage.nmv.naver.net%2Fblog_2025_02_22_678%2FfR2Ni6bmW1_05.jpg&type=sc960_832",
    title: "테크니컬 슬랩",
    description: "정확한 풋워크와 밸런스가 중요한 슬랩 문제입니다.",
  },
];

// 영상 컨텍스트용 Mock 데이터
export const videoSolutions = [
  {
    id: "1",
    problemId: "prob_1",
    title: "빨간색 V3 문제 풀이",
    description: "왼쪽 벽 빨간색 홀드 사용한 V3 난이도 문제입니다.",
    videoPath: "/Users/taebeom/Downloads/IMG_0660.MOV",
    thumbnailUrl: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=300&h=200&fit=crop",
    uploadedBy: "김민수",
    uploadedAt: "2024-01-15",
    likes: 24,
    views: 156
  },
  {
    id: "2", 
    problemId: "prob_2",
    title: "파란색 V5 동적 무브",
    description: "파란색 홀드로 이루어진 V5 문제의 핵심 동적 무브 해설",
    videoPath: "/Users/taebeom/Downloads/IMG_0660.MOV",
    thumbnailUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
    uploadedBy: "박지영",
    uploadedAt: "2024-01-14",
    likes: 31,
    views: 203
  }
];

// 게시판 Mock 데이터
export interface BoardPost {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  createdAt: string;
  views: number;
  comments: number;
  likes?: number;
  isHot?: boolean;
}

export const boardPosts: BoardPost[] = [
  {
    id: "board_1",
    title: "클라이밍 초보인데 첫 암장 추천 좀 해주세요!",
    content: "안녕하세요! 클라이밍에 입문하려고 하는데 어떤 암장이 초보자에게 좋을까요? 강남 근처로 추천 부탁드립니다.",
    author: "클라이밍뉴비",
    category: "질문",
    createdAt: "2024-01-15",
    views: 127,
    comments: 8,
    likes: 12,
    isHot: true
  },
  {
    id: "board_2",
    title: "오늘 처음으로 V4 완등했어요! 🎉",
    content: "6개월 동안 도전했던 V4 문제를 드디어 완등했습니다! 너무 기뻐서 자랑하러 왔어요 ㅎㅎ 다들 화이팅!",
    author: "산악인123",
    category: "잡담",
    createdAt: "2024-01-14",
    views: 89,
    comments: 15,
    likes: 24
  },
  {
    id: "board_3",
    title: "클라이밍 신발 사이즈 고민",
    content: "평소 신발 사이즈보다 얼마나 작게 사야 하나요? 0.5 작게? 1 작게? 경험담 공유 부탁드려요.",
    author: "홀드마스터",
    category: "질문",
    createdAt: "2024-01-13",
    views: 156,
    comments: 12,
    likes: 8
  },
  {
    id: "board_4",
    title: "이번 주말 북한산 암벽등반 하실 분?",
    content: "이번 주 토요일 북한산 인수봉에서 암벽등반 하실 분 구해요! 5.7-5.10a 수준으로 생각하고 있습니다.",
    author: "록클라이머",
    category: "정보공유",
    createdAt: "2024-01-12",
    views: 203,
    comments: 6,
    likes: 18,
    isHot: true
  }
];

export interface BoardComment {
  id: string;
  postId: string;
  author: string;
  content: string;
  createdAt: string;
}

export const boardComments: BoardComment[] = [
  {
    id: "comment_1",
    postId: "board_1",
    author: "클라이밍선배",
    content: "강남이면 클라이밍파크나 더클라임 추천드려요! 초보자 코스도 잘 되어 있고 강사분들도 친절하시더라구요.",
    createdAt: "2024-01-15"
  },
  {
    id: "comment_2",
    postId: "board_1",
    author: "암벽소녀",
    content: "저도 더클라임 추천! 시설도 깔끔하고 초보자 프로그램도 잘 되어 있어요.",
    createdAt: "2024-01-15"
  }
];

// 중고거래 Mock 데이터
export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  seller: string;
  location: string;
  status: '판매중' | '예약중' | '판매완료';
  image: string;
  createdAt: string;
  views?: number;
  likes: number;
}

export const marketplaceItems: MarketplaceItem[] = [
  {
    id: "market_1",
    title: "스카르파 벨로체 클라이밍화 (245mm)",
    description: "6개월 정도 사용한 스카르파 벨로체입니다. 사이즈가 안 맞아서 판매해요. 상태 양호하고 아직 많이 남았어요!",
    price: 120000,
    category: "신발",
    seller: "클라이머김",
    location: "서울 강남구",
    status: "판매중",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=300&h=200&fit=crop",
    createdAt: "2024-01-15",
    views: 45,
    likes: 7
  },
  {
    id: "market_2",
    title: "페츨 하네스 + 카라비너 세트",
    description: "페츨 하네스와 카라비너 5개 세트로 판매합니다. 실내 클라이밍용으로 구매했는데 야외로 넘어가면서 판매해요.",
    price: 85000,
    category: "하네스",
    seller: "암벽왕자",
    location: "서울 마포구",
    status: "판매중",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=200&fit=crop",
    createdAt: "2024-01-14",
    views: 32,
    likes: 12
  },
  {
    id: "market_3",
    title: "마무트 다이나믹 로프 60m",
    description: "마무트 브랜드 다이나믹 로프 60m입니다. 야외 클라이밍 10회 정도 사용했고 상태 매우 좋습니다.",
    price: 180000,
    category: "로프",
    seller: "산악인",
    location: "서울 송파구",
    status: "예약중",
    image: "https://images.unsplash.com/photo-1549057446-9f5c6ac91a04?w=300&h=200&fit=crop",
    createdAt: "2024-01-13",
    views: 67,
    likes: 15
  },
  {
    id: "market_4",
    title: "라 스포르티바 파이썬 (250mm)",
    description: "라 스포르티바 파이썬 클라이밍화입니다. 1년 정도 사용했지만 관리 잘해서 상태 좋아요. 발볼 넓으신 분께 추천!",
    price: 140000,
    category: "신발",
    seller: "볼더러",
    location: "경기 성남시",
    status: "판매완료",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
    createdAt: "2024-01-12",
    views: 89,
    likes: 23
  }
];
