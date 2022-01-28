import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { BiArrowBack } from 'react-icons/bi'
import { useNavigate, useParams } from 'react-router';
import { getCall } from './myFunctions.js';

function Call(props) {
    // console.log(props)
    const { id } = useParams();
    const nav = useNavigate();
    const [call, setCall] = useState(null);
    useEffect(() => {
        (async () => {
            let theCall = await getCall(id);
            console.log(theCall);
            setCall(theCall);
        })();
    }, [])

    const backToHome = (ev) => {
        nav('/');
    }

    return (
        <Container fluid style={{ padding: 10 }}>
            <Row>
                <Col>
                    <Button variant="primary" onClick={(e) => {backToHome(e)}}>
                        <BiArrowBack></BiArrowBack> Back
                    </Button>
                    {
                        call !== null ?
                            <React.Fragment>
                                <h2>Call details</h2>
                                <Table bordered striped hover>
                                    <tbody>
                                        {
                                            Object.keys(call).map(i =>
                                                <tr>
                                                    <td>{i}</td>
                                                    <td>{call[i]}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </Table>
                            </React.Fragment> : <React.Fragment></React.Fragment>
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Call;