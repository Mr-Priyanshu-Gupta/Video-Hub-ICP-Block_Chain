import React from 'react';
import { Video } from '../../types';
import VideoCard from '../Video/VideoCard';
import { TrendingUp } from 'lucide-react';

interface TrendingSectionProps {
  videos: Video[];
  onVideoClick: (videoId: string) => void;
}

const TrendingSection: React.FC<TrendingSectionProps> = ({ videos, onVideoClick }) => {
  return (
    <section className="mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <TrendingUp className="w-6 h-6 text-green-500" />
        <h2 className="text-white text-2xl font-bold">Trending Now</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {videos.slice(0, 8).map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onVideoClick={onVideoClick}
            size="medium"
          />
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;