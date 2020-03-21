import React, {useContext, useState} from 'react';
import {Button, ButtonGroup, Card, CardGroup, Grid, GridColumn, Header, Image, TabPane} from "semantic-ui-react";
import {RootStoreContext} from "../../app/stores/rootStore";
import PhotoUploadWidget from "../../app/common/photoUpload/PhotoUploadWidget";
import {observer} from "mobx-react-lite";
import {IPhoto} from "../../app/models/profile";

const ProfilePhoto = () => {
  const rootStore = useContext(RootStoreContext);
  const {profile, isCurrentUser, uploadingPhoto, uploadPhoto, setMainPhoto, deletePhoto, loading} = rootStore.profileStore;
  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState<string | undefined>();
  const [delTarget, setDelTarget] = useState<string | undefined>();

  const handleUploadImage = (photo: Blob) => {
    uploadPhoto(photo).then(() => setAddPhotoMode(false));
  };

  const handleSetMainPhoto = (photo: IPhoto) => {
    setTarget(photo.id);
    setMainPhoto(photo)
  };

  const handleDeletePhoto = (photo: IPhoto) => {
    setDelTarget(photo.id);
    deletePhoto(photo)
  };

  return (
    <TabPane>
      <Grid>
        <GridColumn width={16} style={{paddingBottom: 0}}>
          <Header floated='left' icon='image' content='Photos'/>
          {isCurrentUser && (
            <Button floated='right' basic content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                    onClick={() => setAddPhotoMode(!addPhotoMode)}/>
          )}
        </GridColumn>
        <GridColumn width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget uploadPhoto={handleUploadImage} loading={uploadingPhoto}/>
          ) : (
            <CardGroup itemsPerRow={5}>
              {
                profile && profile.photos.map((photo) => (
                  <Card key={photo.id}>
                    <Image src={photo.url}/>
                    {isCurrentUser && (
                      <ButtonGroup fluid widths={2}>
                        <Button
                          floated='right' basic positive content='Main'
                          loading={loading && photo.id === target} disabled={loading && photo.id === target || photo.isMain}
                          onClick={() => handleSetMainPhoto(photo)}/>
                        <Button
                          floated='right' basic negative icon='trash'
                          loading={loading && photo.id === delTarget} disabled={loading && photo.id === delTarget || photo.isMain}
                          onClick={() => deletePhoto(photo)}/>
                      </ButtonGroup>
                    )}
                  </Card>
                ))
              }
            </CardGroup>
          )}
        </GridColumn>
      </Grid>
    </TabPane>
  );
};

export default observer(ProfilePhoto);