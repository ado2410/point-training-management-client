interface CustomBreadcrumbProps {
    routes?: CustomBreadCrumbRoute[];
}

interface CustomBreadCrumbRoute {
    path?: string;
    name: string;
    icon?: React.ReactNode;
}