import { useEffect, useMemo, useRef, useState } from 'react';
import './Item.css';

export interface SingleAnswerProps {
    era: string;
    author: string;
    title: string;
    genre: string;
    theme: string;
    characters: string[];
    id: number;
    showCorrect: () => void;
    showIncorrect: () => void;
};

export default function SingleAnswerItem(props: SingleAnswerProps) {
    const randomCharacter = useMemo(() => { return props.characters[Math.floor(Math.random() * props.characters.length)]; }, [])
    
    const [era, setEra] = useState('')
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [genre, setGenre] = useState('')
    const [theme, setTheme] = useState('')
    const [character, setCharacter] = useState('')
    const [tried, setTried] = useState(1)

    const [visible, setVisible] = useState([Math.floor(Math.random() * 5), Math.floor(Math.random() * 5)]);

    function verify() {
        setTried(tried + 1)
        let valid = true;

        if(visible.indexOf(0) === -1 && era.toUpperCase() !== props.era.toUpperCase()) valid = false;
        if(visible.indexOf(1) === -1 && author.toUpperCase() !== props.author.toUpperCase()) valid = false;
        if(visible.indexOf(2) === -1 && title.toUpperCase() !== props.title.toUpperCase()) valid = false;
        if(visible.indexOf(3) === -1 && genre.toUpperCase() !== props.genre.toUpperCase()) valid = false;
        if(visible.indexOf(4) === -1 && theme.toUpperCase() !== props.theme.toUpperCase()) valid = false;
        
        let character_found = false;
        for(let charact of props.characters) {
            if(charact.toUpperCase() === character.toUpperCase()) character_found = true;
        }

        valid &&= character_found;

        console.log("Answers: ", {
            era: era,
            author: author,
            title: title,
            genre: genre,
            theme: theme
        })
        console.log("Correct: ", {
            era: props.era,
            author: props.author,
            title: props.title,
            genre: props.genre,
            theme: props.theme
        })
        console.log("Valid: ", valid, {
            era: era == props.era,
            author: author == props.author,
            title: title == props.title,
            genre: genre == props.genre,
            theme: theme == props.theme
        })

        function showAnswersAndLock() {
            setVisible([0, 1, 2, 3, 4, 5])

            props.showCorrect()
        }

        if(valid) {
            showAnswersAndLock();
        } else {
            if(tried > 3) { showAnswersAndLock(); return; }
            props.showIncorrect();
        }
    }
    
    return (
        <div className="item-grid" id={"item-" + props.id}>
            { visible.indexOf(0) === -1 ? <input className='item-input' type="text" onChange={event => setEra(event.target.value)} defaultValue=""/>:       <input disabled type="text" className="item-text" value={props.era !== '' ? props.era : "-"} /> }
            { visible.indexOf(1) === -1 ? <input className='item-input' type="text" onChange={event => setAuthor(event.target.value)} defaultValue=""/>:    <input disabled type="text" className="item-text" value={props.author !== '' ? props.author : "-"} /> }
            { visible.indexOf(2) === -1 ? <input className='item-input' type="text" onChange={event => setTitle(event.target.value)} defaultValue=""/>:     <input disabled type="text" className="item-text" value={props.title !== '' ? props.title : "-"} /> }
            { visible.indexOf(3) === -1 ? <input className='item-input' type="text" onChange={event => setGenre(event.target.value)} defaultValue=""/>:     <input disabled type="text" className="item-text" value={props.genre !== '' ? props.genre : "-"} /> }
            { visible.indexOf(4) === -1 ? <input className='item-input' type="text" onChange={event => setTheme(event.target.value)} defaultValue=""/>:     <input disabled type="text" className="item-text" value={props.theme !== '' ? props.theme : "-"} /> }
            { visible.indexOf(5) === -1 ? <input className='item-input' type="text" onChange={event => setCharacter(event.target.value)} defaultValue=""/>: <input disabled type="text" className="item-text" value={randomCharacter !== '' ? randomCharacter : "-"} /> }
            <button className='verify' onClick={verify}>Sprawdź</button>
        </div>
    )
}