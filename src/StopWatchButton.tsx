import React from 'react';

// Props interface defining the types of props this component expects
interface StopWatchButtonProps {
  buttonFunction: () => void;   // A function to be executed when the button is clicked
  children: React.ReactNode;    // Content inside the button, passed as a prop
}

// StopWatchButton component
const StopWatchButton: React.FC<StopWatchButtonProps> = ({ buttonFunction, children }) => {
  return (
    <div>
      {/* Button with click event */}
      <button onClick={buttonFunction}>{children}</button>
    </div>
  );
};

export default StopWatchButton;