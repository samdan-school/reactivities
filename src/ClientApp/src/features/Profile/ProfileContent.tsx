import React from 'react';
import {Tab, TabPane} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import ProfilePhoto from "./ProfilePhoto";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowings from "./ProfileFollowings";

interface IProps {
  setActiveTab: (activeIndex: any) => void;
}

const panes = [
  {menuItem: 'About', render: () => <ProfileAbout/>},
  {menuItem: 'Photos', render: () => <ProfilePhoto/>},
  {menuItem: 'Activities', render: () => <TabPane>Activities content</TabPane>},
  {menuItem: 'Followers', render: () => <ProfileFollowings/>},
  {menuItem: 'Following', render: () => <ProfileFollowings/>}
];

const ProfileContent: React.FC<IProps> = ({setActiveTab}) => {
  return (
    <Tab
      menu={{fluid: true, vertical: true}}
      menuPosition='right'
      panes={panes}
      onTabChange={(e, data) => setActiveTab(data.activeIndex || 0)}/>
  );
};

export default observer(ProfileContent);