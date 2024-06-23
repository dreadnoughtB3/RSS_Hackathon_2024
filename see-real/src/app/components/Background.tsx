// components/Background.tsx
const Background: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Background */}
        <rect width="1200" height="800" fill="#111827" />

        {/* Circles */}
        <circle cx="150" cy="150" r="80" fill="#4F46E5" />
        <circle cx="350" cy="350" r="100" fill="#4F46E5" opacity="0.7" />
        <circle cx="800" cy="200" r="50" fill="#4F46E5" opacity="0.5" />

        {/* Waves */}
        <path
          d="M0,160 C100,200 200,120 300,160 C400,200 500,120 600,160 C700,200 800,120 900,160 C1000,200 1100,120 1200,160 L1200,800 L0,800 Z"
          fill="#4F46E5"
          opacity="0.1"
        />

        <path
          d="M0,320 C100,360 200,280 300,320 C400,360 500,280 600,320 C700,360 800,280 900,320 C1000,360 1100,280 1200,320 L1200,800 L0,800 Z"
          fill="#4F46E5"
          opacity="0.1"
        />

        {/* Grid */}
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#4F46E5"
              strokeWidth="2"
              opacity="0.1"
            />
          </pattern>
        </defs>
        <rect width="1200" height="800" fill="url(#grid)" />
      </svg>
    </div>
  );
};

export default Background;
