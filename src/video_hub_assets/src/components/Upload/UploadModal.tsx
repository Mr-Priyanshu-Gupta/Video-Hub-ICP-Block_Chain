import React, { useState } from 'react';
import { X, Upload, Video, Image } from 'lucide-react';
import Button from '../UI/Button';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (videoData: any) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    category: 'Technology',
    thumbnail: null as File | null,
    video: null as File | null
  });
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));

    const videoData = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      category: formData.category,
      duration: '10:30', // Mock duration
      views: 0,
      likes: 0,
      dislikes: 0,
      uploadDate: new Date().toISOString(),
      thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
    };

    onUpload(videoData);
    setIsUploading(false);
    onClose();
    setFormData({
      title: '',
      description: '',
      tags: '',
      category: 'Technology',
      thumbnail: null,
      video: null
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'video' | 'thumbnail') => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [type]: file }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-white text-xl font-bold">Upload Video</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 hover:rotate-90"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Video upload */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Video File *
            </label>
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-orange-500 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/10">
              <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">
                {formData.video ? formData.video.name : 'Click to upload or drag and drop'}
              </p>
              <p className="text-gray-500 text-sm">MP4, WebM up to 100MB</p>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleFileChange(e, 'video')}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                required
              />
            </div>
          </div>

          {/* Thumbnail upload */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Thumbnail
            </label>
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-orange-500 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/10">
              <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">
                {formData.thumbnail ? formData.thumbnail.name : 'Upload custom thumbnail'}
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'thumbnail')}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-gray-300 text-sm font-medium mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
              maxLength={100}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-colors"
              placeholder="Enter video title"
            />
            <p className="text-gray-500 text-sm mt-1">{formData.title.length}/100</p>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-gray-300 text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              maxLength={1000}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-colors resize-none"
              placeholder="Tell viewers about your video"
            />
            <p className="text-gray-500 text-sm mt-1">{formData.description.length}/1000</p>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-gray-300 text-sm font-medium mb-2">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-colors"
              placeholder="Enter tags separated by commas"
            />
            <p className="text-gray-500 text-sm mt-1">Help people find your video</p>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-gray-300 text-sm font-medium mb-2">
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none transition-colors"
            >
              <option value="Technology">Technology</option>
              <option value="Gaming">Gaming</option>
              <option value="Cooking">Cooking</option>
              <option value="Music">Music</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </div>

          {/* Submit buttons */}
          <div className="flex items-center justify-end space-x-4 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="ghost"
              size="md"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUploading || !formData.title || !formData.video}
              variant="primary"
              size="md"
              icon={Upload}
              iconPosition="left"
              loading={isUploading}
            >
              <span>{isUploading ? 'Uploading...' : 'Upload Video'}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;