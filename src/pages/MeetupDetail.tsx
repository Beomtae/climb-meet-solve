import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, ArrowLeft, Send } from "lucide-react";
import Header from "@/components/Header";
import { useMeetupContext } from "@/context/MeetupContext";
import { useToast } from "@/hooks/use-toast";
import { useUserContext } from "@/context/UserContext";
import { useChatContext } from "@/context/ChatContext";

const MeetupDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { meetups, participateMeetup } = useMeetupContext();
  const { user } = useUserContext();
  const { getMessages, sendMessage } = useChatContext();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const meetup = meetups.find((m) => m.id === id);
  const messages = id ? getMessages(id) : [];
  const [isParticipating, setIsParticipating] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !id) return;

    sendMessage(id, user, newMessage.trim());
    setNewMessage("");
  };

  if (!meetup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            모임을 찾을 수 없습니다
          </h1>
          <Link
            to="/meetups"
            className="text-orange-600 hover:text-orange-700 mt-4 inline-block"
          >
            모임 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const handleParticipate = () => {
    if (meetup?.status === "full") {
      toast({
        title: "참가 불가",
        description: "이미 모집이 완료된 모임입니다.",
        variant: "destructive",
      });
      return;
    }
    participateMeetup(meetup!.id, user || "익명");
    setIsParticipating(true);
    toast({
      title: "참가 완료!",
      description: `${meetup!.title} 모임에 참가하셨습니다.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Link
          to="/meetups"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>모임 목록으로</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <h1 className="text-3xl font-bold text-gray-800">
                {meetup.title}
              </h1>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  meetup.status === "recruiting"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {meetup.status === "recruiting" ? "모집중" : "모집완료"}
              </span>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              {meetup.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                모임 정보
              </h3>

              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <Calendar className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="font-semibold text-gray-800">날짜</div>
                  <div className="text-gray-600">{meetup.date}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <Clock className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="font-semibold text-gray-800">시간</div>
                  <div className="text-gray-600">{meetup.time}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <MapPin className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="font-semibold text-gray-800">장소</div>
                  <div className="text-gray-600">{meetup.location}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <Users className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="font-semibold text-gray-800">인원</div>
                  <div className="text-gray-600">
                    {meetup.currentParticipants}/{meetup.maxParticipants}명
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                참가자 목록
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {meetup.participants.map((participant, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {participant[0]}
                    </div>
                    <span className="text-gray-800">{participant}</span>
                    {index === 0 && (
                      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                        주최자
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* 실시간 채팅 */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  모임 채팅
                </h3>
                {user && meetup.participants.includes(user) ? (
                  <div className="bg-white rounded-lg border border-orange-200 h-96 flex flex-col">
                    {/* 메시지 목록 */}
                    <div className="flex-1 p-4 overflow-y-auto">
                      <div className="space-y-3">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${
                              message.user === user
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                message.user === user
                                  ? "bg-orange-500 text-white"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {message.user !== user && (
                                <div className="text-xs font-semibold mb-1 text-orange-600">
                                  {message.user}
                                </div>
                              )}
                              <div className="text-sm">{message.message}</div>
                              <div className="text-xs opacity-70 mt-1">
                                {new Date(message.timestamp).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    </div>

                    {/* 메시지 입력 */}
                    <form
                      onSubmit={handleSendMessage}
                      className="border-t border-orange-200 p-4 flex space-x-2"
                    >
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="메시지를 입력하세요..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <p className="text-gray-600">
                      {user
                        ? "모임에 참가하시면 채팅에 참여할 수 있습니다."
                        : "로그인 후 모임에 참가하시면 채팅에 참여할 수 있습니다."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => {
                if (!user) {
                  window.alert("로그인이 필요합니다");
                  return;
                }
                handleParticipate();
              }}
              disabled={meetup.status === "full" || isParticipating || !user}
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                meetup.status === "full" || isParticipating || !user
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl"
              }`}
            >
              {isParticipating
                ? "참가 완료!"
                : meetup.status === "full"
                ? "모집 완료"
                : "참가하기"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MeetupDetail;
