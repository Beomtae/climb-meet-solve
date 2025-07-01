import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";

const Login = () => {
  const { login } = useUserContext();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    login(username.trim());
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">로그인</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="이름을 입력하세요"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all"
          >
            로그인
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-600">아직 회원이 아니신가요? </span>
          <Link
            to="/signup"
            className="text-orange-600 hover:underline font-semibold"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
