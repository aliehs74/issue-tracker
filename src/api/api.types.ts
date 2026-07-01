export type TPaginationMeta = {
    page: number;
    limit: number;
    total: number;
};

export type TPaginatedResponse<T> = {
    data: T[];
    pagination: TPaginationMeta;
};