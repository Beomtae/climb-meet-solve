import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";

const Logout = () => {
  const { logout } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">로그아웃</h1>
        <p className="mb-6 text-gray-700">정말 로그아웃 하시겠습니까?</p>
        <button
          onClick={handleLogout}
          className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default Logout;
