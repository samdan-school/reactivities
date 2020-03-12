import React, {useContext, useEffect} from 'react';
import 'antd/dist/antd.css';
import {observer} from "mobx-react-lite";
import {Layout} from 'antd';
import NavBar from 'feature/nav/NavBar';
import ActivityDashboard from 'feature/activities/dashboard/ActivityDashboard';
import LoadingCmp from "app/layout/LoadingCmp";
import ActivityStore from "app/stores/activityStore";

const {Header} = Layout;

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingCmp tip='Loading Activity'/>

  return (
    <Layout>
      <Header> <NavBar/> </Header>
      <ActivityDashboard/>
    </Layout>
  );
};

export default observer(App);
