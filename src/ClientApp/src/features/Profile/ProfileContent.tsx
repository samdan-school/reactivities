import React from 'react';
import {Tab, TabPane} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import ProfilePhoto from "./ProfilePhoto";

const panes = [
  {menuItem: 'About', render: () => <TabPane>About content</TabPane>},
  {menuItem: 'Photos', render: () => <ProfilePhoto/>},
  {menuItem: 'Activities', render: () => <TabPane>Activities content</TabPane>},
  {menuItem: 'Followers', render: () => <TabPane>Followers content</TabPane>},
  {menuItem: 'Following', render: () => <TabPane>Following content</TabPane>}
];

const ProfileContent = () => {
  return (
    <Tab
      menu={{fluid: true, vertical: true}}
      menuPosition='right'
      panes={panes}
      activeIndex={1}/>
  );
};

export default observer(ProfileContent);