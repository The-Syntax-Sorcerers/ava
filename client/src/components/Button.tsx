// import React from "react";

interface buttonProps {
    id: string,
    type: string,
    colour: string,
    className: string,
    iconR: string,
    iconB: string,
    iconL: string,
    onClick: () => {},
    text: string,
}

export default function Button({props}: {props: buttonProps}) {
    return (
        <>
            <button
                type={props.type === "submit" ? "submit" : "button"}
                className={props.colour + " " + props.className}
                style={{ display: `${props.iconB ? "grid" : "inline"}` }}
                id={props.id}
                onClick={props.onClick}
            >
                {props.iconL ? props.iconL : ""}
                <span>{props.text}</span>
                {props.iconR ? props.iconR : ""}
                {props.iconB ? props.iconB : ""}
            </button>
        </>
    );
}