import { createContext, useReducer, useEffect } from 'react';


const initialState = {
  cartItems: [],
  count: 0,
};

const getInitialState = () => {
  const savedCart = localStorage.getItem('savedCart');
  return savedCart ? JSON.parse(savedCart) : initialState;
}


const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state, 
          cartItems: state.cartItems.map(item => 
            item.id === action.payload.id ? 
            { ...item, quantity: item.quantity + isNaN(action.payload.quantity)} : 
            item
          )
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: action.payload.quantity || 1 }]
        };
      }
    case 'REMOVE_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload)
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item => 
          item.id === action.payload.id ? 
          { ...item, quantity: action.payload.quantity} : 
          item
        )
      };
    default:
      return state;
  }
};

const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
});

const CartProvider = ({ children }) => {

  const [state, dispatch] = useReducer(cartReducer, initialState, getInitialState);

  useEffect(() => {
    localStorage.setItem('savedCart', JSON.stringify(state));
  }, [state])

  const addToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item});
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity !== 0) {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
    } else {
      removeFromCart(itemId)
    }
  };

  const cartValue = {
    cartItems: state.cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
  };


  return (
    <CartContext.Provider value={cartValue}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };