import { ReactNode } from "react";
import "./Modal.css";

export interface ModalProps {
    shown: boolean
    hide: () => void
    children?: ReactNode
    width?: number | 200
    height?: number | 100
}

export default function Modal(props: ModalProps) {
    return (
        <div className={props.shown ? "modal" : "modal-hidden"}>
            <div className="modal-content" style={{ height: props.height, width: props.width }}>
                <button className="close-button" onClick={props.hide}>&times;</button>
                <div className="modal-children">{props.children}</div>
            </div>
        </div>
    )
}