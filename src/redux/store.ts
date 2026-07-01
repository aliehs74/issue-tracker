import { createStore, applyMiddleware } from 'redux';
import { thunk, type ThunkDispatch } from 'redux-thunk';
import { rootReducer } from '@/redux/reducers/rootReducer';
import type { IssuesAction } from '@/redux/actions/issuesActions.types';

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, undefined, IssuesAction>;
