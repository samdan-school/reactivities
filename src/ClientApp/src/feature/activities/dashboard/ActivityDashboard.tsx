import React, {useContext, useEffect} from 'react';
import {Col, PageHeader, Row} from "antd";
import ActivityList from "feature/activities/dashboard/ActivityList";
import {observer} from "mobx-react-lite";
import ActivityStore from "app/stores/activityStore";
import {RouteComponentProps} from "@reach/router";
import LoadingCmp from "app/layout/LoadingCmp";

interface IProps extends RouteComponentProps {
  id?: string;
}

const ActivityDashboard: React.FC<IProps> = () => {
  const activityStore = useContext(ActivityStore);
  const {loadActivities, loadingInitial} = activityStore;

  useEffect(() => {
    loadActivities()
  }, [loadActivities]);

  if (loadingInitial) return <LoadingCmp tip='Loading Activities...'/>;

  return (
    <Row className="content">
      <Col span={16}>
        <PageHeader title="Reactivity" className={'context'}>
          <ActivityList/>
        </PageHeader>
      </Col>
      <Col span={8} style={{marginTop: 60}}>
        <h2>Activity filter</h2>
      </Col>
    </Row>
  );
};

export default observer(ActivityDashboard);