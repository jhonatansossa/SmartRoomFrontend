import React, { useState } from "react";

const RenameOption = ({ onRename }) => {
  const [newName, setNewName] = useState("");

  const handleRename = () => {
    // Execute the provided onRename function with the new name
    onRename(newName);
    // Reset the input field
    setNewName("");
  };

  return (
    <div className="rename-option">
      <input
        type="text"
        placeholder="New Name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={handleRename}>Rename</button>
    </div>
  );
};

export default RenameOption;
