import React from 'react';
import Section from './Section';
import Search from '../containers/Search';
import Container from './Container';

export default class Main extends React.Component {
  render() {
    return (
      <Container main={
        <div>
          <div className="container-fluid mt-2">
            <Section title={"Search Accidents"} body={<Search />} />
          </div>
        </div>}
      />
    );
  }
}