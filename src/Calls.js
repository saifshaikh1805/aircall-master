import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { HiPhoneIncoming, HiPhoneOutgoing, HiArchive } from 'react-icons/hi';
import { RiInboxArchiveLine, RiInboxUnarchiveLine } from 'react-icons/ri';
import { getCalls } from './myFunctions.js';
import { useNavigate } from "react-router-dom";

function Calls(props) {
  const [calls, setCalls] = useState(null);
  const [toggle, setToggle] = useState(false);
  const nav = useNavigate();
  useEffect(() => {
    // var theCalls = null;
    (async () => {
      let theCalls = await getCalls(props.req);
      setCalls(theCalls);
    })();
  }, [toggle])

  const viewCallDetails = (ev, cid) => {
    ev.stopPropagation();
    if (ev.target.tagName !== 'svg' && ev.target.tagName !== 'BUTTON') {
      nav('/call/' + cid.toString(), { state: cid });
    }
  }

  const handleArchiveToggle = (ev, id, toggleVal) => {
    console.log(toggleVal);
    ev.preventDefault();
    console.log(id);
    fetch('https://aircall-job.herokuapp.com/activities/' + id, {
      method: 'POST',
      body: JSON.stringify({ is_archived: toggleVal })
    })
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      setToggle(!toggle);
    })
    .catch(err => console.log(err))
  }

  return (
    <Container>
      <Row>
        <Col>
          {
            calls !== null ?
              Object.keys(calls).map(i =>
              (
                <div>
                  <h6 className='date-heading'>{i}</h6>
                  <Table bordered striped hover key={i}>
                    <tbody>
                      {

                        calls[i].map(c => {
                          return (
                            <tr key={c.id}
                              onClick={(e) => { viewCallDetails(e, c.id) }}
                            >
                              <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                {
                                  c.direction === 'inbound' ?
                                    <HiPhoneIncoming size={30}></HiPhoneIncoming>
                                    :
                                    <HiPhoneOutgoing size={30}></HiPhoneOutgoing>
                                }
                              </td>
                              <td>
                                <h6>{c.from}</h6>
                                <div>{c.call_type === 'missed' ? 'tried to call' : 'called'} {c.to !== null ? c.to : ' via' + c.via}</div>
                              </td>
                              <td>
                                {new Date(c.created_at).toLocaleTimeString().split(':')[0] + ':' + new Date(c.created_at).toLocaleTimeString().split(':')[1]}
                              </td>
                              <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                <Button className='btn-arch' variant={c.is_archived ? 'success' : 'danger'} onClick={(e) => { handleArchiveToggle(e, c.id, !c.is_archived) }}>
                                  {
                                    c.is_archived ? <RiInboxUnarchiveLine></RiInboxUnarchiveLine> : <RiInboxArchiveLine></RiInboxArchiveLine>
                                  }
                                </Button>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
                </div>
              )) : <React.Fragment></React.Fragment>
          }
        </Col>
      </Row>
    </Container>
  )
}

export default Calls;


