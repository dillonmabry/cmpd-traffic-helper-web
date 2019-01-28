import React from 'react';
import { 
  Card,
  CardHeader,
  CardBody,
  Input,
  FormGroup,
  Label,
  Badge,
  Collapse,
  Col,
  Row
} from 'reactstrap';

export default class Accident extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  render() {
    return (
      <div>
        <Card className="mb-2">
          <CardHeader className="btn text-left" onClick={this.toggle}>
            <Row>
              <Col>{this.props.accident.address}</Col>
              <Col align={"right"}><small>{this.props.accident.datetime_add}</small></Col>
            </Row>
          </CardHeader>
          <Collapse isOpen={this.state.collapse}>
            <CardBody className="mb-2">
              <FormGroup>
                <Label for="event_no">Event No</Label>
                <Input type="text" name="event_no" id="event_no" readOnly value={this.props.accident.event_no} />
              </FormGroup>
              <FormGroup>
                <Label for="address">Address</Label>
                <Input type="text" name="address" id="address" readOnly value={this.props.accident.address} />
              </FormGroup>
              <FormGroup>
                <Label for="event_desc">Event Desc</Label>
                <Input type="text" name="event_desc" id="event_desc" readOnly value={this.props.accident.event_desc} />
              </FormGroup>
              <FormGroup>
                <Label for="event_type">Event Type</Label>
                <Input type="text" name="event_type" id="event_type" readOnly value={this.props.accident.event_type} />
              </FormGroup>
              <FormGroup>
                <Label for="temp">Temperature (k)</Label>
                <Input type="text" name="temp" id="temp" readOnly value={this.props.accident.weatherInfo.main.temp} />
              </FormGroup>
              <FormGroup>
                <Label for="weatherInfo">Weather Info</Label>
                {this.props.accident.weatherInfo.weather.map((info, i) =>
                  <Badge key={i} color="primary" pill className="ml-2 mr-2">{info.main}</Badge>
                )}
              </FormGroup>
            </CardBody>
          </Collapse>
        </Card>
    </div>
    );
  }
}