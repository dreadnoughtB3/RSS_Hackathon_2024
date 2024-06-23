import React from 'react';
import { Button } from "@/components/ui/button"
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <svg className="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-bold text-xl">SeeЯeal</span>
        </div>
        <div className="flex items-center space-x-4">
        </div>
        <div className="flex items-center space-x-4">
          <Button className='bg-slate-600'>＞お問い合わせ</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">『あたりまえ』を変える、社内SNS</h1>
        <div className="h-px mx-auto max-w-2xl mb-2 bg-white"></div>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          ...where you can belong to a school club, a gaming group, or a worldwide art community. 
          Where just you and a handful of friends can spend time together. A place that makes it easy 
          to talk every day and hang out more often.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/login">
            <Button className="bg-sky-200 font-bold rounded-full text-gray-900 hover:bg-gray-200 px-8 py-4">
              ログイン
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-sky-200 font-bold rounded-full text-gray-900 hover:bg-gray-200 px-8 py-4">
              新規登録
            </Button>
          </Link>
        </div>
      </header>

      {/* Background Images */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg className="w-full" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,224C840,245,960,267,1080,261.3C1200,256,1320,224,1380,208L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" fill="#4F46E5"/>
        </svg>
      </div>
    </div>
  );
};

export default LandingPage;