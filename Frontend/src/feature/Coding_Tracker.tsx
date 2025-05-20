import React from "react";

const Coding_Tracker = () => {
  const [timeSpent, setTimeSpent] = React.useState(0);
  const [files, setFiles] = React.useState(0);
  const [projects, setProjects] = React.useState(0);
  const [languages, setLanguages] = React.useState([]);

  const startTimer = () => {
    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 3600000);
    return () => clearInterval(timer);
  };

  const handleFileChange = (event: any) => {
    setFiles(event.target.files.length);
  };

  const handleProjectChange = (event:any) => {
    setProjects(event.target.value);
  };

  const handleLanguageChange = (event:any) => {
    setLanguages(event.target.value.split(","));
  };

  return (
    <div>
      <h1>Coding Tracker</h1>
      <p>
        Track time spent, files/projects, and automatically detect languages.
      </p>
      <p>Time Spent: {timeSpent} hours</p>
      <p>Files: {files}</p>
      <p>Projects: {projects}</p>
      <p>Languages: {languages.join(", ")}</p>

      <button onClick={startTimer}>Start Timer</button>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Projects"
        onChange={handleProjectChange}
      />
      <input
        type="text"
        placeholder="Languages"
        onChange={handleLanguageChange}
      />
    </div>
  );
};

export default Coding_Tracker;
