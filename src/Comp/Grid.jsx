import React from 'react';
import styled from "styled-components";

export default class Grid extends React.Component
{
    constructor(props)
    {
        super(props);
        this.Size = props.size;
        this.Items = props.items;
        this.CanvasRef = React.createRef();
        this.Canvas = <GridContainer ref={this.CanvasRef} />;
    }

    render()
    {
        if (this.CanvasRef.current !== null)
        {
            var scale = window.devicePixelRatio;
            this.CanvasRef.current.width = Math.floor(this.Size * scale);
            this.CanvasRef.current.height = Math.floor(this.Size * scale);
            let Context = this.CanvasRef.current.getContext('2d');

            this.Items.forEach((i)=>
            {
                if (!i.state)
                    Context.fillStyle = "rgba("+255+","+255+","+255+","+(255/255)+")";
                else
                    Context.fillStyle = "rgba("+0+","+0+","+0+","+(255/255)+")";

                Context.fillRect(i.posX, i.posY, 1, 1);
            });
        }

        return (
            this.Canvas
        )
    }
}

let GridContainer = styled.canvas`
    border: 3px solid black;
`;