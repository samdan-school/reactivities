﻿import React, {useContext} from 'react';
import {Card, Grid, Header, TabPane} from 'semantic-ui-react';
import {RootStoreContext} from '../../app/stores/rootStore';
import ProfileCard from './ProfileCard';
import {observer} from "mobx-react-lite";

const ProfileFollowings = () => {
  const rootStore = useContext(RootStoreContext);
  const {profile, loading, followings, activeTab} = rootStore.profileStore;
  return (
    <TabPane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='user'
            content={
              activeTab === 3
                ? `People following ${profile!.displayName}`
                : `People ${profile!.displayName} is following`
            }
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={5}>
            {
              followings.map(profile => (
                <ProfileCard key={profile.username} profile={profile}/>
              ))
            }
          </Card.Group>
        </Grid.Column>
      </Grid>
    </TabPane>
  );
};

export default observer(ProfileFollowings);