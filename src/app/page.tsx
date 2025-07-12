'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/landing');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-emerald-900">
      <div className="flex flex-col items-center mt-12 mb-8">
        <Image
          src="/assets/bot.png"
          alt="Chat Bot"
          width={150}
          height={150}
          className="rounded-full shadow-lg border-4 border-purple-700 bg-white/10"
        />
        <h1 className="mt-6 text-4xl font-extrabold text-white drop-shadow-lg font-mono text-center">
          Hi fam, I am Predicto! <span className="block text-2xl font-light text-emerald-200 mt-2">Humans guess. I calculate. Dont' fight the Math, ape in and win.</span>
        </h1>
      </div>
      <button
        onClick={handleClick}
        className="px-8 py-4 rounded-2xl text-2xl font-bold text-white bg-gradient-to-r from-purple-600 via-blue-500 to-emerald-600 shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-400/50"
      >
        Let's Chat and Predict
      </button>
    </div>
  );
}
