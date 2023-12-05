// idGenerator.js

const generateId = () => {
    let counter = 0;
  
    const generateNextId = () => {
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, "0");
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const year = String(currentDate.getFullYear());
  
      const formattedDate = day + month + year;
      const paddedIndex = String(counter++).padStart(4, "0");
  
      return formattedDate + paddedIndex;
    };
  
    // Set up an interval to update the ID every 3 minutes
    setInterval(() => {
      counter = 0; // Reset counter for a new cycle
      console.log('ID Updated:', generateNextId());
    }, 3 * 60 * 1000); // 3 minutes in milliseconds
  
    return generateNextId;
  };
  
  export default generateId;
  
