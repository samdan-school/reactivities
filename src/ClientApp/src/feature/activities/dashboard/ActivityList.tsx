import React from 'react';
import {Button, Card, Tag} from "antd";
import Meta from "antd/es/card/Meta";
import {IActivity} from "app/models/activity";

interface IProps {
  activities: IActivity[],
  selectActivity: (id: string) => void;
  setEditMode: (editMode: boolean) => void;
  deleteActivity: (id: string) => void;
}

const ActivityList: React.FC<IProps> = ({activities, selectActivity, setEditMode, deleteActivity}) => {
  return (
    <div>
      {activities.map(activity => (
        <Card key={activity.id}>
          <Meta
            title={<h1 style={{marginBottom: 0, paddingBottom: 0}}>{activity.title}</h1>}
            description={activity.date}
          />
          <div style={{marginTop: 15}}>{activity.description}</div>
          <div>{activity.city}</div>
          <Tag style={{marginTop: 10, padding: 5}}>{activity.category}</Tag>
          <Button
            type='primary'
            style={{float: "right", marginLeft: 15}}
            onClick={() => {
              selectActivity(activity.id);
              setEditMode(false);
            }}>
            View
          </Button>
          <Button
            style={{float: "right"}}
            type='danger'
            onClick={() => deleteActivity(activity.id)}>
            Delete</Button>
        </Card>
      ))}
    </div>
  );
};

export default ActivityList;