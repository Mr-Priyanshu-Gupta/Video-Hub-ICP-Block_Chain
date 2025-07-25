import { User, Video, Comment } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'TechCreator',
    email: 'tech@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    subscriberCount: 125000,
    isVerified: true,
    createdAt: '2023-01-15T00:00:00Z'
  },
  {
    id: '2',
    username: 'GameMaster',
    email: 'game@example.com',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400',
    subscriberCount: 89000,
    isVerified: true,
    createdAt: '2023-02-10T00:00:00Z'
  },
  {
    id: '3',
    username: 'CookingPro',
    email: 'cooking@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    subscriberCount: 67000,
    isVerified: false,
    createdAt: '2023-03-05T00:00:00Z'
  }
];

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Building Modern Web Applications with React and TypeScript',
    description: 'Learn how to build scalable web applications using React, TypeScript, and modern development practices.',
    thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    duration: '15:42',
    views: 45230,
    likes: 2100,
    dislikes: 45,
    uploadDate: '2024-01-15T10:30:00Z',
    creator: mockUsers[0],
    tags: ['react', 'typescript', 'web development', 'programming'],
    category: 'Technology'
  },
  {
    id: '2',
    title: 'Epic Gaming Montage - Best Moments 2024',
    description: 'Check out the most epic gaming moments from popular games this year. Subscribe for more!',
    thumbnail: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    duration: '8:15',
    views: 128500,
    likes: 8900,
    dislikes: 120,
    uploadDate: '2024-01-20T14:15:00Z',
    creator: mockUsers[1],
    tags: ['gaming', 'montage', 'highlights', 'entertainment'],
    category: 'Gaming'
  },
  {
    id: '3',
    title: 'Perfect Pasta Recipe - Italian Style Cooking',
    description: 'Master the art of making perfect pasta from scratch with this traditional Italian recipe.',
    thumbnail: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    duration: '12:30',
    views: 67800,
    likes: 4200,
    dislikes: 78,
    uploadDate: '2024-01-18T16:45:00Z',
    creator: mockUsers[2],
    tags: ['cooking', 'pasta', 'italian', 'recipe', 'food'],
    category: 'Cooking'
  },
  {
    id: '4',
    title: 'Advanced JavaScript Concepts You Need to Know',
    description: 'Deep dive into advanced JavaScript concepts including closures, promises, and async/await.',
    thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    duration: '22:18',
    views: 89300,
    likes: 5600,
    dislikes: 95,
    uploadDate: '2024-01-12T09:20:00Z',
    creator: mockUsers[0],
    tags: ['javascript', 'programming', 'web development', 'advanced'],
    category: 'Technology'
  },
  {
    id: '5',
    title: 'Ultimate Gaming Setup Tour 2024',
    description: 'Check out my ultimate gaming setup with the latest tech and RGB lighting!',
    thumbnail: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    duration: '11:25',
    views: 156700,
    likes: 12400,
    dislikes: 180,
    uploadDate: '2024-01-25T12:00:00Z',
    creator: mockUsers[1],
    tags: ['gaming', 'setup', 'tech', 'rgb', 'pc'],
    category: 'Gaming'
  },
  {
    id: '6',
    title: 'Healthy Meal Prep for the Week',
    description: 'Prepare healthy and delicious meals for the entire week with this comprehensive guide.',
    thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    duration: '18:45',
    views: 94200,
    likes: 7800,
    dislikes: 120,
    uploadDate: '2024-01-22T08:30:00Z',
    creator: mockUsers[2],
    tags: ['meal prep', 'healthy', 'cooking', 'nutrition', 'lifestyle'],
    category: 'Cooking'
  }
];

export const mockComments: Comment[] = [
  {
    id: '1',
    user: mockUsers[1],
    content: 'Great tutorial! This really helped me understand React hooks better.',
    timestamp: '2024-01-16T12:30:00Z',
    likes: 45
  },
  {
    id: '2',
    user: mockUsers[2],
    content: 'Amazing explanation. Could you make a video about state management next?',
    timestamp: '2024-01-16T14:15:00Z',
    likes: 23
  },
  {
    id: '3',
    user: mockUsers[0],
    content: 'Thanks for watching! State management video coming soon!',
    timestamp: '2024-01-16T15:00:00Z',
    likes: 67
  }
];