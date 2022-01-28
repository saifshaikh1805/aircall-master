import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { HiPhoneMissedCall } from 'react-icons/hi';

function Item(props) {
    return (
        <Container fluid style={{marginTop: 10}}>
            <Row>
                <Col>
                    <div style={{ display: 'flex' }}>
                        <div>
                            <HiPhoneMissedCall size={30}></HiPhoneMissedCall>
                        </div>
                        <div>
                            <div>Jonathan Anguelov</div>
                            <div>tried to call 06 45 13 53 91</div>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div>{
                        new Date('2018-04-18T16:59:48.000Z').toLocaleTimeString().split(':')[0] + ':' + new Date('2018-04-18T16:59:48.000Z').toLocaleTimeString().split(':')[1]
                    }</div>
                </Col>
            </Row>
        </Container>
    );
}
export default Item;