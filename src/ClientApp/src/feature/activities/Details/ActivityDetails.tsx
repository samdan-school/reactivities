import React, {useContext} from 'react';
import {Button, Card} from "antd"
import {CloseOutlined, EditOutlined} from '@ant-design/icons';
import ActivityStore from "app/stores/activityStore";
import {observer} from "mobx-react-lite";

const {Meta} = Card;

const ActivityDetails: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {selectedActivity: activity, cancelSelectedActivity, openEditForm} = activityStore;
  return (
    <Card
      cover={
        <img
          alt="category"
          src={`/asserts/categoryImages/${activity?.category}.jpg`}/>
      }
      actions={[
        <Button
          type='primary'
          style={{width: '100%'}} onClick={() => openEditForm(activity!.id)}
          icon={<EditOutlined key="edit"/>}>
          Edit
        </Button>,
        <Button
          style={{width: '100%'}}
          icon={<CloseOutlined key='cancel'/>}
          onClick={cancelSelectedActivity}>
          Cancel
        </Button>
      ]}>
      <Meta
        title={<h1>{activity?.title}</h1>}
        description={activity?.date}/>
      {activity?.description}
    </Card>
  );
};

export default observer(ActivityDetails);