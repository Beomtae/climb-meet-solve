import React from "react";
import { Link, useLocation } from "react-router-dom";
import ClimbingIcon from "./ClimbingIcon";
import { useUserContext } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, User } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const { user, login, logout } = useUserContext();

  const handleLogin = () => {
    const username = prompt("이름을 입력하세요:");
    if (username && username.trim()) {
      login(username.trim());
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center">
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
          >
            <ClimbingIcon className="text-orange-600" size={32} />
            <span>클라이밋</span>
          </Link>
          <div className="flex-1" />
          <div className="flex items-center space-x-6 mr-8">
            <Link
              to="/meetups"
              className={`text-gray-600 hover:text-orange-600 transition-colors ${
                location.pathname.startsWith("/meetups")
                  ? "text-orange-600 font-semibold"
                  : ""
              }`}
            >
              모임
            </Link>
            <Link
              to="/gyms"
              className={`text-gray-600 hover:text-orange-600 transition-colors ${
                location.pathname.startsWith("/gyms")
                  ? "text-orange-600 font-semibold"
                  : ""
              }`}
            >
              암장
            </Link>
            <Link
              to="/board"
              className={`text-gray-600 hover:text-orange-600 transition-colors ${
                location.pathname.startsWith("/board")
                  ? "text-orange-600 font-semibold"
                  : ""
              }`}
            >
              게시판
            </Link>
            <Link
              to="/marketplace"
              className={`text-gray-600 hover:text-orange-600 transition-colors ${
                location.pathname.startsWith("/marketplace")
                  ? "text-orange-600 font-semibold"
                  : ""
              }`}
            >
              중고거래
            </Link>
            <Link
              to="/beginner-guide"
              className={`text-gray-600 hover:text-orange-600 transition-colors ${
                location.pathname.startsWith("/beginner-guide")
                  ? "text-orange-600 font-semibold"
                  : ""
              }`}
            >
              초보 가이드
            </Link>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-sm">
                    <User className="w-4 h-4 mr-2" />
                    {user}님
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/liked-items">
                      <Heart className="mr-2 h-4 w-4" />
                      좋아요한 상품
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/logout">로그아웃</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/login"
                className="px-3 py-1 rounded bg-orange-500 hover:bg-orange-600 text-white text-sm"
              >
                로그인
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
