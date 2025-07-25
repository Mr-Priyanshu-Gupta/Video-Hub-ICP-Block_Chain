import React, { useState, useEffect } from 'react';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import VideoCard from './components/Video/VideoCard';
import VideoPlayer from './components/Video/VideoPlayer';
import AuthModal from './components/Auth/AuthModal';
import HeroSection from './components/Home/HeroSection';
import TrendingSection from './components/Home/TrendingSection';
import SearchResults from './components/Search/SearchResults';
import UserProfile from './components/Profile/UserProfile';
import Button from './components/UI/Button';
import { useAuthState } from './hooks/useAuth';
import { useVideos, useVideo } from './hooks/useVideo';
import { mockVideos } from './data/mockData';
import Footer from "./components/Footer/Footer.tsx";

function App() {
  const { user, login, logout, signup, isLoading: authLoading } = useAuthState();
  const [currentPage, setCurrentPage] = useState('home');
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const { videos, isLoading: videosLoading } = useVideos(searchQuery, selectedCategory);
  const { video: currentVideo } = useVideo(currentVideoId || undefined);

  // Featured video for hero section
  const featuredVideo = mockVideos[0];

  const handleVideoClick = (videoId: string) => {
    setCurrentVideoId(videoId);
    setCurrentPage('watch');
    setIsSidebarOpen(false);
  };

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setCurrentPage('search');
    setIsSidebarOpen(false);
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setIsSidebarOpen(false);
    
    // Clear video when navigating away from watch page
    if (page !== 'watch') {
      setCurrentVideoId(null);
    }
  };

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
    setIsSidebarOpen(false);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'watch':
        if (!currentVideo) {
          return (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          );
        }
        return (
          <VideoPlayer 
            video={currentVideo} 
            onBack={() => handlePageChange('home')}
          />
        );

      case 'search':
        return (
          <SearchResults
            query={searchQuery}
            videos={videos}
            onVideoClick={handleVideoClick}
            isLoading={videosLoading}
          />
        );

      case 'trending':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-white text-3xl font-bold">Trending Videos</h1>
              <div className="flex items-center space-x-4">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:border-orange-500 focus:outline-none"
                >
                  <option value="All">All Categories</option>
                  <option value="Technology">Technology</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Cooking">Cooking</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onVideoClick={handleVideoClick}
                  size="medium"
                />
              ))}
            </div>
          </div>
        );

      case 'profile':
        if (!user) {
          return (
            <div className="text-center py-12">
              <h3 className="text-white text-lg font-medium mb-2">Please sign in</h3>
              <p className="text-gray-400 mb-4">You need to be signed in to view your profile</p>
              <Button
                onClick={handleAuthClick}
                variant="primary"
                size="md"
              >
                Sign In
              </Button>
            </div>
          );
        }
        return <UserProfile user={user} isOwnProfile={true} />;

      case 'watchlater':
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⏰</span>
            </div>
            <h3 className="text-white text-lg font-medium mb-2">No videos in Watch Later</h3>
            <p className="text-gray-400">Videos you save for later will appear here</p>
          </div>
        );

      case 'liked':
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👍</span>
            </div>
            <h3 className="text-white text-lg font-medium mb-2">No liked videos</h3>
            <p className="text-gray-400">Videos you like will appear here</p>
          </div>
        );

      case 'playlists':
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📁</span>
            </div>
            <h3 className="text-white text-lg font-medium mb-2">No playlists created</h3>
            <p className="text-gray-400">Create playlists to organize your favorite videos</p>
          </div>
        );

      case 'settings':
        return (
          <div className="max-w-2xl mx-auto">
            <h1 className="text-white text-3xl font-bold mb-8">Settings</h1>
            
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-white text-lg font-medium mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={user?.username || ''}
                      readOnly
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      readOnly
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-white text-lg font-medium mb-4">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Email notifications</span>
                    <input type="checkbox" className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Auto-play videos</span>
                    <input type="checkbox" className="w-4 h-4" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Show mature content</span>
                    <input type="checkbox" className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default: // home
        return (
          <div className="space-y-8">
            <HeroSection
              featuredVideo={featuredVideo}
              onVideoClick={handleVideoClick}
            />
            
            <TrendingSection
              videos={videos}
              onVideoClick={handleVideoClick}
            />

            {/* Recent uploads section */}
            <section>
              <h2 className="text-white text-2xl font-bold mb-6">Recent Uploads</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videos.slice(0, 8).map((video) => (
                  <VideoCard
                    key={`recent-${video.id}`}
                    video={video}
                    onVideoClick={handleVideoClick}
                    size="medium"
                  />
                ))}
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onSearchSubmit={handleSearchSubmit}
        onAuthClick={handleAuthClick}
        currentUser={user}
      />

      <div className="flex pt-16">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          currentUser={user}
          onPageChange={handlePageChange}
          onLogout={handleLogout}
          activePage={currentPage}
        />

        {/* Main content */}
        <main className={`
          flex-1 transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'lg:ml-64' : ''}
          ${currentPage === 'watch' ? 'p-0' : 'p-6'}
        `}>
          <div className={currentPage === 'watch' ? '' : 'max-w-7xl mx-auto'}>
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleAuthModalClose}
        onLogin={login}
        onSignup={signup}
        isLoading={authLoading}
      />
      {/* footer */}
      <Footer/>
    </div>
  );
}

export default App;