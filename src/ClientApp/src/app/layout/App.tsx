import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'antd/dist/antd.css'

import {Layout} from 'antd';
import {IActivity} from "app/models/activity";
import NavBar from "feature/nav/NavBar";
import ActivityDashboard from "feature/activities/dashboard/ActivityDashboard";

const {Header, Footer, Sider, Content} = Layout;

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    axios.get<IActivity[]>('https://localhost:5001/api/activities').then((res) => {
      setActivities(res.data);
    });
    return setActivities([]);
  }, []);

  return (
    <>
      <Layout>
        <Header><NavBar/></Header>
        <Layout className='content'>
          <Content>
            <ActivityDashboard activities={activities}/>
          </Content>
          <Sider>Sider</Sider>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
