import React, { useState, useRef, useEffect } from 'react';
import { Video } from '../../types';
import { ThumbsUp, ThumbsDown, Share, Download, MoreHorizontal, CheckCircle } from 'lucide-react';
import { formatViews, formatTimeAgo, formatSubscribers } from '../../utils/formatters';
import Button from '../UI/Button';

interface VideoPlayerProps {
  video: Video;
  onBack: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onBack }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isDisliked) setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    if (isLiked) setIsLiked(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };
  const handleFullDescription = () =>{
    setShowFullDescription(!showFullDescription);
    if(true){
      setShowFullDescription(false);
    } 
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Back button */}
      <div className="mb-4">
        <Button onClick={onBack} variant="ghost" size="md">
          Back
        </Button>
      </div>

      {/* Video player */}
      <div className="bg-black rounded-lg overflow-hidden mb-6">
        <video
          ref={videoRef}
          controls
          className="w-full aspect-video"
          poster={video.thumbnail}
        >
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Video title */}
          <h1 className="text-white text-xl lg:text-2xl font-bold mb-4 leading-tight">
            {video.title}
          </h1>

          {/* Video stats and actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 text-gray-400 text-sm">
              <span>{formatViews(video.views)} views</span>
              <span>•</span>
              <span>{formatTimeAgo(video.uploadDate)}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                onClick={handleLike}
                variant={isLiked ? 'primary' : 'secondary'}
                size="md"
                icon={ThumbsUp}
                iconPosition="left"
              >
                <span>{video.likes + (isLiked ? 1 : 0)}</span>
              </Button>

              <Button
                onClick={handleDislike}
                variant={isDisliked ? 'secondary' : 'ghost'}
                size="md"
                icon={ThumbsDown}
              >
                <span>{video.dislikes + (isDisliked ? 1 : 0)}</span>
              </Button>

              <Button
                onClick={handleShare}
                variant="secondary"
                size="md"
                icon={Share}
                iconPosition="left"
              >
                <span className="hidden sm:block">Share</span>
              </Button>

              <Button variant="secondary" size="md" icon={Download} iconPosition="left">
                <span className="hidden sm:block">Download</span>
              </Button>

              <Button 
              onClick={handleFullDescription}
                variant="ghost"
                size="md" 
                icon={MoreHorizontal} 
              />
            </div>
          </div>

          {/* Creator info */}
          <div className="flex items-start space-x-4 p-4 bg-gray-800 rounded-lg mb-6">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={video.creator.avatar}
                alt={video.creator.username}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-white font-medium">{video.creator.username}</h3>
                {video.creator.isVerified && (
                  <CheckCircle className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <p className="text-gray-400 text-sm mb-3">
                {formatSubscribers(video.creator.subscriberCount)}
              </p>
              
              <div className={`text-gray-300 text-sm ${showFullDescription ? '' : 'line-clamp-3'}`}>
                {video.description}
              </div>
              
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-gray-400 text-sm mt-2 hover:text-white transition-colors"
              >
                {showFullDescription ? 'Show less' : 'Show more'}
              </button>
            </div>

            <Button
              onClick={() => setIsSubscribed(!isSubscribed)}
              variant={isSubscribed ? 'secondary' : 'primary'}
              size="lg"
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </Button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {video.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 hover:shadow-md hover:text-orange-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Sidebar - Related videos would go here */}
        <div className="lg:col-span-1">
          <h3 className="text-white text-lg font-medium mb-4">Up Next</h3>
          <div className="space-y-4">
            {/* Placeholder for related videos */}
            <div className="text-gray-400 text-center py-8">
              Related videos would appear here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;