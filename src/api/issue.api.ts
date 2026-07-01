import Axios from "./AxiosInstance";
import { API_ENDPOINTS } from "./endpoints";
import { buildIssueQuery } from "@/utils/queryBuilder";
import type { TGetIssuesParams, TIssue, TIssuePayload, } from "@/api/issue.types";
import type { TPaginatedResponse } from "@/api/api.types";

export async function getIssues(params: TGetIssuesParams): Promise<TPaginatedResponse<TIssue>> {
    const query = buildIssueQuery(params);
    const response = await Axios.get(`${API_ENDPOINTS.ISSUES}?${query}`);

    return {
        data: response.data.data || response.data,
        pagination: {
            page: response.data.first ? params.page || 1 : 1,
            limit: params.limit || 10,
            total: response.data.items || Number(response.headers["x-total-count"]),
        },
    };
}

export async function getIssueById(id: number,): Promise<TIssue> {
    const response = await Axios.get(`${API_ENDPOINTS.ISSUES}/${id}`,);
    return response.data;
}

export async function createIssue(payload: TIssuePayload,): Promise<TIssue> {
    const response = await Axios.post(API_ENDPOINTS.ISSUES, { ...payload, createdAt: new Date().toISOString() });
    return response.data;
}

export async function updateIssue(id: number, payload: TIssuePayload,): Promise<TIssue> {
    const response = await Axios.patch(`${API_ENDPOINTS.ISSUES}/${id}`, payload);
    return response.data;
}

export async function deleteIssue(id: number): Promise<void> {
    await Axios.delete(`${API_ENDPOINTS.ISSUES}/${id}`);
}