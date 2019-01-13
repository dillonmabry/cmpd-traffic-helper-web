import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

//TODO: Make list items expandable to show details

const Accidents = ({ accidentsList }) => (
    <ListGroup flush>
        <ListGroupItem>
            {accidentsList}
        </ListGroupItem>
      </ListGroup>
  )

export default Accidents;