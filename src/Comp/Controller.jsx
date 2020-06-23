import React from 'react';
import CellState from '../Classes/CellState';
import Grid from './Grid';

export default class Controller extends React.Component
{
    Size = 0

    constructor(props)
    {
        super(props);
        this.Size = props.size;
        this.state = { Items: [] }
        for (let i = 0; i < props.size; i++)
            for (let z = 0; z < props.size; z++)
                this.state.Items.push(new CellState(z, i, false));
    }

    update()
    {
        let tempItems = this.state.Items;
        for (let i = 0; i < this.Size * (this.Size / 2); i++)
            tempItems[i].state = !tempItems[i].state;
        this.setState({ Items: tempItems });
    }

    componentDidMount()
    {
        let intervalId = setInterval(this.update.bind(this), 1000);
        this.setState({ intervalId: intervalId });
    }

    componentWillUnmount()
    {
        clearInterval(this.state.intervalId);
    }

    render()
    {
        return (
            <div>
                <Grid items={this.state.Items} size={this.Size} />
            </div>
        );
    }
}