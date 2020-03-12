import React, {useContext} from 'react';
import {Button, Card, Tag} from "antd";
import Meta from "antd/es/card/Meta";
import {observer} from "mobx-react-lite";
import ActivityStore from "app/stores/activityStore";

const ActivityList: React.FC = () => {
    const activityStore = useContext(ActivityStore);
    const {activitiesByDate, selectActivity, setEditMode, submitting, target, deleteActivity} = activityStore;
    return (
      <div>
        {activitiesByDate.map(activity => (
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
              loading={activity.id === target && submitting}
              onClick={() => deleteActivity(activity.id)}>
              Delete
            </Button>
          </Card>
        ))}
      </div>
    );
  }
;

export default observer(ActivityList);