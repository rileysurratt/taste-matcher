"use client";

import { createContext, useContext, useState } from "react";


// One shared Favorites list for entire app - any  component can call 
// useFavorites() and modify the list
const FavoritesContext = createContext(null);

export default function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    function isFavorite(id){
        return favorites.some((f) => f.id === id);
    }

    // add if not in list, remove if already in list
    function toggleFavorite(item){
        setFavorites((current) => 
        current.some((f) => f.id === item.id)
        ? current.filter((f) => f.id !== item.id)
        : [...current, item]);
    }

    function removeFavorite(id){
        setFavorites((current) => current.filter((f) => f.id !== id));
    }

    return (
        <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites(){
    return useContext(FavoritesContext);
}

