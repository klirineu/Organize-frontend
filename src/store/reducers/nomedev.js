const INITIAL_STATE = {
  dev: ""
};

export default function nomeDev(state = INITIAL_STATE, action) {
  if (action.type === "DEV_QUERY") {
    return {
      ...state,
      dev: [...state.dev, action.dev]
    };
  }
  return state;
}
