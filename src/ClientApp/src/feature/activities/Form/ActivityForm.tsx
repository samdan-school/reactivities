import React, {useContext, useEffect} from 'react';
import {Button, DatePicker, Form, Input} from "antd";
import Moment from 'moment';
import {v4 as uuid} from 'uuid';
import {observer} from "mobx-react-lite";
import ActivityStore from "app/stores/activityStore";

const {Item} = Form;
const {TextArea} = Input;

const ActivityForm: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {
    selectedActivity: activity,
    submitting,
    createActivity,
    editActivity,
    cancelFormOpen
  } = activityStore;

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
          <Button loading={submitting} type="primary" htmlType="submit">Submit</Button>
          <Button type="danger" htmlType="submit" onClick={cancelFormOpen}>Cancel</Button>
        </Item>
      </Form>
    </div>
  );
};

export default observer(ActivityForm);