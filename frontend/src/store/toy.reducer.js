export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const ADD_TOY = 'ADD_TOY'

export const SET_IS_LOADING = 'SET_IS_LOADING'

// export const SET_FILTER = 'SET_FILTER'
export const SET_FILTER_TXT = 'SET_FILTER_TXT'
export const SET_FILTER_SORT = 'SET_FILTER_SORT'
export const SET_FILTER_INSTOCK = 'SET_FILTER_INSTOCK'


const initialState = {
    toys: [],
    filterBy: { txt: '' ,sort:'', inStock: ''},
    isLoading: false
}


export function toyReducer(state = initialState, action) {
    // console.log('action', action)
    let toys
   
    switch (action.type) {
        // Toys
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }        
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case REMOVE_TOY:
            toys = state.toys.filter(t => t._id !== action.toyId)
            return { ...state, toys }
        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }
        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }
        /// Filter
        // case SET_FILTER:
        //     return { ...state, filterBy: { ...state.filterBy, btn: action.value } }
        case SET_FILTER_TXT:
            return { ...state, filterBy: { ...state.filterBy, txt: action.value } }
        case SET_FILTER_SORT:
            return { ...state, filterBy: { ...state.filterBy, sort: action.value } }
        case SET_FILTER_INSTOCK:
            return { ...state, filterBy: { ...state.filterBy, inStock: action.value } }
        

        // // Cart
        // case SET_TOYT_IS_SHOWN:
        //     return { ...state, isCartShown: action.isCartShown }
        // case REMOVE_TOY_FROM_TOYT:
        //     shoppingCart = state.shoppingCart.filter(c => c._id !== action.toyId)
        //     return { ...state, shoppingCart }
        // case ADD_TOY_TO_TOYT:
        //     shoppingCart = [...state.shoppingCart, action.toy]
        //     return { ...state, shoppingCart }
        // case CLEAR_TOYT:
        //     return { ...state, shoppingCart: [] }
        default:
            return state
    }
}