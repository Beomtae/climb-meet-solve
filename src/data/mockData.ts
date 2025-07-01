
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
  status: 'recruiting' | 'full';
  participants: string[];
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

export const mockMeetups: Meetup[] = [
  {
    id: '1',
    title: '주말 클라이밍 정모',
    author: '김클라이머',
    date: '2025-01-05',
    time: '14:00',
    location: '더클라임 강남점',
    currentParticipants: 3,
    maxParticipants: 6,
    description: '주말에 편하게 클라이밍하실 분들 모집합니다. 초보자도 환영!',
    status: 'recruiting',
    participants: ['김클라이머', '이산악', '박등반']
  },
  {
    id: '2',
    title: '볼더링 스터디 모임',
    author: '최등반',
    date: '2025-01-06',
    time: '19:00',
    location: '클라이밍파크 홍대점',
    currentParticipants: 4,
    maxParticipants: 4,
    description: '볼더링 기술 향상을 위한 스터디 모임입니다.',
    status: 'full',
    participants: ['최등반', '정클라임', '강산악', '조바위']
  },
  {
    id: '3',
    title: '초보자 환영 클라이밍',
    author: '이초보',
    date: '2025-01-07',
    time: '18:30',
    location: '더클라임 잠실점',
    currentParticipants: 2,
    maxParticipants: 8,
    description: '클라이밍을 처음 시작하시는 분들을 위한 모임입니다. 천천히 기초부터!',
    status: 'recruiting',
    participants: ['이초보', '김신입']
  }
];

export const mockGyms: Gym[] = [
  {
    id: '1',
    name: '더클라임 강남점',
    location: '서울 강남구',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop',
    sections: ['A섹션', 'B섹션', 'C섹션', 'D섹션'],
    colors: ['흰색', '노랑', '초록', '파랑', '빨강', '검정']
  },
  {
    id: '2',
    name: '클라이밍파크 홍대점',
    location: '서울 마포구',
    image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=400&h=300&fit=crop',
    sections: ['1구역', '2구역', '3구역'],
    colors: ['흰색', '노랑', '초록', '파랑', '빨강', '보라']
  },
  {
    id: '3',
    name: '더클라임 잠실점',
    location: '서울 송파구',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop',
    sections: ['East', 'West', 'Center'],
    colors: ['흰색', '노랑', '초록', '파랑', '빨강', '오렌지']
  }
];

export const mockProblems: Problem[] = [
  {
    id: '1',
    gymId: '1',
    section: 'A섹션',
    color: '노랑',
    difficulty: 'V2',
    thumbnail: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=300&h=200&fit=crop',
    title: '기본 오버행 문제',
    description: '오버행 구간에서의 기본 밸런스를 연습할 수 있는 문제입니다.'
  },
  {
    id: '2',
    gymId: '1',
    section: 'A섹션',
    color: '초록',
    difficulty: 'V4',
    thumbnail: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=300&h=200&fit=crop',
    title: '파워풀한 다이노 문제',
    description: '강한 다이나믹 무브가 필요한 도전적인 문제입니다.'
  },
  {
    id: '3',
    gymId: '1',
    section: 'B섹션',
    color: '파랑',
    difficulty: 'V3',
    thumbnail: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=300&h=200&fit=crop',
    title: '테크니컬 슬랩',
    description: '정확한 풋워크와 밸런스가 중요한 슬랩 문제입니다.'
  }
];
