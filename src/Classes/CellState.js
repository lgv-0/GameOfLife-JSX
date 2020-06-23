class CellState
{
    posX = null;
    posY = null;
    state = false;

    constructor(posX, posY, state)
    {
        this.posX = posX;
        this.posY = posY;
        this.state = state;
    }
}

export default CellState;