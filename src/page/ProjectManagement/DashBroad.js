import React, { useEffect, useRef, useState } from "react";
import Sortable from "sortablejs";
import "./StyleDashBroad.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProject,
  getAllProject,
} from "../../redux/projectSlice/projectSlice";
import { Avatar } from "flowbite-react";
import Modal from "react-modal";
import { Editor } from "@tinymce/tinymce-react";
import { Input, Select } from "antd";
import { userID } from "../../service/api";

let DashBroad = () => {
  let dispatch = useDispatch();
  const [selectedProject, setSelectedProject] = useState({
    members: [
      {
        userId: 1,
        name: "",
        avatar: "",
      },
    ],
    creator: {
      id: 1,
      name: "",
    },
    id: 1,
    projectName: "",
    description: "",
    categoryId: 1,
    categoryName: "",
    alias: "",
    deleted: false,
  });

  // mapStatetoProps ~ useSelector
  const projectList = useSelector((state) => state.getAllProject.projectList);

  // Create user projects list
  const userProjectsList = [];
  projectList.map((project) => {
    if (project.creator.id === userID) {
      userProjectsList.push(project);
    }
  });
  useEffect(() => {
    // Drag&Drop function
    const handleDrag = () => {
      var back_log = document.getElementById("back_log");
      var sortable = Sortable.create(back_log, {
        group: {
          name: "to_do_task",
          put: ["to_do_task", "in_process", "done_task", "back_log"],
        },
        animation: 100,
      });

      var to_do_task = document.getElementById("to_do_task");

      var sortable1 = Sortable.create(to_do_task, {
        group: {
          name: "to_do_task",
          put: ["to_do_task", "in_process", "done_task", "back_log"],
        },
        animation: 100,
      });

      var in_process = document.getElementById("in_process");
      var sortable2 = Sortable.create(in_process, {
        group: {
          name: "to_do_task",
          put: ["to_do_task", "in_process", "done_task", "back_log"],
        },
        animation: 100,
      });
      var done_task = document.getElementById("done_task");
      var sortable3 = Sortable.create(done_task, {
        group: {
          name: "done_task",
          put: ["to_do_task", "in_process", "done_task", "back_log"],
        },
        animation: 100,
      });
    };
    dispatch(getAllProject());

    handleDrag(); // Call the handleDrag function once the component is mounted
  }, [dispatch]);

  // Modal popup
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "1040px",
      minWidth: "900px",
    },
  };
  const openModal = (value) => {
    setIsOpen(true);
    setSelectedProject(value);
    console.log("selectedProject", selectedProject);
  };
  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  };
  // Editor variable
  const editorRef = useRef(null);
  const handleEditorChange = (content, editor) => {
    console.log("content updated", content);
  };

  function closeModal() {
    setIsOpen(false);
  }

  const handleUpdateProject = () => {
    dispatch(getAllProject());
  };
  const handleDelete = async (item) => {
    console.log(item, "delete selected");
    await dispatch(deleteProject(item));
    handleUpdateProject();
    closeModal();
  };
  // dropdown
  const { Option } = Select;
  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
  };
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <div className="flex justify-between modal__header">
          <div>
            <i className="fa fa-exclamation-circle"></i>
            <span
              className="ml-2"
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color: "rgb(94, 108, 132)",
                fontSize: "13px",
              }}
            >
              BUG-{selectedProject?.id}
            </span>
          </div>
          <div
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              color: "rgb(94, 108, 132)",
              fontSize: "13px",
            }}
          >
            <button className="button_modal">
              <i className="fa fa-paper-plane"></i> Give feedback{" "}
            </button>
            <button className="button_modal">
              <i className="fa fa-link"></i>
              Copy link
            </button>
            <button
              className="button_modal"
              onClick={() => handleDelete(selectedProject)}
            >
              <i className="fa fa-trash-alt"></i>
              trash
            </button>
            <button className="button_modal" onClick={closeModal}>
              <i className="fa fa-times"></i>
            </button>
          </div>
        </div>
        <div className="flex modal__body">
          <div
            className="modal__left"
            style={{ width: "65%", paddingRight: "50px" }}
          >
            <textarea className="w-full text-xl font-medium border border-white rounded-md hover:bg-gray-200">
              {selectedProject.projectName}
            </textarea>

            {/* description */}
            <div className="description">
              <h2 className="mt-4 text-xl">Description</h2>

              <Editor
                id="description"
                apiKey="bf3ijvb0dtg2ony0uu4siyzg2hedu7hy6euahdccuf309scw"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={selectedProject.description}
                init={{
                  height: 300,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
                onEditorChange={handleEditorChange}
              >
                Hello
              </Editor>
              {/* Modal action */}
              <div className="mt-3 modal__action">
                <button className="px-4 py-1 font-bold text-white bg-blue-700 rounded hover:bg-blue-400">
                  Save
                </button>
                <button className="px-4 py-1 ml-1 font-bold text-gray-600 bg-white rounded hover:bg-gray-200">
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <div className="modal__right" style={{ width: "35%" }}>
            <p className="mt-3 mb-2 text-xs font-semibold text-gray-600">
              STATUS
            </p>
            {/* Drop down Status */}
            <Select
              defaultValue="default"
              style={{ width: 120 }}
              onChange={handleChange}
            >
              <Option value="default" disabled>
                Select an option
              </Option>

              <Option value="option1">BACK LOG</Option>
              <Option value="option2">IN PROGRSS</Option>
              <Option value="option3">DONE</Option>
            </Select>
            {/* assignees */}
            <p className="mt-3 mb-2 text-xs font-semibold text-gray-600">
              ASSIGNESS
            </p>
            <Select
              defaultValue="default"
              style={{ width: 120 }}
              onChange={handleChange}
            >
              <Option value="default" disabled>
                Select an option
              </Option>

              <Option>
                <p>Aleksandr</p>
              </Option>
              <Option>
                <p>Artyom</p>
              </Option>
            </Select>
            {/* Priority */}
            <p className="mt-3 mb-2 text-xs font-semibold text-gray-600">
              PRIORITY
            </p>
            <Select
              defaultValue="default"
              style={{ width: 120 }}
              onChange={handleChange}
            >
              <Option value="default" disabled>
                Select an option
              </Option>

              <Option value="option1">
                <i class="fa fa-arrow-up"></i>
                <span className="ml-1">Highest</span>
              </Option>
              <Option value="option2">
                <i class="fa fa-arrow-up"></i>
                <span className="ml-1">Medium</span>
              </Option>
              <Option value="option3">
                <i class="fa fa-arrow-down"></i>
                <span className="ml-1">Low</span>
              </Option>
              <Option value="option4">
                <i class="fa fa-arrow-down"></i>
                <span className="ml-1">Lowest</span>
              </Option>
            </Select>
            {/* Time estimate */}
            <p className="mt-3 mb-2 text-xs font-semibold text-gray-600">
              ORIGINAL ESTIMATE (HOURS)
            </p>
            <Input type="text" className="bg-gray-200"></Input>

            <div
              className="mt-3"
              style={{
                color: "rgb(94, 108, 132)",
                lineHeight: "22px",
                fontSize: "13px",
              }}
            >
              Updated at 5 days ago
            </div>
          </div>
        </div>
      </Modal>

      {/* Content */}
      <div className="grid grid-cols-4 gap-6" style={{ width: "100%" }}>
        <div className="task_list">
          <div className="title">Back Log</div>
          <div className="body__list" id="back_log">
            {userProjectsList.slice(0, 4).map((item, index) => (
              <div
                key={index}
                className="project__box"
                onClick={() => openModal(item)}
              >
                <p className="pb-4 font-sans">{item.projectName}</p>
                <div className="flex justify-between">
                  <div>
                    <i className="mr-2 fa fa-bookmark"></i>
                    <i className="fa fa-arrow-up"></i>
                  </div>
                  <div className="flex avatar__icon">
                    <Avatar
                      alt="User"
                      img="https://i.pravatar.cc/?u=billy"
                      rounded
                      style={{ height: "2rem", width: "2rem" }}
                    />
                    <Avatar
                      alt="User"
                      img="https://i.pravatar.cc/?u=huy"
                      rounded
                      style={{ height: "2rem", width: "2rem" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="task_list">
          <div className="title">to do task</div>
          <div className="body__list" id="to_do_task">
            {userProjectsList.slice(4, 8).map((item, index) => (
              <div
                key={index}
                className="project__box"
                onClick={() => openModal(item)}
              >
                <p className="pb-4 font-sans">{item.projectName}</p>
                <div className="flex justify-between">
                  <div>
                    <i className="mr-2 fa fa-bookmark"></i>
                    <i className="fa fa-arrow-up"></i>
                  </div>
                  <div className="flex avatar__icon">
                    <Avatar
                      alt="User"
                      img="https://i.pravatar.cc/?u=billy"
                      rounded
                      style={{ height: "2rem", width: "2rem" }}
                    />
                    <Avatar
                      alt="User"
                      img="https://i.pravatar.cc/?u=huy"
                      rounded
                      style={{ height: "2rem", width: "2rem" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="task_list">
          <div className="title">in process</div>
          <div className="body__list" id="in_process">
            {userProjectsList.slice(8, 12).map((item, index) => (
              <div
                key={index}
                className="project__box"
                onClick={() => openModal(item)}
              >
                <p className="pb-4 font-sans">{item.projectName}</p>
                <div className="flex justify-between">
                  <div>
                    <i className="mr-2 fa fa-bookmark"></i>
                    <i className="mr-2 fa fa-arrow-up"></i>
                    <i className="fa fa-exclamation-triangle"></i>
                  </div>
                  <div className="flex avatar__icon">
                    <Avatar
                      alt="User"
                      img="https://i.pravatar.cc/?u=jane"
                      rounded
                      style={{ height: "2rem", width: "2rem" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="task_list">
          <div className="title">Done</div>
          <div className="body__list" id="done_task">
            {userProjectsList.slice(12).map((item, index) => (
              <div
                key={index}
                className="project__box"
                onClick={() => openModal(item)}
              >
                <p className="pb-4 font-sans">{item.projectName}</p>
                <div className="flex justify-between">
                  <div>
                    <i className="mr-2 fa fa-bookmark"></i>
                    <i className="fa fa-arrow-down"></i>
                  </div>
                  <div className="flex avatar__icon">
                    <Avatar
                      alt="User"
                      img="https://i.pravatar.cc/?u=marry"
                      rounded
                      style={{ height: "2rem", width: "2rem" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* test */}
      </div>
    </div>
  );
};

export default DashBroad;
