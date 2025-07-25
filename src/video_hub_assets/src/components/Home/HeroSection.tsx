import React from 'react';
import { Video } from '../../types';
import { Play, ThumbsUp, Share, CheckCircle } from 'lucide-react';
import { formatViews, formatTimeAgo } from '../../utils/formatters';
import Button from '../UI/Button';

interface HeroSectionProps {
  featuredVideo: Video;
  onVideoClick: (videoId: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ featuredVideo, onVideoClick }) => {
  return (
    <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-lg overflow-hidden mb-8">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={featuredVideo.thumbnail}
          alt={featuredVideo.title}
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 lg:p-12">
        <div className="max-w-4xl">
          {/* Featured badge */}
          <div className="inline-flex items-center space-x-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
            <span>✨ Featured</span>
          </div>

          {/* Title */}
          <h1 className="text-white text-3xl lg:text-5xl font-bold mb-4 leading-tight">
            {featuredVideo.title}
          </h1>

          {/* Creator info */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={featuredVideo.creator.avatar}
                alt={featuredVideo.creator.username}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-white font-medium">{featuredVideo.creator.username}</span>
                {featuredVideo.creator.isVerified && (
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                )}
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>{formatViews(featuredVideo.views)} views</span>
                <span>•</span>
                <span>{formatTimeAgo(featuredVideo.uploadDate)}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-lg mb-6 line-clamp-2 max-w-2xl">
            {featuredVideo.description}
          </p>

          {/* Action buttons */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => onVideoClick(featuredVideo.id)}
              variant="primary"
              size="xl"
              icon={Play}
              iconPosition="left"
            >
              <span>Watch Now</span>
            </Button>

            <Button variant="secondary" size="lg" icon={ThumbsUp} iconPosition="left">
              <span>{featuredVideo.likes}</span>
            </Button>

            <Button variant="secondary" size="lg" icon={Share} iconPosition="left">
              <span>Share</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;