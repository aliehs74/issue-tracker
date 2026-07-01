import type {
  Issue,
  IssueFilters,
  IssuePagination,
  IssueSort,
} from '@/types/issue';
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

export interface FetchIssuesRequestAction {
  type: typeof FETCH_ISSUES_REQUEST;
}
export interface FetchIssuesSuccessAction {
  type: typeof FETCH_ISSUES_SUCCESS;
  payload: { issues: Issue[]; pagination: IssuePagination };
}
export interface FetchIssuesFailureAction {
  type: typeof FETCH_ISSUES_FAILURE;
  payload: { error: string };
}

export interface FetchIssueRequestAction {
  type: typeof FETCH_ISSUE_REQUEST;
}
export interface FetchIssueSuccessAction {
  type: typeof FETCH_ISSUE_SUCCESS;
  payload: { issue: Issue };
}
export interface FetchIssueFailureAction {
  type: typeof FETCH_ISSUE_FAILURE;
  payload: { error: string };
}
export interface ClearCurrentIssueAction {
  type: typeof CLEAR_CURRENT_ISSUE;
}

export interface CreateIssueRequestAction {
  type: typeof CREATE_ISSUE_REQUEST;
}
export interface CreateIssueSuccessAction {
  type: typeof CREATE_ISSUE_SUCCESS;
  payload: { issue: Issue };
}
export interface CreateIssueFailureAction {
  type: typeof CREATE_ISSUE_FAILURE;
  payload: { error: string };
}

export interface UpdateIssueRequestAction {
  type: typeof UPDATE_ISSUE_REQUEST;
}
export interface UpdateIssueSuccessAction {
  type: typeof UPDATE_ISSUE_SUCCESS;
  payload: { issue: Issue };
}
export interface UpdateIssueFailureAction {
  type: typeof UPDATE_ISSUE_FAILURE;
  payload: { error: string };
}

export interface DeleteIssueRequestAction {
  type: typeof DELETE_ISSUE_REQUEST;
}
export interface DeleteIssueSuccessAction {
  type: typeof DELETE_ISSUE_SUCCESS;
  payload: { id: number };
}
export interface DeleteIssueFailureAction {
  type: typeof DELETE_ISSUE_FAILURE;
  payload: { error: string };
}

export interface SetFiltersAction {
  type: typeof SET_FILTERS;
  payload: { filters: Partial<IssueFilters> };
}
export interface SetSortAction {
  type: typeof SET_SORT;
  payload: { sort: IssueSort };
}
export interface SetPageAction {
  type: typeof SET_PAGE;
  payload: { page: number };
}
export interface SetPageSizeAction {
  type: typeof SET_PAGE_SIZE;
  payload: { pageSize: number };
}
export interface ResetFiltersAction {
  type: typeof RESET_FILTERS;
}

export type IssuesAction =
  | FetchIssuesRequestAction
  | FetchIssuesSuccessAction
  | FetchIssuesFailureAction
  | FetchIssueRequestAction
  | FetchIssueSuccessAction
  | FetchIssueFailureAction
  | ClearCurrentIssueAction
  | CreateIssueRequestAction
  | CreateIssueSuccessAction
  | CreateIssueFailureAction
  | UpdateIssueRequestAction
  | UpdateIssueSuccessAction
  | UpdateIssueFailureAction
  | DeleteIssueRequestAction
  | DeleteIssueSuccessAction
  | DeleteIssueFailureAction
  | SetFiltersAction
  | SetSortAction
  | SetPageAction
  | SetPageSizeAction
  | ResetFiltersAction;
