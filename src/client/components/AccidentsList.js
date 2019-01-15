import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { List } from 'react-virtualized';

const height = 1000;
const rowHeight = 100;
const width = 1200;

export default class Accidents extends React.Component {
  rowRenderer = ({ index, isScrolling, key, style }) => {
      return (
          <div key={key} style={style}>
              <ListGroupItem>
                  {this.props.accidentsList[index]}
              </ListGroupItem>
          </div>
      );
  };
  render() {
    return (
        <div>
            { this.props.accidentsList.length > 0 ?
            <div>
                <small>{ this.props.accidentsList.length } results returned</small>
                <ListGroup flush>
                    <List
                        rowCount={this.props.accidentsList.length}
                        width={width}
                        height={height}
                        rowHeight={rowHeight}
                        rowRenderer={this.rowRenderer}
                        overscanRowCount={3}
                    />
                </ListGroup>
            </div> : null }
        </div>
    );
  }
}