import React, { useState } from 'react';
import './App.less';
import { connect } from 'react-redux';
import { Menu, Input, Form, Button, Alert } from 'antd';

import { createFolder } from './store/actions/index';

function App(props) {

  const [error, setError] = useState(false);

  const handleCreateFolder = value => {
    console.log(value);
    props.createFolder(value.title);
  }

  const handleFolderFail = error => {
    setError(true);
    setTimeout(() => { setError(false) }, 10 * 1000)
    console.log(error);
  }

  return (
    <div>
      <Menu
        style={{ width: "100%" }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        {props.folders.map(folder => 
          <Menu.SubMenu key={`${folder.id}-${folder.title}`} title={folder.title}>
            {folder.items.map(item => 
              <Menu.Item key={`${item.id}-${item.title}-${item.dateCreated}`}>{item.title}</Menu.Item>
            )}
            <Menu.Item>
              <Button onClick={() => props.addItem(folder.id, "new item")} type="primary">add item</Button>
            </Menu.Item>
          </Menu.SubMenu>
        )}
        <Menu.Item disabled={true}>
          <Form onFinish={handleCreateFolder} onFinishFailed={handleFolderFail} style={{display: 'flex'}}>
            <Form.Item 
              name="title"
              rules={[{required: true}]}
              noStyle={true}
            >
              <Input placeholder="New folder" style={{height: '40px'}}/>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">Create</Button>
            </Form.Item>
          </Form>
        </Menu.Item>
      </Menu>
      {error && <Alert message="Folder title needed" type="error" showIcon />}
    </div>
  );
}

const mapStateToProps = state => {
  console.log(state.todo);
  return {folders: state.todo}
}

const mapDispatchToProps = dispatch => {
  return {
    createFolder: title => dispatch(createFolder(title)),
    addItem: (folderId, itemTitle) => dispatch({type: "ADD_ITEM", payload: {id: folderId, title: itemTitle}})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);