'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface Mention {
  id: number;
  postId: number;
  user: string;
  message: string;
  timestamp: string;
}

interface Post {
  id: number;
  user: string;
  content: string;
  timestamp: string;
}

const MentionItem: React.FC<{ mention: Mention; onClick: () => void }> = ({ mention, onClick }) => (
  <div onClick={onClick} className="flex items-start space-x-2 p-2 hover:bg-gray-700 cursor-pointer">
    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
      {mention.user.charAt(0).toUpperCase()}
    </div>
    <div className="flex-1">
      <div className="flex items-center space-x-1">
        <span className="font-semibold text-sm text-blue-400">@{mention.user}</span>
        <span className="text-gray-400 text-xs">{mention.timestamp}</span>
      </div>
      <p className="text-sm truncate text-gray-300">{mention.message}</p>
    </div>
  </div>
);

const PostItem: React.FC<Post> = ({ user, content, timestamp }) => (
  <div className="border-b border-gray-700 p-4 hover:bg-gray-800">
    <div className="flex items-start space-x-3">
      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
        {user.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-1">
          <span className="font-semibold text-gray-200">{user}</span>
          <span className="text-gray-400 text-sm">@{user.toLowerCase()} · {timestamp}</span>
        </div>
        <p className="mt-1 text-gray-300">{content}</p>
      </div>
    </div>
  </div>
);

export default function Home() {
  const [mentions, setMentions] = useState<Mention[]>([
    { id: 1, postId: 3, user: 'Alice', message: 'Check out this new feature!', timestamp: '10:00 AM' },
    { id: 2, postId: 2, user: 'Bob', message: 'Great work on the project!', timestamp: '11:30 AM' },
    { id: 3, postId: 1, user: 'Charlie', message: 'Meeting at 3 PM today', timestamp: '12:15 PM' },
  ]);

  const [posts, setPosts] = useState<Post[]>([
    { id: 1, user: 'David', content: '"捨てないデザインによって可能になる可逆デザインは、人間の自由意志の証明でもある。\n未来へのアクセスを可能にする可逆性を、如何にして現在の社会に実装するかが、人新世の時代のデザインにとって、極めて重要なテーマになるだろう"https://ekrits.jp/2024/06/8229/', timestamp: '9:00 AM' },
    { id: 2, user: 'Eva', content: 'Excited for the conference next week! @Bob are you going?', timestamp: '10:15 AM' },
    { id: 3, user: 'Frank', content: 'Working on a new project. @Charlie, can you help with the design?', timestamp: '11:45 AM' },
  ]);

  const [newPost, setNewPost] = useState('');
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now(),
        user: 'You',
        content: newPost,
        timestamp: new Date().toLocaleTimeString()
      };
      setPosts(prevPosts => [...prevPosts, post]);

      // Check for mentions
      const mentionRegex = /@(\w+)/g;
      const mentionMatches = newPost.match(mentionRegex);
      if (mentionMatches) {
        const newMentions = mentionMatches.map(match => ({
          id: Date.now() + Math.random(),
          postId: post.id,
          user: match.slice(1),
          message: newPost,
          timestamp: new Date().toLocaleTimeString()
        }));
        setMentions(prevMentions => [...newMentions, ...prevMentions]);
      }

      setNewPost('');
    }
  };

  const jumpToPost = (postId: number) => {
    const postElement = document.getElementById(`post-${postId}`);
    if (postElement && timelineRef.current) {
      timelineRef.current.scrollTop = postElement.offsetTop - timelineRef.current.offsetTop;
    }
  };

  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.scrollTop = timelineRef.current.scrollHeight;
    }
  }, [posts]);

  return (
    <>
      {/* Mentions Column */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 overflow-y-auto">
        <h2 className="text-xl font-bold p-4 border-b border-gray-700 text-gray-200">助言できるかも?</h2>
        {mentions.map(mention => (
          <MentionItem key={mention.id} mention={mention} onClick={() => jumpToPost(mention.postId)} />
        ))}
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-900">
        <header className="bg-gray-800 p-4 border-b border-gray-700 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-200">Timeline</h1>
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            Y
          </div>
        </header>
        
        {/* Posts Timeline */}
        <div ref={timelineRef} className="flex-1 overflow-y-auto bg-gray-800">
          {posts.map(post => (
            <div id={`post-${post.id}`} key={post.id}>
              <PostItem {...post} />
            </div>
          ))}
        </div>
        
        {/* Post Input */}
        <form onSubmit={handleSubmit} className="bg-gray-800 p-4 border-t border-gray-700">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="今何をしていますか?"
              className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-gray-200 border-gray-600"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}