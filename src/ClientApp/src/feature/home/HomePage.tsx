import React from 'react';
import {Layout} from "antd";
import {Link, RouteComponentProps} from "@reach/router";

const {Content} = Layout;

interface IProps extends RouteComponentProps {
  id?: string;
}

const HomePage: React.FC<IProps> = () => {
  return (
    <Content style={{marginTop: '7em'}}>
      <h1>Hi</h1>
      <h2><Link to='/activities'>Go to activities</Link></h2>
    </Content>
  );
};

export default HomePage;