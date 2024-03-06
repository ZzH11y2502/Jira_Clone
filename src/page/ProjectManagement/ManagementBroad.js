import React, { useEffect, useState } from "react";
import {
  deleteProject,
  getAllProject,
} from "../../redux/projectSlice/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { userID } from "../../service/api";
import { Button } from "antd";
import Modal from "react-modal";

import {
  addMemberAction,
  getMembersAction,
} from "../../redux/membersSlice/membersSlice";
import { useNavigate } from "react-router-dom";

export default function ManagementBroad() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // mapStatetoProps ~ useSelector
  const projectList = useSelector((state) => state.getAllProject.projectList);
  const membersList = useSelector(
    (state) => state.getMembersAction.membersList
  );
  const [modalProjectId, setModalProjectId] = useState(null);

  console.log("membersList", membersList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //   const [newMembersList, setMembersList] = useState([]);
  //   console.log("newMembersList", newMembersList);
  const userProjectsList = projectList
    .map((project) => {
      if (project.creator.id === userID) {
        return project;
      }
      return null; // or any other default value
    })
    .filter(Boolean);

  const handleDelete = async (item) => {
    console.log(item, "delete selected");
    await dispatch(deleteProject(item));
    dispatch(getAllProject());
  };

  const handleGetMembers = async (projectId) => {
    setIsModalOpen(true);
    setModalProjectId(projectId);

    dispatch(getMembersAction());
  };

  const handleAddMembers = async (userId) => {
    const selectedUserId = userId.userId;

    const member = {
      projectId: modalProjectId,
      userId: selectedUserId,
    };
    console.log(member, "members add selected");
    dispatch(addMemberAction(member));
    dispatch(getAllProject());
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateProject = (project) => {
    console.log("Project updated", project);
    const projectQueryString = encodeURIComponent(JSON.stringify(project));

    navigate(`./edit-project?project=${projectQueryString}`);
  };
  useEffect(() => {
    dispatch(getAllProject());
  }, [dispatch]);
  console.log("userProjectsList", userProjectsList, "userID", userID);
  return (
    <div className="mt-10 ">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Project Name{" "}
              </th>
              <th scope="col" className="px-6 py-3">
                catalogy
              </th>
              <th scope="col" className="px-6 py-3">
                Creator
              </th>
              <th scope="col" className="px-6 py-3">
                Members
              </th>
              <th scope="col" className="px-6 py-3">
                Update
              </th>
            </tr>
          </thead>
          <tbody>
            {userProjectsList.map((project, key) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={key}
                >
                  <th scope="row" className="px-6 py-4 ">
                    {project?.id}
                  </th>
                  <td className="px-6 py-4">{project?.projectName}</td>
                  <td className="px-6 py-4">{project?.categoryName}</td>
                  <td className="px-6 py-4">{project.creator.name}</td>
                  <td className="px-6 py-4 ">
                    <div
                      className="flex justify-between "
                      style={{ maxWidth: "200px", overflow: "hidden" }}
                    >
                      <div className="flex justify-end members__avatar">
                        <div className="flex">
                          {project.members.map((member) => (
                            <img
                              className="w-6 h-6 rounded-3xl"
                              src={member.avatar}
                              alt=""
                            />
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleGetMembers(project.id)}
                        style={{ position: "relative" }}
                      >
                        <i className="fa fa-plus-circle"></i>
                      </button>
                      <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        contentLabel="User List Modal"
                        style={{
                          content: {
                            width: "300px",
                            left: "70% ",
                            top: "30%",
                            transform: "translateY(-50%), translateX(-25%)",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            maxHeight: "300px",
                          },
                          overlay: {
                            backgroundColor: "rgba(0, 0, 0, 0)", // Set background color to transparent
                          },
                        }}
                      >
                        <div className="flex justify-between modal__header">
                          <h2>PROJECT {modalProjectId}</h2>
                          <button onClick={closeModal}>
                            <p className="text-red-600">Close</p>
                          </button>
                        </div>
                        <ul>
                          {/* Render your user list here */}
                          {membersList.map((item, i) => {
                            return (
                              <li
                                className="flex hover:bg-gray-300"
                                onClick={() => handleAddMembers(item)}
                                key={i}
                              >
                                <img
                                  className="w-6 h-6 rounded-3xl"
                                  src={item.avatar}
                                  alt=""
                                />
                                <p className="ml-2 text-pink-300">
                                  {item.name}
                                </p>
                                <p className="ml-2 text-orange-300">
                                  {item.userId}
                                </p>
                              </li>
                            );
                          })}

                          {/* ... */}
                        </ul>
                      </Modal>
                    </div>
                  </td>
                  <td className="px-6 py-4 ">
                    <Button
                      className="w-20 text-white bg-green-500"
                      onClick={() => {
                        handleUpdateProject(project);
                      }}
                    >
                      Update
                    </Button>
                    <br />

                    <Button
                      className="w-20 text-white bg-red-500"
                      onClick={() => handleDelete(project)}
                    >
                      Delete
                    </Button>

                    <br />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
