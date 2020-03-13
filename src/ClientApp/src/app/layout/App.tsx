import React from 'react';
import 'antd/dist/antd.css';
import {observer} from "mobx-react-lite";
import {Layout} from 'antd';
import NavBar from 'feature/nav/NavBar';
import ActivityDashboard from 'feature/activities/dashboard/ActivityDashboard';
import {RouteComponentProps, Router} from "@reach/router";
import ActivityForm from "feature/activities/Form/ActivityForm";
import ActivityDetails from "feature/activities/Details/ActivityDetails";
import HomePage from "feature/home/HomePage";

const {Header} = Layout;

const Content: React.FC<RouteComponentProps> = ({children}) => (
  <Layout>
    <Header><NavBar/></Header>
    {children}
  </Layout>
);

const App = () => {
  return (
    <Router>
      <HomePage path='/'/>
      <Content path='/'>
        <ActivityDashboard path='/activities'/>
        <ActivityDetails path='/activities/:id'/>
        <ActivityForm path='/createActivity'/>
        <ActivityForm path='/manage/:id'/>
      </Content>
    </Router>
  );
};

export default observer(App);
