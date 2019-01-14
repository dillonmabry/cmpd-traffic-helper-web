import React from 'react';
import Section from './Section';
import Search from '../containers/Search';
import MapContainer from '../containers/MapContainer';

export default class Main extends React.Component {
  render() {
    return (
      <div>
        <div className="container-fluid mt-2">
          <Section title={"Search Accidents"} body={<Search />} />
          <MapContainer />
        </div>
      </div>
    );
  }
}