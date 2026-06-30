type TIssueQueryParams = {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    priority?: string;
    assignee?: string;
    sortBy?: "createdAt" | "dueDate";
    order?: "asc" | "desc";
};

export function buildIssueQuery(params: TIssueQueryParams) {
    const query = new URLSearchParams();

    if (params.page)
        query.append("_page", String(params.page));

    if (params.limit)
        query.append("_per_page", String(params.limit));

    if (params.search)
        query.append("q", params.search);

    if (params.status)
        query.append("status", params.status);

    if (params.priority)
        query.append("priority", params.priority);

    if (params.assignee)
        query.append("assignee", params.assignee);

    if (params.sortBy)
        query.append("_sort", params.sortBy);

    if (params.order)
        query.append("_order", params.order);


    return query.toString();
}