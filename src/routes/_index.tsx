import * as React from 'react';

import reactRouterLogo from '@/assets/react-router.svg';
import reactLogo from '@/assets/react.svg';

import viteLogo from '/vite.svg';

export function meta() {
  return [
    { title: 'Vite + React + React Router' },
    { name: 'description', content: 'Welcome to Vite + React + React Router!' },
  ];
}

export default function Index() {
  const [count, setCount] = React.useState(0);

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 p-8 text-center text-white">
        <div className="flex gap-8">
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img
              src={viteLogo}
              className="h-24 p-6 transition-[filter] duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] md:h-36"
              alt="Vite logo"
            />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img
              src={reactLogo}
              className="h-24 p-6 transition-[filter] duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] md:h-36"
              style={{ animation: 'spin 20s linear infinite' }}
              alt="React logo"
            />
          </a>
          <a href="https://reactrouter.com" target="_blank" rel="noopener noreferrer">
            <img
              src={reactRouterLogo}
              className="h-24 p-6 transition-[filter] duration-300 hover:drop-shadow-[0_0_2em_#f44250] md:h-36"
              alt="React Router logo"
            />
          </a>
        </div>
        <h1 className="mt-8 text-4xl font-bold md:text-5xl">Vite + React + React Router</h1>
        <div className="mt-6 flex flex-col items-center justify-center rounded-xl bg-neutral-800 p-8 shadow-lg">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="rounded-lg border border-transparent bg-neutral-700 px-4 py-2 text-lg font-medium transition-all hover:border-indigo-500"
          >
            count is {count}
          </button>
          <p className="mt-4 text-neutral-400">
            Edit{' '}
            <code className="rounded-md bg-neutral-700 px-2 py-1 text-neutral-200">
              src/routes/_index.tsx
            </code>{' '}
            and save to test HMR
          </p>
        </div>
        <p className="mt-4 text-neutral-400">
          Click on the Vite, React, and React Router logos to learn more
        </p>
      </div>
    </>
  );
}
