import React from 'react';
import { Image } from 'react-bootstrap';
import "../styles/components/ReadingListsItem.scss";

export type ReadingListItemProps = {
    image: string
    tagTitle: string
    text: string
    styles?: string
}

const ReadingListsItem = (props: ReadingListItemProps) => {
    return (
        <div className={`reading-list-item-wrapper d-flex col-md-6 col-10 ${props.styles? props.styles : ""}`}>
            <div className="reading-list-image-wrapper col-6">
                <Image src={props.image} alt={props.tagTitle+"_img"} rounded fluid/>
            </div>
            <div className="reading-list-content-wrapper col">
                <div className="item-title">{props.tagTitle}</div>
                <div className="item-text">{props.text}</div>
            </div>
        </div>
    );
};

export default ReadingListsItem;
