import React, { useEffect, useState } from 'react';
import StopWatchButton from './StopWatchButton';

// StopWatch component
const StopWatch: React.FC = () => {
  // State variables to manage time, running state, and laps
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);

  // Effect to handle the timer logic using setInterval
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (running) {
      interval = setInterval(() => {
        // Update time every 10 milliseconds
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      // Clear the interval when the stopwatch is stopped
      clearInterval(interval);
    }

    // Cleanup function to clear the interval when the component unmounts or dependencies change
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div>
      {/* Display time in hours, minutes, and seconds */}
      <h1>
        
        {/* Format the minutes part: divide total time (in milliseconds) by 60000 to convert to minutes,
            then take the remainder after division by 60, and apply Math.floor to ensure whole numbers.
            ("0" + ...).slice(-2) adds a leading zero for single-digit minutes. */}
        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}{' '}

        {/* Format the seconds part: divide total time (in milliseconds) by 1000 to convert to seconds,
            then take the remainder after division by 60, and apply Math.floor to ensure whole numbers.
            ("0" + ...).slice(-2) adds a leading zero for single-digit seconds. */}
        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:{' '}

        {/* Format the milliseconds part: take the remainder after dividing total time (in milliseconds) by 10,
            then ensure only the two rightmost digits using % 100.
            ("0" + ...).slice(-2) adds a leading zero for single-digit milliseconds. */}
        {("0" + ((time / 10) % 100)).slice(-2)}
      </h1>

      {/* Buttons section */}
      <div className="buttons">

        {/* Button to start/stop the stopwatch */}
        <StopWatchButton buttonFunction={() => setRunning(!running)}>
          {running ? 'STOP' : 'START'}
        </StopWatchButton>

        {/* Button to record laps when the stopwatch is running */}
        <StopWatchButton
          buttonFunction={() => {

            // Checks if timer is running when setting laps
            running && setLaps((prevLaps) => [...prevLaps, time]);
          }}
        >
          LAP
        </StopWatchButton>
        
        {/* Button to reset the stopwatch and clear laps when it's not running */}
        <StopWatchButton
          buttonFunction={() => {
            // Make sure timer is not running when reset button is clicked
            if(!running) {

                // Sets time back to 0 and empties laps
                setTime(0);
                setLaps([]);
            }
          }}
        >
          RESET
        </StopWatchButton>
      </div>
      {/* Display recorded laps */}
      <div className="numbers">
        <h2>Laps:</h2>
        {laps.length == 0 && <p>There are no laps yet.</p>}
        {/* Maps through the array laps, creating a new p for every number in the array */}
        {laps.map((lap, index) => (
          // Display each lap with a unique key using the index
            <p key={index}>
                {/* Lap information: Lap number and formatted time */}

                {/* Format minutes: divide total lap time (in milliseconds) by 60000 to convert to minutes,
                    then take the remainder after division by 60, and apply Math.floor to ensure whole numbers.
                    ("0" + ...).slice(-2) adds a leading zero for single-digit minutes. */}
                {"Lap " + (index + 1) + ": " +
                ("0" + Math.floor((lap / 60000) % 60)).slice(-2)}{' '}

                {/* Format seconds: divide total lap time (in milliseconds) by 1000 to convert to seconds,
                    then take the remainder after division by 60, and apply Math.floor to ensure whole numbers.
                    ("0" + ...).slice(-2) adds a leading zero for single-digit seconds. */}
                {("0" + Math.floor((lap / 1000) % 60)).slice(-2)}:{' '}

                {/* Format milliseconds: take the remainder after dividing total lap time (in milliseconds) by 10,
                    then ensure only the two rightmost digits using % 100.
                    ("0" + ...).slice(-2) adds a leading zero for single-digit milliseconds. */}
                {("0" + ((lap / 10) % 100)).slice(-2)}
            </p>
        ))}
      </div>
    </div>
  );
};

export default StopWatch;
