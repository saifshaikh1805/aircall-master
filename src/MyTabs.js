import React, { useState } from 'react';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import Calls from './Calls';

function MyTabs(props) {
    return (
        <Tabs defaultActiveKey={'inbox'}>
            <Tab eventKey='allCalls' title='All Calls'>
                <Calls req='all'></Calls>
            </Tab>
            <Tab eventKey='inbox' title='Inbox'>
                <Calls req='unarch'></Calls>
            </Tab>
            <Tab eventKey='archived' title='Archived'>
                <Calls req='arch'></Calls>
            </Tab>
            {/* <Tab eventKey='call' title='Call'>
              <Call></Call>
            </Tab> */}
        </Tabs>
    )
}


export default MyTabs;