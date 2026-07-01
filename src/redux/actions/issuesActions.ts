import type { ThunkAction } from 'redux-thunk';
import type { RootState } from '@/redux/store';
import type { Issue, IssueDraft, IssueFilters, IssueSort } from '@/types/issue';
import * as issuesApi from '@/services/issuesApi';
import { text } from '@/utils/text';
import { FETCH_ISSUES_REQUEST, FETCH_ISSUES_SUCCESS, FETCH_ISSUES_FAILURE, FETCH_ISSUE_REQUEST, FETCH_ISSUE_SUCCESS, FETCH_ISSUE_FAILURE, CLEAR_CURRENT_ISSUE, CREATE_ISSUE_REQUEST, CREATE_ISSUE_SUCCESS, CREATE_ISSUE_FAILURE, UPDATE_ISSUE_REQUEST, UPDATE_ISSUE_SUCCESS, UPDATE_ISSUE_FAILURE, DELETE_ISSUE_REQUEST, DELETE_ISSUE_SUCCESS, DELETE_ISSUE_FAILURE, SET_FILTERS, SET_SORT, SET_PAGE, SET_PAGE_SIZE, RESET_FILTERS, } from '@/redux/actionTypes';
import type { IssuesAction, SetFiltersAction, SetSortAction, SetPageAction, SetPageSizeAction, ResetFiltersAction, ClearCurrentIssueAction, } from '@/redux/actions/issuesActions.types';

export type { IssuesAction } from '@/redux/actions/issuesActions.types';

type AppThunk<ReturnType = void> = ThunkAction<Promise<ReturnType>, RootState, undefined, IssuesAction>;

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return text.UNEXPECTED_ERROR;
}

export const setFilters = (filters: Partial<IssueFilters>): SetFiltersAction => ({
  type: SET_FILTERS,
  payload: { filters },
});

export const setSort = (sort: IssueSort): SetSortAction => ({
  type: SET_SORT,
  payload: { sort },
});

export const setPage = (page: number): SetPageAction => ({
  type: SET_PAGE,
  payload: { page },
});

export const setPageSize = (pageSize: number): SetPageSizeAction => ({
  type: SET_PAGE_SIZE,
  payload: { pageSize },
});

export const resetFilters = (): ResetFiltersAction => ({
  type: RESET_FILTERS,
});

export const clearCurrentIssue = (): ClearCurrentIssueAction => ({
  type: CLEAR_CURRENT_ISSUE,
});

export const fetchIssuesThunk = (): AppThunk<void> => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_ISSUES_REQUEST });
    try {
      const { filters, sort, pagination } = getState().issues;
      const result = await issuesApi.fetchIssues({ filters, sort, pagination: { page: pagination.page, pageSize: pagination.pageSize } });
      dispatch({ type: FETCH_ISSUES_SUCCESS, payload: { issues: result.issues, pagination: result.pagination }, });

    } catch (error) {
      dispatch({ type: FETCH_ISSUES_FAILURE, payload: { error: getErrorMessage(error) } });

    }
  };
};

export const fetchIssueByIdThunk = (id: number): AppThunk<void> => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ISSUE_REQUEST });
    try {
      const issue = await issuesApi.fetchIssueById(id);
      dispatch({ type: FETCH_ISSUE_SUCCESS, payload: { issue } });

    } catch (error) {
      dispatch({ type: FETCH_ISSUE_FAILURE, payload: { error: getErrorMessage(error) } });
    }
  };
};

export const createIssueThunk = (draft: IssueDraft): AppThunk<Issue | null> => {
  return async (dispatch) => {
    dispatch({ type: CREATE_ISSUE_REQUEST });

    try {
      const issue = await issuesApi.createIssue(draft);
      dispatch({ type: CREATE_ISSUE_SUCCESS, payload: { issue } });
      return issue;

    } catch (error) {
      dispatch({ type: CREATE_ISSUE_FAILURE, payload: { error: getErrorMessage(error) } });
      return null;
    }
  };
};

export const updateIssueThunk = (id: number, draft: IssueDraft): AppThunk<Issue | null> => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ISSUE_REQUEST });

    try {
      const issue = await issuesApi.updateIssue(id, draft);
      dispatch({ type: UPDATE_ISSUE_SUCCESS, payload: { issue } });
      return issue;

    } catch (error) {
      dispatch({ type: UPDATE_ISSUE_FAILURE, payload: { error: getErrorMessage(error) }, });
      return null;
    }

  };
};

export const deleteIssueThunk = (id: number): AppThunk<boolean> => {
  return async (dispatch) => {
    dispatch({ type: DELETE_ISSUE_REQUEST });

    try {
      await issuesApi.deleteIssue(id);
      dispatch({ type: DELETE_ISSUE_SUCCESS, payload: { id } });
      return true;

    } catch (error) {
      dispatch({ type: DELETE_ISSUE_FAILURE, payload: { error: getErrorMessage(error) } });
      return false;
    }
  };
};
