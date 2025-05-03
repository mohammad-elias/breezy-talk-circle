
export interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

export interface Message {
  id: string;
  userId: string;
  text: string;
  timestamp: Date;
}

export const users: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    isOnline: true,
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "https://i.pravatar.cc/150?img=8",
    isOnline: true,
  },
  {
    id: "3",
    name: "Aisha Patel",
    avatar: "https://i.pravatar.cc/150?img=5",
    isOnline: false,
  },
  {
    id: "4",
    name: "Carlos Rodriguez",
    avatar: "https://i.pravatar.cc/150?img=3",
    isOnline: true,
  },
  {
    id: "5",
    name: "Emma Wilson",
    avatar: "https://i.pravatar.cc/150?img=9",
    isOnline: false,
  },
];

export const currentUser: User = {
  id: "0",
  name: "You",
  avatar: "https://i.pravatar.cc/150?img=11",
  isOnline: true,
};

export const messages: Message[] = [
  {
    id: "m1",
    userId: "1",
    text: "Hey everyone! Who's up for a virtual coffee chat?",
    timestamp: new Date("2023-05-03T10:00:00"),
  },
  {
    id: "m2", 
    userId: "4",
    text: "Count me in! I could use a break from coding all morning.",
    timestamp: new Date("2023-05-03T10:02:00"),
  },
  {
    id: "m3",
    userId: "2",
    text: "Same here! What time are you thinking?",
    timestamp: new Date("2023-05-03T10:05:00"),
  },
  {
    id: "m4",
    userId: "1",
    text: "How about 2pm? That gives everyone time to grab their beverage of choice.",
    timestamp: new Date("2023-05-03T10:07:00"),
  },
  {
    id: "m5",
    userId: "0",
    text: "Sounds perfect! I just made a fresh pot of coffee.",
    timestamp: new Date("2023-05-03T10:09:00"),
  },
  {
    id: "m6",
    userId: "2",
    text: "Great! Looking forward to catching up with everyone.",
    timestamp: new Date("2023-05-03T10:10:00"),
  },
];
