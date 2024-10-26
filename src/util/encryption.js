
export function encrypt(text, shift = 5) {
    let shiftedText = "";
    for (let i = 0; i < text.length; i++) {
      shiftedText += String.fromCharCode(text.charCodeAt(i) + shift);
    }
    const reversedText = shiftedText.split("").reverse().join("");
    return `ENC:${reversedText}`;
  }
  
  export function decrypt(text, shift = 5) {
    if (!text.startsWith("ENC:")) return text;
    const reversedText = text.slice(4).split("").reverse().join("");
    let originalText = "";
    for (let i = 0; i < reversedText.length; i++) {
      originalText += String.fromCharCode(reversedText.charCodeAt(i) - shift);
    }
    return originalText;
  }
  
  export function encryptTasks(tasks, shift = 5) {
    return tasks.map((task) => ({
      ...task,
      description: encrypt(task.description, shift),
    }));
  }
  
  export function decryptTasks(tasks, shift = 5) {
    return tasks.map((task) => ({
      ...task,
      description: decrypt(task.description, shift),
    }));
  }
  