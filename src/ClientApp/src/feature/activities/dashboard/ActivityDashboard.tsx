import React from 'react';
import {PageHeader} from "antd";
import {IActivity} from "app/models/activity";
import ActivityList from "feature/activities/dashboard/ActivityList";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  deleteActivity: (id: string) => void;
}

const ActivityDashboard: React.FC<IProps> = ({activities, selectActivity, setEditMode, deleteActivity}) => {
  return (
    <PageHeader title="Reactivity" className={'context'}>
      <ActivityList selectActivity={selectActivity} setEditMode={setEditMode} activities={activities} deleteActivity={deleteActivity}/>
    </PageHeader>
  );
};

export default ActivityDashboard;