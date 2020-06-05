import React from "react";

const JobFilter = ({ filter, removeFilter }) => {
  if (filter.role === "" && filter.level === "" && filter.languages.length === 0 && filter.tools.length === 0) {
    return null;
  }

  return (
    <div className="box job-filter">
      {filter.role && (
        <span className="tablet">
          {filter.role}{" "}
          <img onClick={() => removeFilter("role")} className="close" src="/images/icon-remove.svg" alt="close" />
        </span>
      )}
      {filter.level && (
        <span className="tablet">
          {filter.level}{" "}
          <img onClick={() => removeFilter("level")} className="close" src="/images/icon-remove.svg" alt="close" />
        </span>
      )}
      {filter.languages.map((language) => (
        <span className="tablet" key={language}>
          {" "}
          {language}{" "}
          <img
            onClick={() => removeFilter("language", language)}
            className="close"
            src="/images/icon-remove.svg"
            alt="close"
          />
        </span>
      ))}
      {filter.tools.map((tool) => (
        <span className="tablet" key={tool}>
          {tool}
          <img onClick={() => removeFilter("tool", tool)} className="close" src="/images/icon-remove.svg" alt="close" />
        </span>
      ))}
      <button onClick={() => removeFilter("clear")}> Clear</button>
    </div>
  );
};

export default JobFilter;
