import { useState, useEffect } from 'react';
import { Video } from '../types';
import { mockVideos } from '../data/mockData';

export const useVideo = (videoId?: string) => {
  const [video, setVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!videoId) return;

    setIsLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      const foundVideo = mockVideos.find(v => v.id === videoId);
      if (foundVideo) {
        setVideo(foundVideo);
      } else {
        setError('Video not found');
      }
      setIsLoading(false);
    }, 500);
  }, [videoId]);

  return { video, isLoading, error };
};

export const useVideos = (searchQuery?: string, category?: string) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call with filtering
    setTimeout(() => {
      let filteredVideos = [...mockVideos];
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredVideos = filteredVideos.filter(video =>
          video.title.toLowerCase().includes(query) ||
          video.description.toLowerCase().includes(query) ||
          video.creator.username.toLowerCase().includes(query) ||
          video.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      if (category && category !== 'All') {
        filteredVideos = filteredVideos.filter(video => video.category === category);
      }
      
      setVideos(filteredVideos);
      setIsLoading(false);
    }, 300);
  }, [searchQuery, category]);

  return { videos, isLoading };
};