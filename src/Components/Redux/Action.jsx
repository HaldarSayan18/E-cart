export const ADD_DATA = (item) => {
    return {
        type:"ADD_CART",
        payload:item
    }
}

//remove items
export const RM_DATA = (id) => {
    console.log("RM_CARTs: ",id)
    return {
        type:"RM_CART",
        payload:id
    }
}

//remove individual item
export const RM = (item) => {
    return {
        type:"RMV_ONE",
        payload:item
    }
}