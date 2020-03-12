import React from 'react';
import {Col, Row, Spin} from "antd";

const LoadingCmp: React.FC<{ tip?: string }> = ({tip}) => {
  return (
    <Row style={{height: '100vh'}} justify='center' align='middle'>
      <Col span={8} offset={7}>
        <Spin size="large" tip={tip}/>
      </Col>
    </Row>
  );
};

export default LoadingCmp;