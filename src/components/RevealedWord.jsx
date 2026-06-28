function RevealedWord(props){
    if(props.word == null || props.word == '')
        return;

    let wordLetters = [...props.word];
    
    return(
        <div className="revealed-word">
            {
                wordLetters.map(
                    (letter,index) => 
                        <div key={index} className="revealed-letter prevent-select">
                            {
                                props.revealedLetters.has(letter) ? 
                                    letter : 
                                    props.showNotFound ? 
                                        <span style={{color:'#aa3e32'}}>{letter}</span> : 
                                        ''
                            }
                        </div>
                )
            }
        </div>
    )
}

export {RevealedWord}