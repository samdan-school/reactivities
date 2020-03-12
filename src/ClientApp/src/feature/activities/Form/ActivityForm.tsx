import React from 'react';
import {Form, Input, DatePicker, Button} from "antd";
import Moment from 'moment';
import {IActivity} from "app/models/activity";

const {Item} = Form;
const {TextArea} = Input;

interface IProps {
  activity: IActivity | undefined;
  setEditMode: (editMode: boolean) => void;
}

const ActivityForm: React.FC<IProps> = ({setEditMode, activity}) => {
  return (
    <div style={{padding: 15, marginTop: 20, backgroundColor: 'white'}}>
      <Form>
        <Input style={{marginBottom: 10}} placeholder='Title' value={activity?.title}/>
        <TextArea style={{marginBottom: 10}} placeholder='Description' value={activity?.description}/>
        <Input style={{marginBottom: 10}} placeholder='Category' value={activity?.category}/>
        <DatePicker style={{marginBottom: 10, width: '100%'}} placeholder='Date' value={Moment(activity?.date)}/>
        <Input style={{marginBottom: 10}} placeholder='City' value={activity?.city}/>
        <Input style={{marginBottom: 10}} placeholder='Venue' value={activity?.venue}/>
        <Item>
          <Button type="primary" htmlType="submit">Submit</Button>
          <Button type="danger" htmlType="submit" onClick={() => setEditMode(false)}>Cancel</Button>
        </Item>
      </Form>
    </div>
  );
};

export default ActivityForm;