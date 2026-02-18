import React from 'react';
import { Link } from 'react-router-dom';

const TeaRoomMap = () => {
  return (
    <div className="min-h-screen bg-paper p-8">
      <h1 className="text-4xl font-bold mb-4">茶室マップ</h1>
      <p>このページは準備中です。</p>
      <Link to="/" className="text-blue-600 underline mt-4 block">ホームに戻る</Link>
    </div>
  );
};

export default TeaRoomMap;