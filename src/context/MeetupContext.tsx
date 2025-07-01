import React, { createContext, useContext, useEffect, useState } from "react";
import { Meetup, mockMeetups } from "@/data/mockData";

interface MeetupContextType {
  meetups: Meetup[];
  createMeetup: (
    meetup: Omit<
      Meetup,
      "id" | "currentParticipants" | "status" | "participants"
    >
  ) => void;
  participateMeetup: (id: string, participant: string) => void;
}

const MeetupContext = createContext<MeetupContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "meetups";

const getInitialMeetups = (): Meetup[] => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  return mockMeetups;
};

export const MeetupProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [meetups, setMeetups] = useState<Meetup[]>(getInitialMeetups());

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(meetups));
  }, [meetups]);

  const createMeetup: MeetupContextType["createMeetup"] = (data) => {
    const newMeetup: Meetup = {
      ...data,
      id: Date.now().toString(),
      author: data.author || "익명",
      currentParticipants: 1,
      maxParticipants: Number(data.maxParticipants),
      status: "recruiting",
      participants: [data.author || "익명"],
    };
    setMeetups((prev) => [newMeetup, ...prev]);
  };

  const participateMeetup: MeetupContextType["participateMeetup"] = (
    id,
    participant
  ) => {
    setMeetups((prev) =>
      prev.map((meetup) => {
        if (meetup.id !== id) return meetup;
        if (
          meetup.participants.includes(participant) ||
          meetup.currentParticipants >= meetup.maxParticipants
        ) {
          return meetup;
        }
        const updatedParticipants = [...meetup.participants, participant];
        return {
          ...meetup,
          participants: updatedParticipants,
          currentParticipants: updatedParticipants.length,
          status:
            updatedParticipants.length >= meetup.maxParticipants
              ? "full"
              : "recruiting",
        };
      })
    );
  };

  return (
    <MeetupContext.Provider
      value={{ meetups, createMeetup, participateMeetup }}
    >
      {children}
    </MeetupContext.Provider>
  );
};

export const useMeetupContext = () => {
  const ctx = useContext(MeetupContext);
  if (!ctx) throw new Error("MeetupContext를 Provider로 감싸주세요.");
  return ctx;
};
