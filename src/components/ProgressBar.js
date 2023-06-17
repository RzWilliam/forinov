import React, { useState, useEffect } from 'react'

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [stepDates, setStepDates] = useState([0]);
  const [hoveredStep, setHoveredStep] = useState(null);

  useEffect(() => {
    const savedProgress = localStorage.getItem('progress');
    if (savedProgress) {
      setProgress(parseInt(savedProgress));
    }

    const savedDates = localStorage.getItem('stepDates');
    if (savedDates) {
      setStepDates(JSON.parse(savedDates));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('progress', progress.toString());
    localStorage.setItem('stepDates', JSON.stringify(stepDates));
  }, [progress, stepDates]);

  const handleClick = () => {
    if (progress < 100) {
      setProgress(progress + 16.66666667);
      const date = new Date().toLocaleDateString() + ' - ' + new Date().toLocaleTimeString();
      const updatedStepDates = [...stepDates];
      updatedStepDates[progress / 16.66666667 + 1] = date;
      setStepDates(updatedStepDates);
      console.log(stepDates);
    }
  };

  const handleMouseOver = (index) => {
    const date = stepDates[index];
    console.log(index)
    if (date && index !== 0) {
        setHoveredStep(date);
    }
  };

  const handleMouseLeave = () => {
    setHoveredStep(null);
  };

  return (
    <div>
      <div className="progress-bar" onClick={handleClick}>
        <div className="progression" style={{ width: `${progress}%` }} />
        <div className="steps-container">
          {[0, 1, 2, 3, 4, 5, 6].map((step) => (
            <div
              key={step}
              style={{border: `${progress / 14.28571429 >= step ? '2px solid #006bff' : ''}`}}
              className={`step ${step}`}
              onMouseOver={() => handleMouseOver(step)}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </div>
      </div>
      {hoveredStep && (
        <div className="date">
          Date: {hoveredStep}
        </div>
      )}
    </div>
  );
}
