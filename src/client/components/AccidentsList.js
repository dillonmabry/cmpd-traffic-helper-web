import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';

const listStyle = {
    height: 'calc(100vh - 210px)' // Auto-calc main list height
};

export default class Accidents extends React.Component {
    constructor() {
        super();
        this.renderRow = this.renderRow.bind(this);
        this.cache = new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: 100
        });
    }
    renderRow = ({ index, key, style, parent }) => {
        return (
            <CellMeasurer
                key={key}
                cache={this.cache}
                parent={parent}
                columnIndex={0}
                rowIndex={index}>
                <div key={key} style={style}>
                    <ListGroupItem className="row">
                        {this.props.accidentsList[index]}
                    </ListGroupItem>
                </div>
            </CellMeasurer>
        );
    }
    render() {
        return (
            <div>
                {this.props.accidentsList.length > 0 ?
                    <div>
                        <small>{this.props.accidentsList.length} results returned</small>
                        <ListGroup flush style={listStyle}>
                            <AutoSizer>
                                {
                                    ({ width, height }) => {
                                        return <List
                                            width={width}
                                            height={height}
                                            deferredMeasurementCache={this.cache}
                                            rowHeight={this.cache.rowHeight}
                                            rowRenderer={this.renderRow}
                                            rowCount={this.props.accidentsList.length}
                                            overscanRowCount={3} />
                                    }
                                }
                            </AutoSizer>
                        </ListGroup>
                    </div> : null}
            </div>
        );
    }
}