import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";

const CustomBreadcrumb: React.FC<CustomBreadcrumbProps> = (props: CustomBreadcrumbProps) => {
    const {routes} = props;
    const navigate = useNavigate();

    //Chuyển hướng trang
    const navigateTo = (e: React.MouseEvent, path: string) => {
        e.preventDefault();
        navigate(path);
    };

    if (routes === undefined || routes?.length === 0) return <></>;
    else return (
        <Breadcrumb>
            <Breadcrumb.Item href="" onClick={(e) => navigateTo(e, "/")}>
                <HomeOutlined />
            </Breadcrumb.Item>
            {routes!.map((route, index) => (
                <Breadcrumb.Item
                    key={index}
                    href=""
                    onClick={(e) => navigateTo(e, route.path || '')}
                >
                    <>{route.icon} {route.name}</>
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
}

CustomBreadcrumb.defaultProps = {
    routes: [],
};

export default CustomBreadcrumb;
