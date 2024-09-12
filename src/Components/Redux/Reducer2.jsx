
const INIT_STATE = {
    carts: []
};

export const cartReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "ADD_CART":
            // return {
            //     ...state,
            //     carts: [...state.carts, action.payload]
            // }
            const itemIndex = state.carts.findIndex((item) => item.id === action.payload.id);

            if (itemIndex >= 0) {
                state.carts[itemIndex].qnty += 1
                return {
                    ...state,
                    carts: [...state.carts]
                }
            } else {
                const temp = { ...action.payload, qnty: 1 }
                return {
                    ...state,
                    carts: [...state.carts, temp]
                }
            }
        case "RM_CART":
            console.log("action-payload: ",action.payload);
            const rmData = state.carts.filter((ele) => ele.id !== Number(action.payload));
            // console.log("reducer-id: ",id);
            return {
                ...state,
                carts: rmData
            }
        case "RM_ONE":
            const itemIndexRm = state.carts.findIndex((item) => item.id === action.payload.id);
            if (state.carts[itemIndexRm].qnty >= 1) {
                const dltItem = state.carts[itemIndexRm].qnty -= 1
                console.log([...state.carts, dltItem])
                return {
                    ...state,
                    carts: [...state.carts]
                }
            };
            break;
        default:
            return state
    }
};