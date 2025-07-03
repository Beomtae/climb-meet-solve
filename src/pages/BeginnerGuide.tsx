import React from "react";
import Header from "@/components/Header";
import { Link } from "react-router-dom";

const BeginnerGuide = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          클라이밍 초보 가이드
        </h1>
        <section className="mb-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-orange-600 mb-3">
            클라이밍이란?
          </h2>
          <p className="text-gray-700 mb-2">
            클라이밍은 벽이나 암벽을 오르는 스포츠로, 근력과 유연성, 집중력,
            그리고 문제 해결 능력을 함께 기를 수 있습니다. 실내 암장에서는
            볼더링, 리드, 탑로프 등 다양한 방식으로 즐길 수 있습니다.
          </p>
        </section>
        <section className="mb-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-orange-600 mb-3">기본 룰</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>암장 내에서는 반드시 지정된 등반 코스(문제)만 이용하세요.</li>
            <li>매트 위에서는 뛰거나 장난치지 않습니다.</li>
            <li>등반 전·후에는 손을 깨끗이 씻고, 초크를 적당히 사용하세요.</li>
            <li>다른 사람이 등반 중일 때는 벽 아래에서 대기하지 않습니다.</li>
            <li>자신의 실력에 맞는 코스부터 도전하세요.</li>
          </ul>
        </section>
        <section className="mb-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-orange-600 mb-3">
            클라이밍 에티켓
          </h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>등반 중인 사람을 방해하지 않기</li>
            <li>순서를 지키고, 대기 중인 사람이 있으면 양보하기</li>
            <li>큰 소리로 떠들거나 음악을 크게 틀지 않기</li>
            <li>장비(홀드, 매트 등)를 소중히 다루기</li>
            <li>초보자/타인에게 친절하게 조언하기</li>
          </ul>
        </section>
        <section className="mb-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-orange-600 mb-3">
            초보 추천 암장 & 코스
          </h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>
              <span className="font-semibold">더클라임 강남점</span> - 다양한
              난이도의 볼더링 코스, 친절한 입문 강습
            </li>
            <li>
              <span className="font-semibold">클라이밍파크 홍대점</span> -
              초보자 전용 구역, 쉬운 V0~V2 코스 다수
            </li>
            <li>
              <span className="font-semibold">더클라임 잠실점</span> - 넓은
              공간, 초보자용 슬랩/오버행 코스
            </li>
          </ul>
          <div className="mt-4 text-sm text-gray-500">
            * 각 암장별 상세 정보는{" "}
            <Link to="/gyms" className="text-orange-600 underline">
              암장 정보
            </Link>
            에서 확인할 수 있습니다.
          </div>
        </section>
        <section className="mb-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-orange-600 mb-3">
            초보자를 위한 팁
          </h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>처음엔 무리하지 말고, 충분한 휴식과 스트레칭을 하세요.</li>
            <li>다양한 코스를 시도하며, 실패를 두려워하지 마세요.</li>
            <li>손가락, 팔, 어깨 부상에 주의하세요.</li>
            <li>등반 후에는 손을 깨끗이 씻고, 충분히 수분을 섭취하세요.</li>
            <li>궁금한 점은 암장 스태프나 다른 클라이머에게 물어보세요.</li>
          </ul>
        </section>
        <div className="text-center mt-8">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-all"
          >
            메인으로 돌아가기
          </Link>
        </div>
      </main>
    </div>
  );
};

export default BeginnerGuide;
