import React, {useEffect} from 'react';
import {Form, Input, DatePicker, Button} from "antd";
import Moment from 'moment';
import {v4 as uuid} from 'uuid';
import {IActivity} from "app/models/activity";

const {Item} = Form;
const {TextArea} = Input;

interface IProps {
  activity: IActivity | undefined;
  setEditMode: (editMode: boolean) => void;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
}

const ActivityForm: React.FC<IProps> = ({setEditMode, activity, createActivity, editActivity}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
  }, [activity, form]);

  const onFinish = (values: any) => {
    values = {
      ...values,
      date: values.date.format()
    };
    if (activity) {
      console.log(values);
      editActivity({id: activity.id, ...values});
    } else {
      createActivity({id: uuid(), ...values});
    }
  };
  return (
    <div style={{padding: 15, marginTop: 20, backgroundColor: 'white'}}>
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{
          ...activity,
          date: Moment(activity?.date)
        }}>
        <Item name='title'>
          <Input placeholder='Title'/>
        </Item>
        <Item name='description'>
          <TextArea placeholder='Description'/>
        </Item>
        <Item name='category'>
          <Input placeholder='Category'/>
        </Item>
        <Item name='date'>
          <DatePicker style={{width: '100%'}} placeholder='Date'/>
        </Item>
        <Item name='city'>
          <Input placeholder='City'/>
        </Item>
        <Item name='venue'>
          <Input placeholder='Venue'/>
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">Submit</Button>
          <Button type="danger" htmlType="submit" onClick={() => setEditMode(false)}>Cancel</Button>
        </Item>
      </Form>
    </div>
  );
};

export default ActivityForm;