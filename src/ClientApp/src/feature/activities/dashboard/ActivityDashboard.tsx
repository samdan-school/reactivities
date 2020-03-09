import React from 'react';
import {List, PageHeader} from "antd";
import {IActivity} from "app/models/activity";

interface IProps {
  activities: IActivity[]
}

const ActivityDashboard: React.FC<IProps> = ({activities}) => {
  return (
    <div>
      <PageHeader title="Reactivity" className={'context'}>
        <List bordered dataSource={activities} renderItem={(v) => <List.Item>{v.title}</List.Item>}/>
      </PageHeader>
    </div>
  );
};

export default ActivityDashboard;