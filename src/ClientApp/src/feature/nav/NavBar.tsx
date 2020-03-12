import React, {useContext} from 'react';
import {Button, Menu} from "antd";
import {AppstoreOutlined} from '@ant-design/icons';
import {observer} from "mobx-react-lite";
import ActivityStore from "app/stores/activityStore";

const NavBar: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {openCrateForm} = activityStore;
  return (
    <Menu mode='horizontal'>
      <Menu.Item key="mail">
        <AppstoreOutlined/>
        Reactivities
      </Menu.Item>
      <Menu.Item key="activities">Activities</Menu.Item>
      <Menu.Item key="new-activities">
        <Button onClick={() => openCrateForm()} type='primary'> Create Activity </Button>
      </Menu.Item>
    </Menu>
  );
};

export default observer(NavBar);