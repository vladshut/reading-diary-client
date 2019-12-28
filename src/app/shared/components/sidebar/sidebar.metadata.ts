// Sidebar route metadata
export interface RouteInfo {
    path?: string;
    title: string;
    icon?: string;
    class?: string;
    badge?: RouteBadge;
    isExternalLink?: boolean;
    id?: string;
    submenu?: RouteInfo[];
    hide?: boolean;
}

export interface RouteBadge {
    value: any;
    class: string;
}
