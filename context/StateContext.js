import React, {createContext, useContext, useState, useEffect} from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext();


export const StateContext = ( { children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)

    let foundProduct;
    let index;

    //function to add items to cart
    const onAdd = (product, quantity) => {
        //check if the item we want to add to the cart is already in the cart
        const checkProductInCart = cartItems.find( (item) => item._id === product._id )
//if the product is in the cart, increase the quantity of the product instad of adding another one
                setTotalPrice( (prevTotalPrice) => prevTotalPrice + product.price * quantity)
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)  //yayy
            if (checkProductInCart) {
                //update items in cart
                const updatedCartItems = cartItems.map( (cartProduct) => {
                    if(cartProduct._id === product._id) return{
                        ...cartProduct,
                        quantity: cartProduct.quantity + quantity
                    }
                    
            })
            setCartItems(updatedCartItems)
       

            } else { //if product is not in the cart
                product.quantity = quantity
                setCartItems([...cartItems, {...product}]) //product with the updated quantity

            }
            toast.success(`${qty} ${product.name} added to the cart.`)

    }
    //remove items from cart
    const onRemove = (product) => {
        foundProduct = cartItems.find( (item) => item._id === id )
        const newCartItems = cartItems.filter((item) => item._id !== id)

        setTotalPrice( (prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity )

    }


//function to update quantities of items in cart
    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find( (item) => item._id === id )
        index = cartItems.findIndex((product) => product._id === id )

        const newCartItems = cartItems.filter((item) => item._id !== id)
        if (value === 'inc') {
          
        
            setCartItems([...newCartItems, {...foundProduct, 
                quantity: foundProduct.quantity + 1 }])
                setTotalPrice( (prevTotalPrice) => prevTotalPrice + foundProduct.price  )
                setTotalQuantities( prevTotalQuantities => prevTotalQuantities + 1)

        } else if (value === 'dec') {
            if(foundProduct.quantity > 1){

                setCartItems([...newCartItems, {...foundProduct, 
                    quantity: foundProduct.quantity - 1 }])
                    setTotalPrice( (prevTotalPrice) => prevTotalPrice - foundProduct.price  )
                    setTotalQuantities( prevTotalQuantities => prevTotalQuantities - 1)

            }

            

        }

    }

    //state to update the previous quanity
    const incQty = () => {
        setQty( (prevQty) => prevQty + 1)
    }

    const decQty = () => {
        setQty( (prevQty) => {
            if(prevQty - 1 < 1) return 1;

           return prevQty - 1}
            )
    }


    return( 

        <Context.Provider
        value={{showCart,
            setShowCart,
            cartItems,
            totalPrice,
            totalQuantities,
             qty,
            incQty,
            decQty,
            onAdd,
        toggleCartItemQuantity}}
        >
            {children}
        </Context.Provider>
    )

}

export const useStateContext = () => useContext(Context)