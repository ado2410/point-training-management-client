import {Table} from "antd";

const FullHeightTable: React.FC<any> = (props: any) => {
    const getScroll = () => {
        return {
            x: props.scroll?.x || '100%',
            y: props.scroll?.y || 'calc(100vh - 190px)',
        };
    }

    return (
        <div style={{width: "100%", height: getScroll().y, flexGrow: 1, backgroundColor: "white"}}>
            <Table bordered {...props} scroll={getScroll()} />
        </div>
    );
}

export default FullHeightTable;

FullHeightTable.defaultProps = {
    scroll: {
        x: undefined,
        y: undefined,
    },
    size: "small",
    pagination: {defaultPageSize: 20}
}