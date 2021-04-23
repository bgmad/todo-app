import React from "react";
import { Menu } from 'antd';

const Folder = (props) => {
  return (
    <Menu.SubMenu key="sub4" title={props.self.title}>
      <Menu.Item key="9">Option 9</Menu.Item>
      <Menu.Item key="10">Option 10</Menu.Item>
      <Menu.Item key="11">Option 11</Menu.Item>
      <Menu.Item key="12">Option 12</Menu.Item>
    </Menu.SubMenu>
  );
};

export default Folder;