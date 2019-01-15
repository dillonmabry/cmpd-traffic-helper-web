import React from 'react';
import { Card, CardBody } from 'reactstrap';

const Section = ({ title, body }) => (
    <div>
      <Card className="container-fluid mb-2">
        <CardBody className="mb-2">
          <h5>{title}</h5>
          {body}
        </CardBody>
      </Card>
    </div>
  )

export default Section;