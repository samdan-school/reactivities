import React, {useContext, useEffect} from 'react';
import {Button, Card} from "antd"
import {CloseOutlined, EditOutlined} from '@ant-design/icons';
import ActivityStore from "app/stores/activityStore";
import {observer} from "mobx-react-lite";
import {Link, navigate, RouteComponentProps} from "@reach/router";
import LoadingCmp from "app/layout/LoadingCmp";

const {Meta} = Card;

interface IProps extends RouteComponentProps {
  id?: string;
}

const ActivityDetails: React.FC<IProps> = ({id}) => {
  const activityStore = useContext(ActivityStore);
  const {selectedActivity: activity, openEditForm, loadActivity, loadingInitial} = activityStore;
  useEffect(() => {
    if (id) loadActivity(id);
  }, [activityStore, id, loadActivity]);

  if (loadingInitial) return <LoadingCmp tip='Loading Activity...'/>;

  return (
    <Card
      className='content'
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
          <Link to={`/manage/${activity?.id}`}>
            Edit
          </Link>
        </Button>,
        <Button
          style={{width: '100%'}}
          icon={<CloseOutlined key='cancel'/>}
          onClick={() => navigate('/activities')}>
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