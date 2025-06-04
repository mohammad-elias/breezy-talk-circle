
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

export interface Connection {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
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
  {
    id: "6",
    name: "David Kim",
    avatar: "https://i.pravatar.cc/150?img=6",
    isOnline: true,
  },
  {
    id: "7",
    name: "Lisa Zhang",
    avatar: "https://i.pravatar.cc/150?img=7",
    isOnline: false,
  },
  {
    id: "8",
    name: "Alex Thompson",
    avatar: "https://i.pravatar.cc/150?img=4",
    isOnline: true,
  },
];

export const currentUser: User = {
  id: "0",
  name: "You",
  avatar: "https://i.pravatar.cc/150?img=11",
  isOnline: true,
};

// Sample connections data
export const connections: Connection[] = [
  {
    id: "c1",
    fromUserId: "0",
    toUserId: "1",
    status: "accepted",
    createdAt: new Date("2023-05-01T10:00:00"),
  },
  {
    id: "c2",
    fromUserId: "2",
    toUserId: "0",
    status: "pending",
    createdAt: new Date("2023-05-02T14:30:00"),
  },
  {
    id: "c3",
    fromUserId: "0",
    toUserId: "4",
    status: "accepted",
    createdAt: new Date("2023-05-01T16:45:00"),
  },
];

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
