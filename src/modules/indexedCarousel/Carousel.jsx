
import { useEffect, useRef, useState } from 'react'
import './Carousel.css'

function Carousel() {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputList, setInputList] = useState();
  const [initalPos, setInitalPos] = useState({x:0,y:0});
  const [initialScroll, setInitialScroll] = useState({x:0,y:0});
  
  const mouseState = useRef("idle");
  const throttleDelay = 26;

  useEffect(()=> {

    setInputList(document.querySelectorAll("input"));

    document.querySelectorAll("input")[currentPage - 1].checked = true;

    const element = document.querySelector("div#scroll-box");

    element.addEventListener("scrollend",(event) => {
      console.log("ScrollEnd");
    });

    element.addEventListener("drag",(event) => {
      event.preventDefault();
    });
    
    element.addEventListener("mousedown",(e) => {
      console.log('mouse down');
      document.getElementById("scroll-box").classList.remove("grab");
      document.getElementById("scroll-box").classList.add("grabbing");
      console.log(e);
      setInitalPos({x:e.clientX,y:e.clientY});
      setInitialScroll({x: e.scrollLeft, y:0});
      mouseState.current = "grabbing";
    });

    var throttleTimeout;
    element.addEventListener("mousemove",(e) => {
      if(mouseState.current === "grabbing")
      {
        throttleTimeout = setTimeout(() => {
          const curr = {x:e.clientX,y:e.clientY};
          const distance = getDistance(initalPos.x,curr.x);
          const element = document.querySelector("div#scroll-box");
          element.scrollLeft = (initialScroll.x + distance);
          throttleTimeout = null;
        },throttleDelay);
      }
    });

    element.addEventListener("mouseup", (event) => {
      document.getElementById("scroll-box").classList.remove("grabbing");
      document.getElementById("scroll-box").classList.add("grab");
      mouseState.current = "idle";
    });

    element.addEventListener("mouseover", (event) => {
      document.getElementById("scroll-box").classList.add("grab");
    });
    
    const div = document.querySelector("div.element");

    div.addEventListener("drag",(e) => {
        e.preventDefault();
    });
  },[]);

  const getDistance = (initial,curr) => {
    return (curr - initial);
  };

  const onInputClick = (e) => {

    const pageSelector = e.target.id;
    setCurrentPage(pageSelector);

    const element = document.querySelector("div#scroll-box");

    element.scrollTo(element.offsetWidth*(pageSelector - 1),0);
  }

  const handleOnScroll = (e) => {
    const distanceTravelled = e.target.scrollLeft;
    const offset = e.target.offsetWidth;
    const pageIndex = Math.floor(distanceTravelled/offset);

    inputList[pageIndex].checked = true;

  };

  const pages = [1,2,3,4,5];
  return (
    <div className='container'>
      <div className='carousel-container' id='scroll-box' onScroll={handleOnScroll}>
        <div className='element'>1</div>
        <div className='element'>2</div>
        <div className='element'>3</div>
        <div className='element'>4</div>
        <div className='element'>5</div>
      </div>
      <fieldset>
      {
        pages.map((id,index) =>(
          <input key={index} type="radio" name='page' id={id} onClick={(e) => onInputClick(e)}/>
        ))
      }
      </fieldset>
    </div>
  )
}

export default Carousel