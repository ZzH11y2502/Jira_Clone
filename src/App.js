import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomeLayout from "./layout/HomeLayout/HomeLayout";
import ProjectManagement from "./page/ProjectManagement/ProjectManagement";
import CreateProjectLayout from "./layout/CreateProjectLayout/CreateProjectLayout";
import CreateProject from "./page/CreateProject/CreateProject";
import Loginpage from "./page/LoginPage/Loginpage";
import FormLogin from "./page/LoginPage/FormLogin";
import ManagementLayout from "./layout/ProjectManagement/ManagementLayout";
import ManagementBroad from "./page/ProjectManagement/ManagementBroad";
import UsersLayout from "./layout/UsersLayout/UsersLayout";
import UserBroad from "./page/UserBroad/UserBroad";
import UpdateUser from "./page/UserBroad/UpdateUser";
import EditProject from "./page/ProjectManagement/EditProject";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loginpage />}>
          <Route path="/" element={<FormLogin />} />
        </Route>
        <Route path="/home" element={<HomeLayout />}>
          <Route path="/home" element={<ProjectManagement />} />
        </Route>
        <Route path="/createproject" element={<CreateProjectLayout />}>
          <Route path="/createproject" element={<CreateProject />} />
        </Route>
        <Route path="/managementpage" element={<ManagementLayout />}>
          <Route path="/managementpage" element={<ManagementBroad />} />
          <Route
            path="/managementpage/edit-project"
            element={<EditProject />}
          />
        </Route>
        <Route path="/users-management" element={<UsersLayout />}>
          <Route path="/users-management" element={<UserBroad />} />
          <Route
            path="/users-management/update-user"
            element={<UpdateUser />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
