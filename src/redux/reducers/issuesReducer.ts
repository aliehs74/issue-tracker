import type { IssueFilters, IssueSort } from '@/types/issue';
import type { IssuesAction } from '@/redux/actions/issuesActions.types';
import type { IssuesState } from '@/redux/reducers/issuesReducer.types';
export type { AsyncStatus, IssuesState } from '@/redux/reducers/issuesReducer.types';
import {
  FETCH_ISSUES_REQUEST,
  FETCH_ISSUES_SUCCESS,
  FETCH_ISSUES_FAILURE,
  FETCH_ISSUE_REQUEST,
  FETCH_ISSUE_SUCCESS,
  FETCH_ISSUE_FAILURE,
  CLEAR_CURRENT_ISSUE,
  CREATE_ISSUE_REQUEST,
  CREATE_ISSUE_SUCCESS,
  CREATE_ISSUE_FAILURE,
  UPDATE_ISSUE_REQUEST,
  UPDATE_ISSUE_SUCCESS,
  UPDATE_ISSUE_FAILURE,
  DELETE_ISSUE_REQUEST,
  DELETE_ISSUE_SUCCESS,
  DELETE_ISSUE_FAILURE,
  SET_FILTERS,
  SET_SORT,
  SET_PAGE,
  SET_PAGE_SIZE,
  RESET_FILTERS,
} from '@/redux/actionTypes';

export const DEFAULT_PAGE_SIZE = 10;

const initialFilters: IssueFilters = {
  search: '',
  status: '',
  priority: '',
  assignee: '',
};

const initialSort: IssueSort = {
  field: 'createdAt',
  order: 'desc',
};

const initialState: IssuesState = {
  items: [],
  currentIssue: null,
  listStatus: 'idle',
  detailStatus: 'idle',
  mutationStatus: 'idle',
  error: null,
  filters: initialFilters,
  sort: initialSort,
  pagination: {
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    totalCount: 0,
  },
};

export function issuesReducer(
  state: IssuesState = initialState,
  action: IssuesAction
): IssuesState {
  switch (action.type) {
    case FETCH_ISSUES_REQUEST:
      return { ...state, listStatus: 'loading', error: null };

    case FETCH_ISSUES_SUCCESS:
      return {
        ...state,
        listStatus: 'succeeded',
        items: action.payload.issues,
        pagination: action.payload.pagination,
      };

    case FETCH_ISSUES_FAILURE:
      return {
        ...state,
        listStatus: 'failed',
        error: action.payload.error,
        items: [],
      };

    case FETCH_ISSUE_REQUEST:
      return {
        ...state,
        detailStatus: 'loading',
        error: null,
        currentIssue: null,
      };

    case FETCH_ISSUE_SUCCESS:
      return {
        ...state,
        detailStatus: 'succeeded',
        currentIssue: action.payload.issue,
      };

    case FETCH_ISSUE_FAILURE:
      return {
        ...state,
        detailStatus: 'failed',
        error: action.payload.error,
        currentIssue: null,
      };

    case CLEAR_CURRENT_ISSUE:
      return { ...state, currentIssue: null, detailStatus: 'idle' };

    case CREATE_ISSUE_REQUEST:
    case UPDATE_ISSUE_REQUEST:
    case DELETE_ISSUE_REQUEST:
      return { ...state, mutationStatus: 'loading', error: null };

    case CREATE_ISSUE_SUCCESS:
      return { ...state, mutationStatus: 'succeeded' };

    case UPDATE_ISSUE_SUCCESS:
      return {
        ...state,
        mutationStatus: 'succeeded',
        currentIssue:
          state.currentIssue?.id === action.payload.issue.id
            ? action.payload.issue
            : state.currentIssue,
      };

    case DELETE_ISSUE_SUCCESS:
      return {
        ...state,
        mutationStatus: 'succeeded',
        items: state.items.filter((issue) => issue.id !== action.payload.id),
      };

    case CREATE_ISSUE_FAILURE:
    case UPDATE_ISSUE_FAILURE:
    case DELETE_ISSUE_FAILURE:
      return {
        ...state,
        mutationStatus: 'failed',
        error: action.payload.error,
      };

    case SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload.filters },
        pagination: { ...state.pagination, page: 1 },
      };

    case RESET_FILTERS:
      return {
        ...state,
        filters: initialFilters,
        pagination: { ...state.pagination, page: 1 },
      };

    case SET_SORT:
      return {
        ...state,
        sort: action.payload.sort,
        pagination: { ...state.pagination, page: 1 },
      };

    case SET_PAGE:
      return {
        ...state,
        pagination: { ...state.pagination, page: action.payload.page },
      };

    case SET_PAGE_SIZE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          pageSize: action.payload.pageSize,
          page: 1,
        },
      };

    default:
      return state;
  }
}
