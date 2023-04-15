import React, { useState } from "react";

function ExampleComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const handleCountClick = () => {
    setCount(count + 1);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleCountClick}>Increment Count</button>

      <br />

      <input type="text" value={text} onChange={handleTextChange} />
      <p>Text: {text}</p>
    </div>
  );
}

export default ExampleComponent;
