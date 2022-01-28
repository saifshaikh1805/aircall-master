import React, { useState } from 'react';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import MyTabs from './MyTabs.js';

import { Routes, Route } from 'react-router-dom';
import Call from './Call.js';
import Header from './Header.jsx';

const App = () => {
  return (
    <Container>
      <Row>
        <Col>
        {/* <Header></Header> */}
            <Routes>
            <Route path="/" element={<MyTabs />} exact />
            <Route path="/call/:id" element={<Call />} />
            </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
