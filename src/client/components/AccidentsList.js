import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const Accidents = ({ accidentsList }) => (
    <div>
    { accidentsList ? <ListGroup flush>
        <ListGroupItem>
            {accidentsList}
        </ListGroupItem>
    </ListGroup> : null }
    </div>
  )

export default Accidents;