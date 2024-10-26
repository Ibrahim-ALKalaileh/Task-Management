const setRootFontSize = () => {
    const height = window.innerHeight;
    const fontSize = height/992
    document.documentElement.style.fontSize = `${fontSize}px`;
  };
  
  export default setRootFontSize;