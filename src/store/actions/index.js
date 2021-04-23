export const createFolder = (title) => {
  return { type: "CREATE_FOLDER", payload: title };
};

export const addItem = (folderId, itemTitle) => {
  return {
    type: "ADD_ITEM",
    payload: { id: folderId, title: itemTitle },
  };
};

export const toggleCompleted = (folderId, itemId) => {
    return {
        type: "TOGGLE_COMPLETED",
        payload: { folderId: folderId, itemId: itemId },
    }
}