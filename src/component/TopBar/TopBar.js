import { NavLink } from "react-router-dom";

export default function TopBar() {
  return (
    <div
      style={{ width: "100%" }}
      className="grid grid-cols-4 gap-4 bg-gray-600 top__bar "
      id="top__bar"
    >
      <div className="ml-14 logo">
        <img
          style={{ height: 80, width: 80 }}
          src="https://cdn.icon-icons.com/icons2/2845/PNG/512/jira_logo_icon_181275.png"
          alt=""
        />
      </div>
      <div className="flex items-center justify-between col-span-3 mr-5 main__function">
        <div className="text-white dash__broad hover:text-blue-500">
          <NavLink className="flex " to="/home">
            <i class="fa fa-chart-pie" style={{ fontSize: "18px" }}></i>
            <p className="ml-2 text-sm page__text ">Dashboard</p>
          </NavLink>
        </div>
        <div className="text-white jiraClone hover:text-blue-500">
          <NavLink className="flex " to="">
            <i class="fa fa-columns" style={{ fontSize: "18px" }}></i>
            <p className="ml-2 text-sm page__text ">Jira Clone</p>
          </NavLink>
        </div>
        <div className="text-white project__manager hover:text-blue-500">
          <NavLink className="flex " to="/managementpage">
            <i class="fa fa-chart-bar" style={{ fontSize: "18px" }}></i>
            <p className="ml-2 text-sm page__text ">Projects</p>
          </NavLink>
        </div>
        <div className="text-white create_project hover:text-blue-500">
          <NavLink className="flex " to="/createproject">
            <i class="fa fa-edit" style={{ fontSize: "18px" }}></i>
            <p className="ml-2 text-sm page__text ">Create Project</p>
          </NavLink>
        </div>
        <div className="text-white user_manager hover:text-blue-500">
          <NavLink className="flex " to="/users-management">
            <i class="fa fa-user-edit" style={{ fontSize: "18px" }}></i>
            <p className="ml-2 text-sm page__text ">User Management</p>
          </NavLink>
        </div>

        <div className="text-white signOut hover:text-blue-500">
          <NavLink className="flex " to="/">
            <i class="fa fa-sign-out-alt" style={{ fontSize: "18px" }}></i>

            <p className="ml-2 text-sm page__text ">Log Out</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
