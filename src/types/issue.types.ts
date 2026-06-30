export type TIssueStatus = "Open" | "In Progress" | "Done";
export type TIssuePriority = "Low" | "Medium" | "High" | "Critical";

export type TIssue = {
    id: number;
    title: string;
    description: string;
    status: TIssueStatus;
    priority: TIssuePriority;
    assignee: string;
    dueDate: string;
    createdAt: string;
};

