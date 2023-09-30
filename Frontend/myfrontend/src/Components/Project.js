import axios from "axios";
import React, { useEffect, useState } from "react";

function Project() {
  useEffect(() => {
   handleGetProjects();
  }, []);

  const [projects, setAllProjects] = useState([]);
  const [searchProject, setSearchProject] = useState([]);
  const [detailIndex, setDetailIndex] = useState(null);

  const handleGetProjectByTitle = () => {
    if (!searchProject) {
      return;
    }
    setDetailIndex(null);
    axios
      .get(`http://localhost:4000/projectByTitle/${searchProject}`)
      .then((response) => {
        setAllProjects(response.data.projectData);
      })
      .catch((err) => console.log(err));
  };

  const handleGetProjects = () => {
    setDetailIndex(null);
    axios
      .get(`http://localhost:4000/allProjectData`)
      .then((response) => {
        setAllProjects(response.data.projectData);
      })
      .catch((err) => console.log(err));
  };

  const handleDetailedIndex = (index)=>{
    if(index===detailIndex){
      setDetailIndex(null);
      return;
    }
    setDetailIndex(index);
  }

  const renderProjectData = () => {
    return (
      <div>
        <div style={{ margin: "16px" }}>
          <input
            type="text"
            placeholder="Enter Title to Search"
            value={searchProject}
            style={{ margin: "8px", padding: "8px" }}
            onChange={(e) => {
              setSearchProject(e.target.value);
            }}
          ></input>
          <button
            style={{ margin: "8px", padding: "8px" }}
            onClick={handleGetProjectByTitle}
          >
            Get Project Data
          </button>

          <button
            style={{ margin: "8px", padding: "8px" }}
            onClick={handleGetProjects}
          >
            Get All Project
          </button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexWrap:"wrap",
            alignItems:"center"
          }}
        >
          {projects.map((project, index) => {
            return (
              <div
              onClick={()=>{handleDetailedIndex(index)}}
                key={project.id}
                style={{
                  border: detailIndex === index ? "2px solid red" : "1px solid grey",
                  borderRadius:"5px",
                  margin: "8px",
                  padding: "8px",
                  maxWidth: "300px",
                  minWidth: "300px",
                  height:"fit-content",
                  minHeight:"200px"
                }}
              >
                <h5>Project Title</h5>
                <p>{project.Project.Title || "No Title"}</p>

                <h5>Project Technologies</h5>
                <p>{project.Project.Technologies || "No Title"}</p>

                { detailIndex === index && <> <h5>Technical Skillset</h5>
                <p>
                  {project.Technical_Skillset.Frontend || "No Frontend Skills"}
                </p>
                <p>
                  {project.Technical_Skillset.Backend || "No Backend Skills"}
                </p>
                <p>
                  {project.Technical_Skillset.Database || "No Database Skills"}
                </p>
                <p>
                  {project.Technical_Skillset.Infrastructure ||
                    "No Infrastructure Skills"}
                </p>

                <h5>Other Information</h5>
                <p>
                  {project.Other_Information.Availability ||
                    "Availability Not Mentioned"}
                </p>
                </>
          }
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      {projects.length === 0 && <p>No Data for Projects.</p>}
      {projects.length > 0 && renderProjectData()}
    </div>
  );
}

export default Project;
