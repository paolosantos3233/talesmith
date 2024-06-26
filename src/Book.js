import './Book.css';
import HTMLFlipBook from "react-pageflip";
import React, { useRef, useEffect } from "react";

import book_cover from "./assets/book_cover.png";
import back_cover from "./assets/book_cover_back.png";
import back1_cover from "./assets/book_cover_back1.png";
import left_page from "./assets/book_page_left.png";
import right_page from "./assets/book_page_right.png";

const BookCover = React.forwardRef((props, ref) => {
    return (
        <div className="page page-cover" ref={ref}>
            <img className="PageImage" src={book_cover}/>
        </div>
    );
});

const BackCover = React.forwardRef((props, ref) => {
    return (
        <div className="page page-cover" ref={ref}>
            <img className="PageImage" src={back_cover}/>
        </div>
    );
});

const BackCover1 = React.forwardRef((props, ref) => {
    return (
        <div className="page page-cover" ref={ref}>
            <img className="PageImage" src={back1_cover}/>
        </div>
    );
});

const LeftPage = React.forwardRef((props, ref) => {
    return (
        <div className="page" ref={ref}>
            <div className="page-content">
                <img className="PageImage" src={left_page}/>
                <div className="page-text">{props.generatedContent}</div>
            </div>
        </div>
    );
});

const RightPage = React.forwardRef((props, ref) => {
    return (
        <div className="page" ref={ref}>
            <div className="page-content">
                <img className="PageImage" src={right_page}/>
                <div className="page-text">{props.generatedContent}</div>
            </div>
        </div>
    );
});

function TaleBook(props) {

    const book = useRef();

    useEffect(() => {
        const delay = 1000;
        const timer = setTimeout(() => {
            book.current.pageFlip().flipNext();
        }, delay);

        return () => clearTimeout(timer);
    }, []);

    const nextButtonClick = () => {
        book.current.pageFlip().flipNext();
    };

    const prevButtonClick = () => {
        book.current.pageFlip().flipPrev();
    }

    const pages = props.generatedContent.map((content, index) => {
        if (index % 2 === 0) {
            return <RightPage key={index} generatedContent={content} />;
        } else {
            return <LeftPage key={index} generatedContent={content} />;
        }
    });

    return (
        <>
            <HTMLFlipBook
                width={550}
                height={733}
                maxShadowOpacity={0.5}
                showCover={true}
                usePortrait={false}
                showPageCorners={false}
                ref={book}
            >   
                <BookCover/>
                <BackCover/>
                {pages}
                <BackCover1/>
                <BackCover/>
            </HTMLFlipBook>
            <div className='buttonContainer'>
                <button className="prevBt" type="button" onClick={prevButtonClick}>
                    Previous Page
                </button>
                <button className="nextBt"type="button" onClick={nextButtonClick}>
                    Next Page
                </button>
            </div>
        </>
    );
}

export default TaleBook;