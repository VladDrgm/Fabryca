import { ThemeProvider, ProgressBar, Frame } from '@react95/core';
import '@react95/icons/icons.css';
import { useEffect, useState } from 'react';
import './LoadingComponent.css'

const LoadingComponent = () => {
  const [loader, setLoader] = useState(0);

  useEffect(()=>{
    let time = loader === 38 ? 600 : 35;
    if (loader > 33 && loader < 38) { time = 30};
    if (loader >= 53) { time = 5};
    if (loader >= 88) { time = 10};
    const timeout = setTimeout(() => {
      if (loader < 100) {setLoader(loader + 1)};
    }, time);
    return () => {
      // clears timeout before running the new effect
      clearTimeout(timeout);
  }}, [loader])
  return (
  <ThemeProvider>
    <div id={loader === 100 ? 'loading__background__hidden' : 'loading__background'}>
      <div id={loader === 100 ? 'loading__box__hidden' : 'loading__box'}>
          <Frame w={500} h={300}>
            <div className='loading__frame'>
            <ProgressBar width={400} percent={loader} />
            </div>
          </Frame>
        </div>
      </div>
  </ThemeProvider>
  )
};

export default LoadingComponent;
