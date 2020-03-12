import React from 'react';
import {Button, Card} from "antd"
import {EditOutlined, CloseOutlined} from '@ant-design/icons';
import {IActivity} from "app/models/activity";

const {Meta} = Card;

interface IProps {
  activity: IActivity | undefined;
  selectActivity: (id: string) => void;
  setEditMode: (editMode: boolean) => void;
}

const ActivityDetails: React.FC<IProps> = ({activity, setEditMode, selectActivity}) => {
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
          style={{width: '100%'}} onClick={() => setEditMode(true)}
          icon={<EditOutlined key="edit"/>}>
          Edit
        </Button>,
        <Button
          style={{width: '100%'}}
          icon={<CloseOutlined key='cancel'/>}
          onClick={() => selectActivity('0')}>
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

export default ActivityDetails;