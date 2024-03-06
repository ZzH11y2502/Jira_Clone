import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Form, Input, Radio } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useDispatch } from "react-redux";
import { updateProject } from "../../redux/projectSlice/projectSlice";
import { useLocation, useNavigate } from "react-router-dom";
export default function EditProject() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectQueryString = queryParams.get("project");
  const project = projectQueryString
    ? JSON.parse(decodeURIComponent(projectQueryString))
    : null;
  console.log(project, "Edit project");
  const editorRef = useRef(null);
  const handleEditorChange = (content, editor) => {
    console.log("content updated", content);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    let formData = { ...values };
    if (values.description) {
      formData.description = values.description.level.content;
    }
    console.log(formData, "formData updated");
    // Dispatch
    const result = dispatch(updateProject(formData));

    console.log("Result", result);
    navigate("/managementpage");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center">
      <div style={{ maxWidth: "640px", height: "100vh" }}>
        {/* Header */}
        <div style={{ margin: "auto" }}>
          <p className="font-sans text-center head__title">Project Details</p>
        </div>
        {/* Contents */}

        <Form
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 800,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* Project ID */}
          <Form.Item
            label="Project ID"
            name="id"
            rules={[
              {
                required: true,
                message: "Please input your Project!",
              },
            ]}
            initialValue={project.id}
          >
            <Input autoFocus={true} />
          </Form.Item>
          {/* Project Name */}

          <Form.Item
            label="Project Name"
            name="projectName"
            rules={[
              {
                required: true,
                message: "Please input your Project!",
              },
            ]}
            initialValue={project.projectName}
          >
            <Input />
          </Form.Item>
          {/* Alias */}
          <Form.Item
            label="Alias"
            name="alias"
            rules={[
              {
                required: true,
                message: "Please input your Alias!",
              },
            ]}
            initialValue={project.alias}
          >
            <Input />
          </Form.Item>
          {/* Creator */}
          <Form.Item
            label="Creator"
            name="creator"
            rules={[
              {
                required: true,
                message: "Please input your Alias!",
              },
            ]}
            initialValue={project.creator.id}
          >
            <Input />
          </Form.Item>
          {/* Category */}
          <Form.Item name="categoryId" label="Category ID">
            <Radio.Group>
              <Radio value="1">Web</Radio>
              <Radio value="2">Phần mềm</Radio>
              <Radio value="3">Di động</Radio>
            </Radio.Group>
          </Form.Item>
          {/* Discription */}
          <FormItem label="Description" name="description">
            <Editor
              id="description"
              apiKey="bf3ijvb0dtg2ony0uu4siyzg2hedu7hy6euahdccuf309scw"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={project.description}
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
            ></Editor>
          </FormItem>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              style={{ backgroundColor: "#38598b" }}
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
