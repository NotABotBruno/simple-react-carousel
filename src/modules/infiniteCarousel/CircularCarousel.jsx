import { useEffect } from "react"
import "./CircularCarousel.css"
import { useRef } from "react";
import { useState } from "react";

function CircularCarousel(params) {
    
    const [centeredIndex,setCenteredIndex] = useState(2);

    const [listOfButtons, setListOfButton] = useState(["1","2","3","4"]);

    useEffect(() => {

        const elementList = document.querySelectorAll("div.circular-element");
        
        elementList.forEach((element) => {
            if(parseInt(element.getAttribute("index")) === centeredIndex + 2)
                element.classList.add("visually-hidden");

            const elementIndex = parseInt(element.getAttribute("index"));
            if(elementIndex === centeredIndex)
                element.classList.add("centered");
        });

        const leftArrow = document.querySelector("div.left-arrow");
        const rightArrow = document.querySelector("div.right-arrow");

    },[]);

    useEffect(()=>{
        const elementList = document.querySelectorAll("div.circular-element");

        console.log(centeredIndex)
        elementList.forEach((element) => {
            if(parseInt(element.getAttribute("index")) === centeredIndex)
                element.classList.add("centered");
            else
            {
                element.classList.remove("centered");
                element.classList.remove("visually-hidden");
            }

            if(parseInt(element.getAttribute("index")) === centeredIndex + 2)
                element.classList.add("visually-hidden");
        });

    },[centeredIndex]);

    const handleLeftArrowClick = () => {

        if(listOfButtons.lenght === 0)
        return;
    
        const firstElement = listOfButtons.shift();

        setListOfButton([...listOfButtons,firstElement]);

        return;
    };

    const handleRightArrowClick = () => {
        if (listOfButtons.length === 0)
            return;

        const lastElement = listOfButtons.pop();

        setListOfButton([lastElement,...listOfButtons]);
        return;
    };

    return (
        <>
            <div className="circular-carousel-container">
                {
                    listOfButtons.map((item,index) => (
                        <div key={index} className="circular-element" id={item} index={item}>{item}</div>   
                    ))
                }
            </div>
            <div className="arrow left-arrow" onClick={handleLeftArrowClick}>
                <img src="src/resources/right-arrow-better.svg" alt="" />
            </div>
            <div className="arrow right-arrow" onClick={handleRightArrowClick}>
                <img src="src/resources/right-arrow-better.svg" alt=""  className="flipped"/>               
            </div>
        </>
    )
}

export default CircularCarousel