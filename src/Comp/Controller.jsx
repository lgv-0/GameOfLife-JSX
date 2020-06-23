import React from 'react';
import CellState from '../Classes/CellState';
import Grid from './Grid';

export default class Controller extends React.Component
{
    Size = 0

    GetIDperPosition(x, y)
    {
        let Adder = 1;
        for (let idf = 0; idf < this.Size * this.Size; idf += Adder)
        {
            if (this.state.Items[idf].posY === y)
            {
                Adder = 1;
                if (this.state.Items[idf].posX === x)
                    return idf;
            }
            else
                Adder = this.Size - 1;
        }
        return 7;
    }

    constructor(props)
    {
        super(props);
        this.Size = props.size;
        this.state = { Items: [] }
        for (let i = 0; i < props.size; i++)
            for (let z = 0; z < props.size; z++)
                this.state.Items.push(new CellState(z, i, false));

        let pos1 = {}, pos2 = {}, pos3 = {}, pos4 = {}, pos5 = {};
        let Halfway = { x: Math.round(props.size / 2), y: Math.round(props.size / 2) };
		pos1.x = Halfway.x - 2;
		pos1.y = Halfway.y;
		pos2.x = pos1.x;
		pos2.y = pos1.y + 1;
		pos3.x = pos1.x;
		pos3.y = pos2.y + 1;
		pos4.x = pos1.x - 1;
		pos4.y = pos3.y;
		pos5.x = pos4.x - 1;
        pos5.y = pos2.y;
		this.state.Items[this.GetIDperPosition(pos1.x, pos1.y)].state = true;
		this.state.Items[this.GetIDperPosition(pos2.x, pos2.y)].state = true;
		this.state.Items[this.GetIDperPosition(pos3.x, pos3.y)].state = true;
		this.state.Items[this.GetIDperPosition(pos4.x, pos4.y)].state = true;
		this.state.Items[this.GetIDperPosition(pos5.x, pos5.y)].state = true;
    }

    update()
    {
        let tempItems = this.state.Items;

        for (let i = 0; i < tempItems.length; i++)
        {
            let current = tempItems[i];
            if (current.posX > 2 && current.posY > 2 &&
                current.posX < this.Size - 2 && current.posY < this.Size - 2)
            {
                let isAlive = current.state;

                let aliveNeighbors = 0;

                if (tempItems[i - 1].state)
                    aliveNeighbors++;
                if (tempItems[i + 1].state)
                    aliveNeighbors++;
            
                let neighborUpIndex = i - this.Size;
                let neighborDownIndex = i + this.Size;

                if (tempItems[neighborUpIndex].state)
                    aliveNeighbors++;
                if (tempItems[neighborUpIndex - 1].state)
                    aliveNeighbors++;
                if (tempItems[neighborUpIndex + 1].state)
                    aliveNeighbors++;

                if (tempItems[neighborDownIndex].state)
                    aliveNeighbors++;
                if (tempItems[neighborDownIndex - 1].state)
                    aliveNeighbors++;
                if (tempItems[neighborDownIndex + 1].state)
                    aliveNeighbors++;
                
                if (isAlive)
                {
                    if (aliveNeighbors < 2 || aliveNeighbors > 3)
                        tempItems[i].state = false;
                }
                else if (aliveNeighbors === 3)
                {
                    tempItems[i].state = true;
                }
            }
        }

        this.setState({ Items: tempItems });
    }

    componentDidMount()
    {
        let intervalId = setInterval(this.update.bind(this), 300);
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