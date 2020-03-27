import React from 'react';
import {Image, List, ListItem, Popup} from "semantic-ui-react";
import {IAttendee} from "../../../app/models/activity";

interface IProps {
  attendees: IAttendee[]
}

const styles = {
  border: '2px solid orange'
};

const ActivitiesListItemAttendees: React.FC<IProps> = ({attendees}) => {
  return (
    <List horizontal>
      {
        attendees.map(attendee => (
          <ListItem key={attendee.username}>
            <Popup
              header={attendee.displayName}
              trigger={
                <Image
                  size='mini'
                  circular
                  src={attendee.image || '/assets/user.png'}
                  style={attendee.following ? styles : null}/>
              }
            />
          </ListItem>
        ))
      }
    </List>
  );
};

export default ActivitiesListItemAttendees;