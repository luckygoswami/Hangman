import React from 'react';

interface HangmanProps {
  attempts: number;
}

const Hangman: React.FC<HangmanProps> = ({ attempts }) => {
  return (
    <div className="hangman">
      <svg
        transform="scale(-1,1)"
        viewBox="0 0 310 400"
        width="100%"
        height="100%"
        className="hangman-svg"
        stroke="#444"
        stroke-opacity="0.8">
        {/* Gallows */}
        <path
          d="M80 380 Q85 300 80 100 C85 20 200 0 200 10 L200 50"
          fill="none"
          stroke="#2d2d2d"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="sketchy-line"
        />

        {/* Gallow Base */}
        <path
          d="M50 380 Q100 370 150 380 Q200 390 250 380"
          fill="none"
          strokeWidth="8"
          className="sketchy-line"
        />

        {/* Wavy Rope - Increased Length */}
        {attempts < 7 && (
          <path
            d="M200 10 Q202 0 204 10 Q202 20 204 30 Q202 40 200 50 L200 80"
            stroke="#2d2d2d"
            strokeWidth="2"
            className="sketchy-line"
          />
        )}

        {/* Head */}
        {attempts < 6 && (
          <circle
            cx="200"
            cy="100"
            r="20"
            fill="none"
            stroke="#2d2d2d"
            strokeWidth="3"
            className="sketchy-line"
          />
        )}

        {/* Body */}
        {attempts < 5 && (
          <path
            d="M200 120 L200 180"
            fill="none"
            stroke="#2d2d2d"
            strokeWidth="3"
            className="sketchy-line"
          />
        )}

        {/* Arms */}
        {attempts < 4 && (
          <path
            d="M200 120 Q180 140 180 160"
            fill="none"
            stroke="#2d2d2d"
            strokeWidth="3"
            className="sketchy-line"
          />
        )}
        {attempts < 3 && (
          <path
            d="M200 120 Q220 140 220 160"
            fill="none"
            stroke="#2d2d2d"
            strokeWidth="3"
            className="sketchy-line"
          />
        )}

        {/* Legs */}
        {attempts < 2 && (
          <path
            d="M200 180 Q180 220 180 240"
            fill="none"
            stroke="#2d2d2d"
            strokeWidth="3"
            className="sketchy-line"
          />
        )}
        {attempts < 1 && (
          <path
            d="M200 180 Q220 220 220 240"
            fill="none"
            stroke="#2d2d2d"
            strokeWidth="3"
            className="sketchy-line"
          />
        )}
      </svg>
    </div>
  );
};

export default Hangman;
