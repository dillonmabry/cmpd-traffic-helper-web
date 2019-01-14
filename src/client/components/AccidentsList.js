import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const Accidents = ({ accidentsList }) => (
    <div>
    { accidentsList.length > 0 ? 
        <div>
            <small>{ accidentsList.length } results returned</small>
            <ListGroup flush>
                <ListGroupItem>
                    {accidentsList}
                </ListGroupItem>
            </ListGroup>
        </div> : null }
    </div>
  )

export default Accidents;