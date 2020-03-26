import React, {useContext, useState} from 'react';
import {Button, Grid, GridColumn, Header, TabPane} from "semantic-ui-react";
import {RootStoreContext} from "../../app/stores/rootStore";
import ProfileEditForm from "./ProfileEditForm";
import {observer} from "mobx-react-lite";
import {IProfile} from "../../app/models/profile";

const ProfileAbout = () => {
  const rootStore = useContext(RootStoreContext);
  const {profile, isCurrentUser, updateProfile} = rootStore.profileStore;
  const [editMode, setEditMode] = useState(false);

  const handleUpdateProfile = (profile: Partial<IProfile>) => {
    updateProfile(profile).then(() => setEditMode(false));
  };

  return (
    <TabPane>
      <Grid>
        <GridColumn width={16} style={{paddingBottom: 0}}>
          <Header floated='left' icon='edit' content='Photos'/>
          {isCurrentUser && (<Button floated='right' basic content={editMode ? 'Cancel' : 'Edit'} onClick={() => setEditMode(!editMode)}/>)}
        </GridColumn>
        <GridColumn width={16}>
          <Grid.Column width={16}>
            {editMode ? (
              <ProfileEditForm updateProfile={handleUpdateProfile} profile={profile!}/>
            ) : (
              <span>{profile!.bio}</span>
            )}
          </Grid.Column>
        </GridColumn>
      </Grid>
    </TabPane>
  );
};

export default observer(ProfileAbout);