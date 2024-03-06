import https from "../../service/api";
export const createProjectApi = async (data) => {
  try {
    const result = https.post("/api/Project/createProjectAuthorize", data);
    console.log("🚀 ~ createProjectApi ~ result:", result);
    return result;
  } catch (error) {
    console.log("ERROR", error);
  }
};

export const getAllProjectsApi = () => {
  try {
    const result = https.get("api/Project/getAllProject");
    console.log(result, "fetchdata");

    return result;
  } catch {}
};

export const deleteProjectApi = async (project) => {
  try {
    const result = https.delete(
      `/api/Project/deleteProject?projectId=${project.id}`
    );
    console.log("Delete Project", project.id, "Result : ", result);
    return result;
  } catch (error) {
    console.log("ERROR Delete Project ", error);
  }
};

export const updateProjectApi = async (project) => {
  try {
    const result = https.put(
      `/api/Project/updateProject?projectId=${project.id}`,
      project
    );

    return result;
  } catch {
    throw new Error();
  }
};
