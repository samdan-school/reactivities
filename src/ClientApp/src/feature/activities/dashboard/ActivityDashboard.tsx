import React from 'react';
import {PageHeader} from "antd";
import {IActivity} from "app/models/activity";
import ActivityList from "feature/activities/dashboard/ActivityList";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
}

const ActivityDashboard: React.FC<IProps> = ({activities, selectActivity, setEditMode}) => {
  return (
    <PageHeader title="Reactivity" className={'context'}>
      <ActivityList selectActivity={selectActivity} setEditMode={setEditMode} activities={activities}/>
    </PageHeader>
  );
};

export default ActivityDashboard;