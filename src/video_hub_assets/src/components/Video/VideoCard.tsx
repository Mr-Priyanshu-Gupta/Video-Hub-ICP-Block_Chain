import React from 'react';
import { Video } from '../../types';
import { formatViews, formatTimeAgo } from '../../utils/formatters';
import { CheckCircle, MoreVertical } from 'lucide-react';

interface VideoCardProps {
  video: Video;
  onVideoClick: (videoId: string) => void;
  size?: 'small' | 'medium' | 'large';
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onVideoClick, size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-48',
    medium: 'w-64 lg:w-72',
    large: 'w-full max-w-sm'
  };

  return (
    <div className={`${sizeClasses[size]} cursor-pointer group transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:shadow-black/50`} onClick={() => onVideoClick(video.id)}>
      {/* Thumbnail */}
      <div className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video mb-3 transition-all duration-300 ease-in-out">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
        
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded backdrop-blur-sm transition-all duration-300 group-hover:bg-orange-500">
          {video.duration}
        </div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Video info */}
      <div className="flex space-x-3">
        {/* Creator avatar */}
        <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 transition-all duration-300 group-hover:ring-2 group-hover:ring-orange-500">
          <img
            src={video.creator.avatar}
            alt={video.creator.username}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Video details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white text-sm font-medium line-clamp-2 group-hover:text-gray-200 transition-colors">
            {video.title}
          </h3>
          
          <div className="flex items-center space-x-1 mt-1">
            <span className="text-gray-400 text-xs hover:text-white transition-colors cursor-pointer">
              {video.creator.username}
            </span>
            {video.creator.isVerified && (
              <CheckCircle className="w-3 h-3 text-gray-400" />
            )}
          </div>
          
          <div className="flex items-center space-x-2 mt-1 text-gray-400 text-xs">
            <span>{formatViews(video.views)} views</span>
            <span>•</span>
            <span>{formatTimeAgo(video.uploadDate)}</span>
          </div>
        </div>

        {/* More options */}
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <button className="p-1 hover:bg-gray-800 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95">
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;