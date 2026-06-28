function Lives(props){
    let lives = Array(props.fullHealth).fill(true);
    lives = lives.fill(false,props.healthLeft);

    return(
        <section className="heart-container">

            {lives.map( (l,index) => {
                let heart = l ? 'full-heart' : 'empty-heart';
                return <div key={index} className={'heart ' + heart}></div>
            })}

            {props.healthLeft}/{props.fullHealth}
        </section>
    )
}

export {Lives}