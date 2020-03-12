import React, {useContext} from 'react';
import {Col, PageHeader, Row} from "antd";
import ActivityList from "feature/activities/dashboard/ActivityList";
import ActivityDetails from "feature/activities/Details/ActivityDetails";
import ActivityForm from "feature/activities/Form/ActivityForm";
import {observer} from "mobx-react-lite";
import ActivityStore from "app/stores/activityStore";

const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {
    selectedActivity,
    editMode,
  } = activityStore;

  return (
    <Row className="content">
      <Col span={16}>
        <PageHeader title="Reactivity" className={'context'}>
          <ActivityList />
        </PageHeader>
      </Col>
      <Col span={8} style={{marginTop: 60}}>
        <div style={{position: 'fixed', width: '500px'}}>
          {selectedActivity && !editMode && <ActivityDetails/>}
          {editMode && <ActivityForm/>}
        </div>
      </Col>
    </Row>
  );
};

export default observer(ActivityDashboard);