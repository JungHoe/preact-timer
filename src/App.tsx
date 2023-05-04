import { JSX } from "preact";
import { useState, useEffect, useCallback } from "preact/hooks";

function App() {
  const [minutes, setMinutes] = useState<number>(5);
  const [seconds, setSeconds] = useState<number>(0);
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [timerStatus, setTimerStatus] = useState<string>("paused");
  const [timerInterval, setTimerInterval] = useState<number>(0);
  const [progressColor, setProgressColor] = useState<string>("green");

  useEffect(() => {
    setTotalSeconds(minutes * 60 + seconds);
  }, [minutes, seconds]);
  const pauseTimer = useCallback(() => {
    setTimerStatus("paused");
    if (timerInterval) clearInterval(timerInterval);
  }, [timerInterval]);

  useEffect(() => {
    if (totalSeconds === 0 && timerInterval) {
      pauseTimer();
    }
  }, [totalSeconds, pauseTimer, timerInterval]);

  const startTimer = () => {
    setTimerStatus("running");
    setTimerInterval(
      setInterval(() => {
        setTotalSeconds((prevTotalSeconds) => {
          const next = prevTotalSeconds - 1;
          const percent = Math.round((next / totalSeconds) * 100);
          if (percent <= 50 && percent >= 30) {
            setProgressColor("yellow");
          } else if (percent <= 30) {
            setProgressColor("red");
          }
          return next;
        });
      }, 1000)
    );
  };
  const resetTimer = () => {
    setTotalSeconds(minutes * 60 + seconds);
    setProgressColor("green");
  };

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  const validateInteger = (
    e: JSX.TargetedEvent<HTMLElement>,
    callback: any
  ) => {
    const { value, max, min } = e.target as HTMLInputElement;
    const parsedValue = parseInt(value);
    if (!isNaN(parsedValue)) {
      callback(
        Math.max(Number(min), Math.min(Number(max), Number(parsedValue)))
      );
      if (progressColor !== "green") {
        setProgressColor("green");
      }
    } else {
      callback(0);
    }
  };

  return (
    <section className="container">
      <div className="time-setting-wrapper">
        <div className="minuteBox">
          <input
            type="number"
            min="0"
            max="60"
            value={minutes}
            disabled={timerStatus === "running"}
            onInput={(e) => validateInteger(e, setMinutes)}
          />
          <span>Minutes</span>
        </div>
        <div>
          <input
            type="number"
            min="0"
            max="59"
            value={seconds}
            disabled={timerStatus === "running"}
            onInput={(e) => validateInteger(e, setSeconds)}
          />
          <span>Seconds</span>
        </div>
      </div>
      <div className="timer-circle">
        <svg>
          <circle cx="50%" cy="50%" r="40%" />
          <circle
            className={`timer-progress ${progressColor}`}
            cx="50%"
            cy="50%"
            r="40%"
            style={{
              strokeDasharray: 600,
              strokeDashoffset:
                600 - (totalSeconds * 600) / (minutes * 60 + seconds),
            }}
          />
          <text x="40%" y="55%">
            {formatTime(Math.floor(totalSeconds / 60))}:
            {formatTime(totalSeconds % 60)}
          </text>
        </svg>
      </div>
      <div className="control-box">
        {timerStatus === "paused" ? (
          <button onClick={startTimer} className="action">
            Start
          </button>
        ) : (
          <button onClick={pauseTimer} className="action">
            Pause
          </button>
        )}
        <button onClick={resetTimer} className="reset">
          Reset
        </button>
      </div>
    </section>
  );
}

export default App;
