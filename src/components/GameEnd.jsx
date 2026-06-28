function GameEnd(props){
    
    return(
        <div className="game-end-container">
            {props.game == 'won' ? 
                <div className="game-end win">You won well done</div> :
                <div className="game-end lose">You lost, try again</div>
            }
        </div>
    )
}

export {GameEnd}