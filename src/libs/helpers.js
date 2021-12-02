const handleRemoveItem = (index, array, updateArray) => {
    const newArray = [...array];
    newArray.splice(index, 1)
    updateArray(newArray);
}

const handleUpdateItem = (index, e, array, updateArray) => {
    let editedArray = array.map((card, key) => {
        if (key === parseInt(index))
            return e
        return card;
    });
    updateArray(editedArray);
}

export { handleRemoveItem, handleUpdateItem }