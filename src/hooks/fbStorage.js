import { useState, useEffect } from 'react';

import { addFirebaseItem, updateFirebaseItem, getFirebaseItems, clearFirebaseItem } from "../lib/firebase";

function useFbStorage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, [items]);

  const getItems = async () => {
    const _items = await getFirebaseItems();
    setItems(_items);
  };

  const putItems = async item => {
    const newItem = { text: item.text, done: item.done };
    await addFirebaseItem(newItem);
    setItems([...items, newItem]);
  };

  const updateItem = async checked => {
    const newItem = { ...checked, done: !checked.done };
    await updateFirebaseItem(newItem, checked.id);
    const newItems = items.map((item) => {
      if (item.id === checked.id) {
        item.done = !checked.done;
      }
      return item;
    })
    setItems(newItems);
  }

  const clearItems = () => {
    items.map(item => {
      clearFirebaseItem(item);
    })
    setItems([]);
  };

  return [items, putItems, updateItem, clearItems];
}

export default useFbStorage; 