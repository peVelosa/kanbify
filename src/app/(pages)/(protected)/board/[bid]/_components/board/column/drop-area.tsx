import { useState } from "react";

const DropArea = () => {
  const [visible, setVisible] = useState(false);

  const showArea = () => {
    setVisible(true);
  };

  const hideArea = () => {
    setVisible(false);
  };

  return (
    <div
      onDragEnter={showArea}
      onDragLeave={hideArea}
      onDrop={hideArea}
      className={`h-4 ${visible && "py-8"}`}
    />
  );
};

export default DropArea;
