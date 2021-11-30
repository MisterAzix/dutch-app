import React from "react";

export default function Heart(props) {
    return (
        <svg className={props.className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.16939 5.80616C-1.72314 13.5477 -1.72313 26.0993 5.16941 33.8408L32.0208 63.9997L32.021 63.9995L32.0214 64L58.8307 33.8885C65.7232 26.1469 65.7232 13.5954 58.8307 5.85384C51.9381 -1.8877 40.7631 -1.8877 33.8706 5.85385L32.0213 7.93097L30.1295 5.80616C23.2369 -1.93539 12.0619 -1.93539 5.16939 5.80616Z" fill="#FF0000"/>
        </svg>
    )
}