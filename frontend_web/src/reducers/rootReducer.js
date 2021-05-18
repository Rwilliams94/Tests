const initialState = {
  hidden: [],
  companyId: null,
  popUp: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    // hidden list

    case "SET":
      return {
        ...state,
        hidden: action.payload,
      };
    case "HIDE":
      return {
        ...state,
        hidden: [...state.hidden, action.payload],
      };
    case "RESET":
      return {
        ...state,
        hidden: [],
      };

    case "UNDO":
      return {
        ...state,
        hidden: state.hidden.slice(0, -1),
      };

    // Company details

    case "COMPANYCHANGE":
      return {
        ...state,
        companyId: action.payload,
      };

    // PopUp

    case "POPUPOPEN":
      return {
        ...state,
        popUp: true,
      };

    case "POPUPCLOSE":
      return {
        ...state,
        popUp: false,
      };

    default:
      return state;
  }
}

export default rootReducer;
