self.onmessage = async (event) => {
    const { imageUrl } = event.data;
    
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      postMessage({ objectUrl });
    } catch (error) {
      console.error("Error loading image:", error);
    }
  };
  