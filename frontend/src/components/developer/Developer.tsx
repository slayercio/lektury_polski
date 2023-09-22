export interface DeveloperProps {
    showModal: () => void;
    hideModal: () => void;
}


export default function Developer(props: DeveloperProps) {
    return (
        <div className="developer-settings">
            <button onClick={props.showModal}>Show modal!</button>
            <button onClick={props.hideModal}>Hide modal!</button>
        </div>
    )
}