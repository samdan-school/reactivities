import React from 'react';
import {Button, Menu} from "antd";
import {
  AppstoreOutlined
} from '@ant-design/icons';

interface IProps {
  onCreateForm: () => void;
}

const NavBar: React.FC<IProps> = ({onCreateForm}) => {
  return (
    <Menu mode='horizontal'>
      <Menu.Item key="mail">
        <AppstoreOutlined/>
        Reactivities
      </Menu.Item>
      <Menu.Item key="activities">Activities</Menu.Item>
      <Menu.Item key="new-activities">
        <Button onClick={() => onCreateForm()} type='primary'> Create Activity </Button>
      </Menu.Item>
    </Menu>
  );
};

export default NavBar;