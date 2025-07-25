import React, { useState } from 'react';
import { User } from '../../types';
import { CheckCircle, Settings, Upload, Calendar } from 'lucide-react';
import { formatSubscribers, formatTimeAgo } from '../../utils/formatters';
import Button from '../UI/Button';

interface UserProfileProps {
  user: User;
  isOwnProfile?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, isOwnProfile = false }) => {
  const [activeTab, setActiveTab] = useState('videos');

  const tabs = [
    { id: 'videos', label: 'Videos', count: 24 },
    { id: 'playlists', label: 'Playlists', count: 5 },
    { id: 'about', label: 'About', count: null },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Profile header */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 rounded-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-full h-full object-cover"
            />
          </div>

          {/* User info */}
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-white text-3xl font-bold">{user.username}</h1>
              {user.isVerified && (
                <CheckCircle className="w-8 h-8 text-white" />
              )}
            </div>
            
            <div className="space-y-2 text-white/90">
              <p className="text-lg">{formatSubscribers(user.subscriberCount)}</p>
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="w-4 h-4" />
                <span>Joined {formatTimeAgo(user.createdAt)}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-3 mt-4">
              {isOwnProfile ? (
                <>
                  <Button variant="secondary" size="lg" icon={Settings} iconPosition="left" className="bg-white text-orange-600 hover:bg-gray-100">
                    <span>Customize Channel</span>
                  </Button>
                  <Button variant="ghost" size="lg" icon={Upload} iconPosition="left" className="bg-white/20 text-white hover:bg-white/30">
                    <span>Upload Video</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="secondary" size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                    Subscribe
                  </Button>
                  <Button variant="ghost" size="md" className="bg-white/20 text-white hover:bg-white/30">
                    Message
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="border-b border-gray-700 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant="ghost"
              size="md"
              className={`border-b-2 rounded-none ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-500'
                  : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
              }`}
            >
              {tab.label}
              {tab.count !== null && (
                <span className="ml-2 text-xs">({tab.count})</span>
              )}
            </Button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      <div className="min-h-96">
        {activeTab === 'videos' && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-white text-lg font-medium mb-2">No videos uploaded yet</h3>
            <p className="text-gray-400">
              {isOwnProfile 
                ? 'Start creating content by uploading your first video'
                : `${user.username} hasn't uploaded any videos yet`
              }
            </p>
          </div>
        )}

        {activeTab === 'playlists' && (
          <div className="text-center py-12">
            <h3 className="text-white text-lg font-medium mb-2">No playlists created</h3>
            <p className="text-gray-400">Playlists will appear here once created</p>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-white text-lg font-medium mb-4">About</h3>
            <div className="space-y-4 text-gray-300">
              <div>
                <span className="text-gray-400">Email:</span>
                <span className="ml-2">{user.email}</span>
              </div>
              <div>
                <span className="text-gray-400">Joined:</span>
                <span className="ml-2">{formatTimeAgo(user.createdAt)}</span>
              </div>
              <div>
                <span className="text-gray-400">Subscribers:</span>
                <span className="ml-2">{formatSubscribers(user.subscriberCount)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;