import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MeetupList from "./pages/MeetupList";
import MeetupDetail from "./pages/MeetupDetail";
import CreateMeetup from "./pages/CreateMeetup";
import GymList from "./pages/GymList";
import GymDetail from "./pages/GymDetail";
import NotFound from "./pages/NotFound";
import { MeetupProvider } from "./context/MeetupContext";
import { UserProvider } from "./context/UserContext";
import { ChatProvider } from "./context/ChatContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Logout from "./pages/Logout";
import { VideoProvider } from "./context/VideoContext";
import ProblemDetail from "./pages/ProblemDetail";
import BoardList from "./pages/BoardList";
import BoardDetail from "./pages/BoardDetail";
import BoardCreate from "./pages/BoardCreate";
import MarketplaceList from "./pages/MarketplaceList";
import MarketplaceDetail from "./pages/MarketplaceDetail";
import MarketplaceCreate from "./pages/MarketplaceCreate";
import LikedItems from "./pages/LikedItems";

const queryClient = new QueryClient();

const App = () => (
  <UserProvider>
    <MeetupProvider>
      <ChatProvider>
        <VideoProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/meetups" element={<MeetupList />} />
                  <Route path="/meetups/create" element={<CreateMeetup />} />
                  <Route path="/meetups/:id" element={<MeetupDetail />} />
                  <Route path="/gyms" element={<GymList />} />
                  <Route path="/gyms/:id" element={<GymDetail />} />
                  <Route path="/problems/:id" element={<ProblemDetail />} />
                  <Route path="/board" element={<BoardList />} />
                  <Route path="/board/create" element={<BoardCreate />} />
                  <Route path="/board/:id" element={<BoardDetail />} />
                  <Route path="/marketplace" element={<MarketplaceList />} />
                  <Route path="/marketplace/create" element={<MarketplaceCreate />} />
                  <Route path="/marketplace/:id" element={<MarketplaceDetail />} />
                  <Route path="/liked-items" element={<LikedItems />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </QueryClientProvider>
        </VideoProvider>
      </ChatProvider>
    </MeetupProvider>
  </UserProvider>
);

export default App;
