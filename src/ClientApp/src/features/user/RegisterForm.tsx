﻿import React, {useContext} from 'react';
import {Field, Form as FinalForm} from 'react-final-form';
import {Button, Form, Header} from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import {RootStoreContext} from "../../app/stores/rootStore";
import {IUserFormValues} from "../../app/models/user";
import {FORM_ERROR} from "final-form";
import {combineValidators, isRequired} from "revalidate";
import ErrorMessage from "../../app/common/form/ErrorMessage";

const validate = combineValidators({
  username: isRequired('username'),
  displayName: isRequired('displayName'),
  email: isRequired('email'),
  password: isRequired('password')
});

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const {register} = rootStore.userStore;

  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) => register(values).catch(error => ({[FORM_ERROR]: error}))}
      validate={validate}
      render={({handleSubmit, submitting, form, submitError, invalid, pristine, dirtySinceLastSubmit}) => (
        <Form onSubmit={handleSubmit} error>
          <Header as='h2' content='Sign Up to Reactivities' color='teal'/>
          <Field name='username' component={TextInput} placeholder='Username'/>
          <Field name='displayName' component={TextInput} placeholder='Display Name'/>
          <Field name='email' component={TextInput} placeholder='Email'/>
          <Field name='password' component={TextInput} placeholder='password' type='password'/>
          {
            submitError && !dirtySinceLastSubmit &&
            <ErrorMessage error={submitError}/>
          }
          <br/>
          <Button
            fluid
            disabled={invalid && !dirtySinceLastSubmit || pristine}
            loading={submitting}
            color='teal'
            content='Register'/>
        </Form>
      )}/>
  );
};

export default RegisterForm;