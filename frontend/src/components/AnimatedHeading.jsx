import React, { useState, useEffect } from 'react';

const AnimatedHeading = ({ lines }) => {
  const [displayText, setDisplayText] = useState('');
  const [forward, setForward] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    let timeoutId;

    const animateText = () => {
      timeoutId = setTimeout(() => {
        setDisplayText((prevText) => {
          if (forward) {
            if (currentIndex === lines.join('').length) {
              setForward(false);
              clearTimeout(timeoutId);
              return prevText;
            }
            currentIndex++;
            return lines.map(line => line.slice(0, currentIndex / lines.length)).join('');
          } else {
            if (currentIndex === 0) {
              setForward(true);
              clearTimeout(timeoutId);
              return '';
            }
            currentIndex--;
            return lines.map(line => line.slice(0, currentIndex / lines.length)).join('');
          }
        });
        animateText();
      }, 170); // Adjust the interval for animation speed
    };

    animateText();

    return () => clearTimeout(timeoutId);
  }, [lines, forward]);

  useEffect(() => {
    if (!forward) {
      setTimeout(() => {
        setDisplayText('');
        setForward(true);
      }, 5000); // Wait for 5 seconds before starting again
    }
  }, [displayText, forward]);

  return <h1>{displayText}</h1>;
};

export default AnimatedHeading;
