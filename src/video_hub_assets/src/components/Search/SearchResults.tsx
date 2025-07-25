import React from 'react';
import { Video } from '../../types';
import VideoCard from '../Video/VideoCard';
import { Search } from 'lucide-react';

interface SearchResultsProps {
  query: string;
  videos: Video[];
  onVideoClick: (videoId: string) => void;
  isLoading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, videos, onVideoClick, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-white text-lg font-medium mb-2">No results found</h3>
        <p className="text-gray-400">
          Try different keywords or remove search filters
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-white text-xl font-medium">
          Search results for "{query}" ({videos.length} results)
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onVideoClick={onVideoClick}
            size="medium"
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;