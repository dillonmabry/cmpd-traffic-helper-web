import React from 'react';
import { Card, CardBody, CardTitle} from 'reactstrap';

const Section = ({ title, body }) => (
    <div>
      <Card className="container-fluid">
        <CardBody className="mb-2">
          <h5>{title}</h5>
          {body}
        </CardBody>
      </Card>
    </div>
  )

export default Section;