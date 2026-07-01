import { Axios } from '@/services/AxiosInstance';
import type { Issue, IssueDraft, IssueListQuery } from '@/types/issue';
import type { JsonServerPage, IssuesPageResult } from '@/services/issuesApi.types';
import { API_ENDPOINTS } from './endpoints';

function buildListParams(query: IssueListQuery): Record<string, string | number> {
  const { filters, sort, pagination } = query;
  const params: Record<string, string | number> = {
    _page: pagination.page,
    _per_page: pagination.pageSize,
    _sort: sort.order === 'desc' ? `-${sort.field}` : sort.field,
  };

  if (filters.status) {
    params['status'] = filters.status;
  }
  if (filters.priority) {
    params['priority'] = filters.priority;
  }
  if (filters.assignee) {
    params['assignee'] = filters.assignee;
  }

  return params;
}

function buildSearchWhere(search: string): string | null {
  const trimmed = search.trim();
  if (!trimmed) return null;

  return JSON.stringify({
    or: [
      { title: { contains: trimmed } },
      { description: { contains: trimmed } },
    ],
  });
}

export async function fetchIssues(
  query: IssueListQuery
): Promise<IssuesPageResult> {
  const params = buildListParams(query);
  const where = buildSearchWhere(query.filters.search);
  if (where) {
    params['_where'] = where;
  }

  const response = await Axios.get<JsonServerPage<Issue> | Issue[]>(
    API_ENDPOINTS.ISSUES,
    { params }
  );

  if (Array.isArray(response.data)) {
    return {
      issues: response.data,
      pagination: {
        page: query.pagination.page,
        pageSize: query.pagination.pageSize,
        totalCount: response.data.length,
      },
    };
  }

  return {
    issues: response.data.data,
    pagination: {
      page: query.pagination.page,
      pageSize: query.pagination.pageSize,
      totalCount: response.data.items,
    },
  };
}

export async function fetchIssueById(id: number): Promise<Issue> {
  const response = await Axios.get<Issue>(`/issues/${id}`);
  return response.data;
}

async function getNextId(): Promise<number> {
  const response = await Axios.get<JsonServerPage<Issue> | Issue[]>(
    API_ENDPOINTS.ISSUES,
    { params: { _sort: '-id', _page: 1, _per_page: 1 } }
  );
  const list = Array.isArray(response.data) ? response.data : response.data.data;
  const highest = list[0]?.id ?? 0;
  return Number(highest) + 1;
}

export async function createIssue(draft: IssueDraft): Promise<Issue> {
  // json-server v1 beta auto-generates a random string id when none is
  // supplied, which breaks numeric routing/sorting against the rest of the
  // (numeric-id) dataset. We compute the next sequential id explicitly.
  const nextId = await getNextId();
  const payload: Issue = {
    ...draft,
    id: nextId,
    createdAt: new Date().toISOString(),
  };
  const response = await Axios.post<Issue>(API_ENDPOINTS.ISSUES, payload);
  return response.data;
}

export async function updateIssue(
  id: number,
  draft: IssueDraft
): Promise<Issue> {
  const existing = await fetchIssueById(id);
  const response = await Axios.put<Issue>(`/issues/${id}`, {
    ...existing,
    ...draft,
    id,
  });
  return response.data;
}

export async function deleteIssue(id: number): Promise<void> {
  await Axios.delete(`/issues/${id}`);
}

export const KNOWN_ASSIGNEES = [
  'امیر',
  'حسین',
  'رضا',
  'سارا',
  'علی',
  'فاطمه',
  'محمد',
  'مریم',
  'نرگس',
  'نگار',
] as const;
