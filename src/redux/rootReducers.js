import { combineReducers } from 'redux'
import media from './media/reducers';


const rootReducers = combineReducers({
    media,
})

export default rootReducers;