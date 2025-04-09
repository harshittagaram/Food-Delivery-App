import { createContext, useEffect,useState } from "react";
import { fetchFoodList } from "../service/foodService";
import axios from "axios";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) =>{

    const [foodList,setFoodList]= useState([]);
    const [quantities, setQuantities] = useState({});
    const [token,setToken] = useState("");


    const increaseQty = async(foodId) =>{
        setQuantities((prev) =>({...prev,[foodId]:(prev[foodId] || 0)+1}));
        
        await axios.post('http://localhost:8080/api/cart',{foodId},{headers: {"Authorization": `Bearer ${token}`}});
    
    
    }   
    
    const decreaseQty = async(foodId) => {
      setQuantities((prev) => ({ ...prev, [foodId]: prev[foodId] > 0 ? prev[foodId]-1 : 0 }));
    
    
        await axios.post('http://localhost:8080/api/cart/remove',{foodId},{headers: {"Authorization": `Bearer ${token}`}});

    }; 

    const removeFromCart =(foodId)=>{
        setQuantities((prevQuantities)=>{
            const updateQuantities = {...prevQuantities};
            delete updateQuantities[foodId];
            return updateQuantities;
        })
    }

    const loadCartData = async(token)=>{
       const response = await axios.get('http://localhost:8080/api/cart',{headers: {"Authorization": `Bearer ${token}`}});
        setQuantities(response.data.items);
    };

    const contextValue = {
        foodList,
        increaseQty,
        decreaseQty,
        quantities,
        removeFromCart,
        token,
        setToken,
        setQuantities,
        loadCartData
    };

    useEffect(()=>{
        async function loadData(){
           const data=  await fetchFoodList();
           setFoodList(data);
           if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
           }
        }
        loadData();
    },[]);

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}