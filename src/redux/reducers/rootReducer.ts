import { combineReducers } from 'redux';
import { issuesReducer } from '@/redux/reducers/issuesReducer';

export const rootReducer = combineReducers({
  issues: issuesReducer,
});

export type RootReducerState = ReturnType<typeof rootReducer>;
