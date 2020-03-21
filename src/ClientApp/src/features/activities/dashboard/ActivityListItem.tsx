import React from 'react';
import {Button, Icon, Item, Label, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {IActivity} from '../../../app/models/activity';
import {format} from 'date-fns';
import ActivitiesListItemAttendees from "./ActivitiesListItemAttendees";

const ActivityListItem: React.FC<{ activity: IActivity }> = ({activity}) => {
  const host = activity.attendees.filter(a => a.isHost)[0];
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src={host.image || '/assets/user.png'} style={{marginBlock: 3}}/>
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>{activity.title}</Item.Header>
              <Item.Description>Hosted by <Link to={`/profile/${host.username}`}>{host.displayName}</Link></Item.Description>
              {
                activity.isHost &&
                <Item.Description>
                  <Label basic color='orange' content='You are hosting this activity'/>
                </Item.Description>
              }
              {
                !activity.isHost && activity.isGoing &&
                <Item.Description>
                  <Label basic color='green' content='You are going this activity'/>
                </Item.Description>
              }
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name='clock'/> {format(activity.date, 'h:mm a')}
        <Icon name='marker'/> {activity.venue}, {activity.city}
      </Segment>
      <Segment secondary>
        <ActivitiesListItemAttendees attendees={activity.attendees}/>
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          floated='right'
          content='View'
          color='blue'
        />
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItem;
