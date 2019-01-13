import React from 'react';
//import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Input, FormGroup, Label, ListGroupItem, Badge } from 'reactstrap';

//TODO: Define proptypes, setup input form controls readonly, make expandable on list

const Accident = ({ accident }) => (
  <div>
    <Card className="mb-2">
      <CardHeader>{accident.address}</CardHeader>
      <CardBody className="mb-2">
        <FormGroup>
          <Label for="event_no">Event No</Label>
          <Input type="text" name="event_no" id="event_no" readOnly value={accident.event_no} />
        </FormGroup>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input type="text" name="address" id="address" readOnly value={accident.address} />
        </FormGroup>
        <FormGroup>
          <Label for="event_desc">Event Desc</Label>
          <Input type="text" name="event_desc" id="event_desc" readOnly value={accident.event_desc} />
        </FormGroup>
        <FormGroup>
          <Label for="event_type">Event Type</Label>
          <Input type="text" name="event_type" id="event_type" readOnly value={accident.event_type} />
        </FormGroup>
        <FormGroup>
          <Label for="temp">Temperature (k)</Label>
          <Input type="text" name="temp" id="temp" readOnly value={accident.weatherInfo.main.temp} />
        </FormGroup>
        <FormGroup>
          <Label for="weatherInfo">Weather Info</Label>
          {accident.weatherInfo.weather.map((info, i) =>
            <Badge key={i} color="primary" pill className="ml-2 mr-2">{info.main}</Badge>
          )}
        </FormGroup>
      </CardBody>
    </Card>
  </div>
)

export default Accident;