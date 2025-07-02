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
  image: string;
  sections: string[];
  colors: string[];
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
  "김클라이머": {
    username: "김클라이머",
    level: "intermediate",
    ageGroup: "30s",
    gender: "male",
    climbingStyle: "bouldering",
    techLevel: "V4-V7",
  },
  "이산악": {
    username: "이산악",
    level: "advanced",
    ageGroup: "30s",
    gender: "male",
    climbingStyle: "all",
    techLevel: "V8-V11",
  },
  "박등반": {
    username: "박등반",
    level: "beginner",
    ageGroup: "20s",
    gender: "female",
    climbingStyle: "bouldering",
    techLevel: "V0-V3",
  },
  "최등반": {
    username: "최등반",
    level: "advanced",
    ageGroup: "40s",
    gender: "male",
    climbingStyle: "bouldering",
    techLevel: "V12+",
  },
  "정클라임": {
    username: "정클라임",
    level: "intermediate",
    ageGroup: "30s",
    gender: "female",
    climbingStyle: "lead",
    techLevel: "V4-V7",
  },
  "강산악": {
    username: "강산악",
    level: "advanced",
    ageGroup: "40s",
    gender: "male",
    climbingStyle: "all",
    techLevel: "V8-V11",
  },
  "조바위": {
    username: "조바위",
    level: "intermediate",
    ageGroup: "20s",
    gender: "male",
    climbingStyle: "bouldering",
    techLevel: "V4-V7",
  },
  "이초보": {
    username: "이초보",
    level: "beginner",
    ageGroup: "20s",
    gender: "male",
    climbingStyle: "toprope",
    techLevel: "V0-V3",
  },
  "김신입": {
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
      levelRequired: "intermediate",
      ageGroup: "any",
      genderPreference: "any",
      climbingStyle: "bouldering",
      techLevel: "V4-V7",
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
      levelRequired: "advanced",
      ageGroup: "any",
      genderPreference: "any",
      climbingStyle: "bouldering",
      techLevel: "V8-V11",
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
      ageGroup: "20s",
      genderPreference: "any",
      climbingStyle: "all",
      techLevel: "V0-V3",
    },
  },
];

export const mockGyms: Gym[] = [
  {
    id: "1",
    name: "더클라임 강남점",
    location: "서울 강남구",
    image:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20221025_87%2F1666674763427DfSNN_JPEG%2FCCA27AB7-09DA-40C9-862F-B3EF2FC8441D.jpeg",
    sections: ["A섹션", "B섹션", "C섹션", "D섹션"],
    colors: ["흰색", "노랑", "초록", "파랑", "빨강", "검정"],
  },
  {
    id: "2",
    name: "클라이밍파크 홍대점",
    location: "서울 마포구",
    image:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20241207_78%2F1733574894879Ya4yG_JPEG%2FIMG_20241127_230612_020.jpg",
    sections: ["1구역", "2구역", "3구역"],
    colors: ["흰색", "노랑", "초록", "파랑", "빨강", "보라"],
  },
  {
    id: "3",
    name: "더클라임 잠실점",
    location: "서울 송파구",
    image:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyNTA2MjJfMjYx%2FMDAxNzUwNTk0MDc5NDAz.dZBzuyWC0MQvAbZVQ0ETPKaVLlf69peILD6kaDABfosg.YzFjmHzkQiscO1oPb9sEPYP64jj3h0RWuVRzLsKr3Xwg.JPEG%2FIMG_6883.jpeg%3Ftype%3Dw1500_60_sharpen",
    sections: ["East", "West", "Center"],
    colors: ["흰색", "노랑", "초록", "파랑", "빨강", "오렌지"],
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
