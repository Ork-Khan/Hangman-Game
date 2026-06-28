function Keyboard(props){
    const alphabet = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    return (
        <div className="keyboard"> 
            {alphabet.map( x => {
                let keyboardClass;
                
                if(props.correct.has(x))
                    keyboardClass = 'letter correct-letter prevent-select';
                else if(props.wrong.has(x))
                    keyboardClass = 'letter wrong-letter prevent-select';
                else
                    keyboardClass = 'letter prevent-select'

                if(props.gameEnded)
                    keyboardClass += ' disabled'

                return <div
                            onClick={() => props.handleClick(x)} 
                            key={x} 
                            className={keyboardClass}>
                        {x}
                        </div>
            })}
        </div>    
    )
}

export {Keyboard}