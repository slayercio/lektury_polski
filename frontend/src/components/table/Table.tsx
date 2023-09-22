import { useEffect, useState } from 'react';
import './Table.css';
import SingleAnswerItem, { SingleAnswerProps } from '../item/Item';
import Modal from '../modal/Modal';
import Developer from '../developer/Developer';


export default function Table() {
    const [data, setData] = useState<SingleAnswerProps[]>()
    const [showCorrect, setShowCorrect] = useState(false)
    const [showIncorrect, setShowIncorrect] = useState(false)
    const [amount, setAmount] = useState<number>(0)

    const DEVELOPER = import.meta.env.MODE == "development"

    function shuffleArray(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    async function fetchData() {
        try {
            const fetched = await fetch('/get_books', { method: "GET" });
            let jsonData = await fetched.json();

            shuffleArray(jsonData)
            jsonData = jsonData.slice(0, amount)

            setData(jsonData)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => { fetchData() }, [amount])

    return (
        <div className="table">
            <div className="settings">
                <label className="settings-label">Amount:&nbsp;&nbsp;</label>
                <input type="text" className="settings-input" onChange={event => setAmount(parseInt(event.target.value))}/>
            </div>

            <div className="item-container">
                {data?.map(item => {
                    return <SingleAnswerItem {...item} key={item.id} showCorrect={() => setShowCorrect(true)} showIncorrect={() => setShowIncorrect(true)}/>
                })}
            </div>
            <div className="settings">
                <button className="settings-refresh" onClick={() => fetchData()}>Refresh!</button>
            </div>

            {/* { DEVELOPER ? <Developer showModal={() => setShowCorrect(true)} hideModal={() => setShowCorrect(false)}/> : <></>}
            { DEVELOPER ? <Developer showModal={() => setShowIncorrect(true)} hideModal={() => setShowIncorrect(false)}/> : <></>} */}

            <Modal shown={showCorrect} hide={() => setShowCorrect(false)} width={250} height={50}>
                <p>Correct answer!</p>
            </Modal>

            <Modal shown={showIncorrect} hide={() => setShowIncorrect(false)} width={250} height={50}>
                <p>Incorrect answer!</p>
            </Modal>
        </div>
    )
}