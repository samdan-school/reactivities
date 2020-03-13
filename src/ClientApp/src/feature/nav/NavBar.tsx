import React from 'react';
import {Button, Menu} from "antd";
import {AppstoreOutlined} from '@ant-design/icons';
import {observer} from "mobx-react-lite";
import {Link} from "@reach/router";

const NavBar: React.FC = () => {
  return (
    <Menu mode='horizontal'>
      <Menu.Item key="home">
        <Link to='/'>
          <AppstoreOutlined/>
          Reactivities
        </Link>
      </Menu.Item>
      <Menu.Item key="activities">
        <Link to='/activities'>
          Activities
        </Link>
      </Menu.Item>
      <Menu.Item key="new-activities">
        <Link to='createActivity'>
          <Button>Create Activity</Button>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default observer(NavBar);