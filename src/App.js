import React from "react";
import "./App.css";
import Jobs from "./components/Jobs";
import JobFilter from "./components/JobFilter";

function App() {
  const loadJobs = async () => {
    const response = await fetch("data.json");
    const data = await response.json();
    return data;
  };

  const [jobs, setJobs] = React.useState([]);
  const [jobFilter, setJobFilter] = React.useState({
    role: "",
    level: "",
    languages: [],
    tools: [],
  });
  const [filteredJobs, setFilteredJobs] = React.useState([]);

  const removeFilter = (type, name) => {
    switch (type) {
      case "role":
        setJobFilter({ ...jobFilter, role: "" });
        break;
      case "level":
        setJobFilter({ ...jobFilter, level: "" });
        break;
      case "language":
        let languages = jobFilter.languages.filter((x) => x !== name);
        setJobFilter({ ...jobFilter, languages: languages });
        break;
      case "tool":
        let tools = jobFilter.tools.filter((x) => x !== name);
        setJobFilter({ ...jobFilter, tools: tools });
        break;
      case "clear":
        setJobFilter({ role: "", level: "", languages: [], tools: [] });
        break;
      default:
    }
  };

  const handleTablet = (value) => {
    let filterToAdd;
    if (value.language || value.tool) {
      filterToAdd = value.language
        ? jobFilter.languages.includes(value.language)
          ? { languages: jobFilter.languages }
          : { languages: [...jobFilter.languages, value.language] }
        : jobFilter.tools.includes(value.tool)
        ? { tools: jobFilter.tools }
        : { tools: [...jobFilter.tools, value.tool] };
    } else {
      filterToAdd = value;
    }
    setJobFilter({ ...jobFilter, ...filterToAdd });
  };

  React.useEffect(() => {
    loadJobs().then((data) => {
      setJobs(data);
      setFilteredJobs(data);
    });
  }, []);

  React.useEffect(() => {
    setFilteredJobs(
      jobs
        .filter((job) => jobFilter.role === "" || job.role === jobFilter.role)
        .filter((job) => jobFilter.level === "" || job.level === jobFilter.level)
        .filter(
          (job) =>
            jobFilter.languages.length === 0 ||
            jobFilter.languages.every((j) => job.languages && job.languages.includes(j))
        )
        .filter(
          (job) => jobFilter.tools.length === 0 || jobFilter.tools.every((t) => job.tools && job.tools.includes(t))
        )
    );
  }, [jobs, jobFilter]);

  return (
    <div className="App">
      <header />
      <JobFilter filter={jobFilter} removeFilter={removeFilter} />
      <Jobs jobs={filteredJobs} handleTablet={handleTablet} />
      <div className="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noopener noreferrer">
          {" "}
          Frontend Mentor
        </a>
        . Coded by <a href="https://github.com/piotrmigas/react-job-board">Piotr Migas</a>.
      </div>
    </div>
  );
}

export default App;
