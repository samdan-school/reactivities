import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';

import {Col, Layout, Row} from 'antd';
import {IActivity} from 'app/models/activity';
import NavBar from 'feature/nav/NavBar';
import ActivityDashboard from 'feature/activities/dashboard/ActivityDashboard';
import ActivityDetails from 'feature/activities/Details/ActivityDetails';
import ActivityForm from 'feature/activities/Form/ActivityForm';
import agent from 'app/api/agent';
import LoadingCmp from "app/layout/LoadingCmp";

const {Header} = Layout;

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity>();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(true);
  const [target, setTarget] = useState('');

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter((a) => a.id === id)[0]);
  };

  const onCreateForm = () => {
    setSelectedActivity(undefined);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setTarget(activity.id);
    setSubmitting(true);
    agent.Activities.create(activity)
      .then(() => {
        setActivities([activity, ...activities]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
  };

  const handleEditActivity = (activity: IActivity) => {
    setTarget(activity.id);
    setSubmitting(true);
    agent.Activities.update(activity)
      .then(() => {
        setActivities(activities.map((a) => (a.id === activity.id ? activity : a)));
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
  };

  const handleDeleteActivity = (id: string) => {
    setTarget(id);
    setSubmitting(true);
    agent.Activities.delete(id)
      .then(() => {
        setActivities(activities.filter((a) => a.id !== id));
        setSelectedActivity(undefined);
        setSubmitting(false);
      });
  };

  useEffect(() => {
    setSubmitting(false);
    agent.Activities.list()
      .then((res) => {
        setActivities(res);
      })
      .then(() => setLoading(false));
    return () => {
      setTarget('');
      setActivities([]);
      setLoading(true);
      setSubmitting(true);
    };
  }, []);

  if (loading)
    return <LoadingCmp tip='Loading Activity'/>

  return (
    <Layout>
      <Header>
        <NavBar onCreateForm={onCreateForm}/>
      </Header>
      <Row className="content">
        <Col span={16}>
          <ActivityDashboard
            submitting={submitting}
            selectActivity={handleSelectActivity}
            activities={activities}
            editMode={editMode}
            setEditMode={setEditMode}
            deleteActivity={handleDeleteActivity}
            target={target}/>
        </Col>
        <Col span={8} style={{marginTop: 60}}>
          <div style={{position: 'fixed', width: '500px'}}>
            {selectedActivity &&
            !editMode && (
              <ActivityDetails
                activity={selectedActivity}
                selectActivity={handleSelectActivity}
                setEditMode={setEditMode}
              />
            )}
            {editMode && (
              <ActivityForm
                submitting={submitting}
                setEditMode={setEditMode}
                activity={selectedActivity}
                createActivity={handleCreateActivity}
                editActivity={handleEditActivity}
              />
            )}
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default App;
