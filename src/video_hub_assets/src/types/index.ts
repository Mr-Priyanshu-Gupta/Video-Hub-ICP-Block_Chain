export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  subscriberCount: number;
  isVerified: boolean;
  createdAt: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  views: number;
  likes: number;
  dislikes: number;
  uploadDate: string;
  creator: User;
  tags: string[];
  category: string;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  videos: Video[];
  thumbnail: string;
  creator: User;
  isPublic: boolean;
  createdAt: string;
}