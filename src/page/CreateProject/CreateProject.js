import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./styleModal.css";
import { Button, Form, Input, Radio } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useDispatch, useSelector } from "react-redux";
import { addNewProject } from "../../redux/projectSlice/projectSlice";
export default function CreateProject() {
  const dispatch = useDispatch();
  // const createProject = useSelector((state) => state.addNewProject.value);
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
    const result = dispatch(addNewProject(formData));
    console.log("Result", result);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
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
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Alias"
          name="alias"
          rules={[
            {
              required: true,
              message: "Please input your Alias!",
            },
          ]}
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
            initialValue=""
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
  );
}
