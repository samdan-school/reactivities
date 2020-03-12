import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'antd/dist/antd.css'

import {Col, Layout, Row} from 'antd';
import {IActivity} from "app/models/activity";
import NavBar from "feature/nav/NavBar";
import ActivityDashboard from "feature/activities/dashboard/ActivityDashboard";
import ActivityDetails from "feature/activities/Details/ActivityDetails";
import ActivityForm from "feature/activities/Form/ActivityForm";

const {Header} = Layout;

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity>();
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
  };

  const onCreateForm = () => {
    setSelectedActivity(undefined);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([activity, ...activities]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleEditActivity = (activity: IActivity) => {
    setActivities(activities.map(a => a.id === activity.id ? activity : a));
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter(a => a.id !== id));
  };

  useEffect(() => {
    axios.get<IActivity[]>('https://localhost:5001/api/activities').then((res) => {
      setActivities(res.data);
    });
    return setActivities([]);
  }, []);

  return (
    <>
      <Layout>
        <Header>
          <NavBar onCreateForm={onCreateForm}/>
        </Header>
        <Row className='content'>
          <Col span={16}>
            <ActivityDashboard
              selectActivity={handleSelectActivity}
              activities={activities}
              editMode={editMode}
              setEditMode={setEditMode}
              deleteActivity={handleDeleteActivity}/>
          </Col>
          <Col
            span={8}
            style={{marginTop: 60}}>
            <div style={{position: 'fixed', width: '500px'}}>
              {selectedActivity && !editMode &&
              <ActivityDetails
                activity={selectedActivity}
                selectActivity={handleSelectActivity}
                setEditMode={setEditMode}/>}
              {editMode &&
              <ActivityForm
                setEditMode={setEditMode}
                activity={selectedActivity}
                createActivity={handleCreateActivity}
                editActivity={handleEditActivity}/>}
            </div>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default App;
