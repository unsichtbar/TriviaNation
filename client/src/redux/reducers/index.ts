import { combineReducers } from 'redux'
import { editingReducer, } from './editing'
import { playingReducer, } from './playing'
import { selectedReducer, } from './selected'
import { teamSelectReducer } from '../../TeamSelect/reducer'

const rootReducer = combineReducers({
  playing: playingReducer,
  editing: editingReducer,
  selectedItem: selectedReducer,
  teamSelect: teamSelectReducer
})
export default rootReducer