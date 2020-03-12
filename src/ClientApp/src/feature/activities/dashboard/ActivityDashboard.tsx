import React from 'react';
import {PageHeader} from "antd";
import {IActivity} from "app/models/activity";
import ActivityList from "feature/activities/dashboard/ActivityList";

interface IProps {
  submitting: boolean;
  activities: IActivity[];
  selectActivity: (id: string) => void;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  deleteActivity: (id: string) => void;
  target: string;
}

const ActivityDashboard: React.FC<IProps> = ({submitting, activities, selectActivity, setEditMode, deleteActivity, target}) => {
  return (
    <PageHeader title="Reactivity" className={'context'}>
      <ActivityList
        submitting={submitting}
        selectActivity={selectActivity}
        setEditMode={setEditMode}
        activities={activities}
        deleteActivity={deleteActivity}
        target={target}/>
    </PageHeader>
  );
};

export default ActivityDashboard;