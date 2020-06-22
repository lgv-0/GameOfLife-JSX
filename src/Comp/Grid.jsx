import React, { useRef } from 'react';
import styled from "styled-components";

function Grid(props)
{
    let CanvasRef = useRef(null);
    let Canvas = <GridContainer ref={CanvasRef} />;

    if (CanvasRef.current !== null)
    {
        var scale = window.devicePixelRatio;
        CanvasRef.current.width = Math.floor(props.size * scale);
        CanvasRef.current.height = Math.floor(props.size * scale);
        let Context = CanvasRef.current.getContext('2d');

        props.items.forEach((i)=>
        {
            if (i.state === 0)
                Context.fillStyle = "rgba("+255+","+255+","+255+","+(255/255)+")";
            else
                Context.fillStyle = "rgba("+0+","+0+","+0+","+(255/255)+")";

            Context.fillRect(i.posX, i.posY, 1, 1);
        });
    }

    return (
        Canvas
    );
}

let GridContainer = styled.canvas`
    border: 3px solid black;
`;

export default Grid;