import React, { useState } from "react";
import "./App.less";
import { connect } from "react-redux";
import { Menu, Input, Form, Button, Alert, Checkbox } from "antd";

import { createFolder, addItem, toggleCompleted } from "./store/actions/index";

function App(props) {
  const [folderError, setFolderError] = useState(false);
  const [itemError, setItemError] = useState(false);

  const handleCreateFolder = (value) => {
    props.createFolder(value.title);
  };

  const handleFolderFail = (error) => {
    setFolderError(true);
    setTimeout(() => {
      setFolderError(false);
    }, 10 * 1000);
  };

  const handleAddItem = (value) => {
    const folderId = value.title.length - 1;
    const title = value.title[folderId];
    props.addItem(folderId, title);
  };

  const handleAddItemFail = (error) => {
    setItemError(true);
    setTimeout(() => {
      setItemError(false);
    }, 10 * 1000);
  };

  return (
    <div>
      {itemError && (
        <Alert
          message="Item title needed"
          type="error"
          showIcon
          style={{ position: "sticky", top: "0px", left: "0px", zIndex: "5" }}
        />
      )}
      {folderError && (
        <Alert
          message="Folder title needed"
          type="error"
          showIcon
          style={{ position: "sticky", top: "0px", left: "0px", zIndex: "5" }}
        />
      )}
      <Menu
        style={{ width: "100%" }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
      >
        {props.folders.map((folder) => (
          <Menu.SubMenu
            key={`${folder.id}-${folder.title}`}
            title={folder.title}
          >
            {folder.items.map((item) => (
              <Menu.Item key={`${item.id}-${item.title}-${item.dateCreated}`}>
                <Checkbox
                  onChange={() => props.toggleCompleted(folder.id, item.id)}
                  checked={item.completed}
                >
                  {item.title}
                </Checkbox>
              </Menu.Item>
            ))}
            <Menu.Item>
              <Form
                onFinish={handleAddItem}
                onFinishFailed={handleAddItemFail}
                style={{ display: "flex", paddingRight: "24px" }}
              >
                <Form.Item
                  name={["title", folder.id]}
                  rules={[{ required: true }]}
                  noStyle={true}
                >
                  <Input placeholder="Add item" style={{ height: "40px" }} />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" type="primary">
                    Add
                  </Button>
                </Form.Item>
              </Form>
            </Menu.Item>
          </Menu.SubMenu>
        ))}
        <Menu.Item disabled={true}>
          <Form
            onFinish={handleCreateFolder}
            onFinishFailed={handleFolderFail}
            style={{ display: "flex" }}
          >
            <Form.Item name="title" rules={[{ required: true }]} noStyle={true}>
              <Input placeholder="New folder" style={{ height: "40px" }} />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Create
              </Button>
            </Form.Item>
          </Form>
        </Menu.Item>
      </Menu>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state.todo);
  return { folders: state.todo };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createFolder: (title) => dispatch(createFolder(title)),
    addItem: (folderId, itemTitle) => dispatch(addItem(folderId, itemTitle)),
    toggleCompleted: (folderId, itemId) => dispatch(toggleCompleted(folderId, itemId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);