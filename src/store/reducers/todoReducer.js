const initialState = [
    {title: "To Do", id: 0, items: []},
]

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ("CREATE_FOLDER"): 
            return [...state, {title: action.payload, id: state.length, items: []}];
        case ("ADD_ITEM"):
            return state.map(folder => {
                if(folder.id === action.payload.id) {
                    return {...folder, items: [...folder.items, {title: action.payload.title, id: folder.items.length, dateCreated: new Date()}]}
                }
                return folder;
            })
        default: return state;
    }
}

export default todoReducer;