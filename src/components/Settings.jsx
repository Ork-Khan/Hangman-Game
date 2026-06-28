function Settings(props){
    return(
        <form>
            <p>Change the settings for new game</p>

            <label>
                Word length: 
                <input 
                    type="number" 
                    name="word-size" 
                    onChange={(event) => props.handleSize(event.target.valueAsNumber)} 
                    defaultValue={props.defaultSize}>    
                </input>
            </label>

            <label>
                Number of lives:
                <input 
                    type="number" 
                    name="lives" 
                    onChange={(event) => props.handleLives(event.target.valueAsNumber)} 
                    defaultValue={props.defaultLife}>    
                </input>
            </label>
        </form>
    )
}

export {Settings}