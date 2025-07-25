import React, { useState } from 'react';
import { Comment } from '../../types';
import { ThumbsUp, MoreVertical, Reply } from 'lucide-react';
import { formatTimeAgo } from '../../utils/formatters';
import Button from '../UI/Button';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
  currentUser: any;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, onAddComment, currentUser }) => {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && currentUser) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-white text-lg font-medium mb-6">
        {comments.length} Comments
      </h3>

      {/* Add comment form */}
      {currentUser ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="flex space-x-4">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.username}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-colors resize-none"
                rows={3}
              />
              <div className="flex items-center justify-end space-x-3 mt-3">
                <Button
                  type="button"
                  onClick={() => setNewComment('')}
                  variant="ghost"
                  size="sm"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!newComment.trim()}
                  variant="primary"
                  size="sm"
                >
                  Comment
                </Button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="text-center py-6 border border-gray-700 rounded-lg mb-8">
          <p className="text-gray-400 mb-3">Sign in to leave a comment</p>
          <Button variant="primary" size="md">
            Sign In
          </Button>
        </div>
      )}

      {/* Comments list */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-4">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={comment.user.avatar}
                alt={comment.user.username}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-white font-medium">{comment.user.username}</span>
                <span className="text-gray-400 text-sm">
                  {formatTimeAgo(comment.timestamp)}
                </span>
              </div>
              
              <p className="text-gray-300 mb-3">{comment.content}</p>
              
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" icon={ThumbsUp} iconPosition="left">
                  <span>{comment.likes}</span>
                </Button>
                
                <Button
                  onClick={() => setReplyingTo(comment.id)}
                  variant="ghost"
                  size="sm"
                  icon={Reply}
                  iconPosition="left"
                >
                  <span>Reply</span>
                </Button>
                
                <Button variant="ghost" size="sm" icon={MoreVertical} />
              </div>

              {/* Reply form */}
              {replyingTo === comment.id && currentUser && (
                <div className="mt-4 pl-4 border-l-2 border-gray-700">
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.username}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <textarea
                        placeholder={`Reply to ${comment.user.username}...`}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-colors resize-none"
                        rows={2}
                      />
                      <div className="flex items-center justify-end space-x-2 mt-2">
                        <Button
                          onClick={() => setReplyingTo(null)}
                          variant="ghost"
                          size="sm"
                        >
                          Cancel
                        </Button>
                        <Button variant="primary" size="sm">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 pl-4 border-l-2 border-gray-700 space-y-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex space-x-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={reply.user.avatar}
                          alt={reply.user.username}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-white font-medium text-sm">{reply.user.username}</span>
                          <span className="text-gray-400 text-xs">
                            {formatTimeAgo(reply.timestamp)}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm">{reply.content}</p>
                        
                        <div className="flex items-center space-x-3 mt-2">
                          <Button variant="ghost" size="sm" icon={ThumbsUp} iconPosition="left">
                            <span className="text-xs">{reply.likes}</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;