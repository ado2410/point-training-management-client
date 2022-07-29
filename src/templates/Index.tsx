import { useEffect, useMemo, useState } from "react";
import '../styles/styles.css';
import List from "../components/List/List";
import { Button, Input, message, Modal, PageHeader } from "antd";
import Form from "../components/CustomForm/CustomForm";
import { FileAddFilled, PlusOutlined, UndoOutlined } from "@ant-design/icons";
import Import from "../components/Import/Import";
import CustomBreadcrumb from "../components/CustomBreadcrumb/CustomBreadcrumb";
import { copyService, deleteService, getDataService, getOptionsService, importService, insertService, updateService } from "./Index.services";
import { handleServerError, handleServerErrorImport } from "../utils/error";
import Search from "../components/Search/Search";

enum ModalType {
    NONE, CREATE, EDIT, DELETE, IMPORT, COPY
}

const Index = (props: IndexProps) => {
    const {
        name,
        columns,
        importColumns,
        route,
        routes,
        params,
        createFields,
        editFields,
        copyFields,
        onChange,
        preInsert,
        preUpdate,
        preCopy,
        canCreate,
        canCopy,
        canEdit,
        canDelete,
        filterData,
        tableProps,
    } = props;
    const [data, setData] = useState<ServerListData<any>>({data: []});
    const [dataIndex, setDataIndex] = useState(-1);
    const currentData = useMemo(() => data.data[dataIndex], [data.data, dataIndex]);
    const [showModal, setShowModal] = useState(ModalType.NONE);
    const [errors, setErrors] = useState({});
    const [options, setOptions] = useState({});
    const [importErrors, setImportErrors] = useState<ImportError[]>([]);

    useEffect(() => {
        (async () => {
            setData((await getData()));
            setOptions((await getOptions()));
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    //Request data về
    const getData = async (search: string | undefined = undefined) => await getDataService(route, params, search);

    //Request các select options
    const getOptions = async () => await getOptionsService(route);

    //Tìm kiếm
    const handleSearch = async (value: string) => setData((await getData(value)));

    //CLear tìm kiếm
    const handleClearSearch = async () => {
        setData((await getData()));
    };

    //Close form
    const closeForm = () => {
        setShowModal(ModalType.NONE);
        setDataIndex(-1);
        setErrors([]);
        setImportErrors([]);
    };

    const handleFilter = () => {
        data.data = data.data.map((item, index) => {
            item._originalIndex = index;
            return item;
        })
        if (filterData) {
            return data.data.filter(filterData);
        } else return data.data;
    }

    //Xử lý insert
    const handleInsert = (values: any) => {
        values = preInsert ? preInsert(values) : values;
        message.loading({key: "index-insert", content: "Đang thêm"});
        insertService(
            route,
            values,
            responseData => {
                data.data.unshift(responseData);
                setData(JSON.parse(JSON.stringify(data)));
                onChange();
                closeForm();
                message.success({key: "index-insert", content: "Đã thêm"});
            },
            responseData => {
                setErrors(handleServerError(responseData.errors));
                message.error({key: "index-insert", content: "Lỗi"});
            },
        );
    };

    //Xử lý update
    const handleUpdate = async (values: any) => {
        values = preUpdate ? preUpdate(values) : values;
        message.loading({key: "index-update", content: "Đang cập nhật"});
        updateService(
            route,
            currentData.id,
            values,
            responseData => {
                data.data[dataIndex] = responseData;
                setData(JSON.parse(JSON.stringify(data)));
                onChange();
                closeForm();
                message.success({key: "index-update", content: "Đã cập nhật"});
            },
            responseData => {
                setErrors(handleServerError(responseData.errors));
                message.error({key: "index-update", content: "Lỗi"});
            },
        );
    };

    //Xử lý delete
    const handleDelete = (index: number) => {
        message.loading({key: "index-delete", content: "Đang xoá"});
        deleteService(
            route,
            currentData.id,
            () => {
                data.data.splice(index, 1);
                setData(JSON.parse(JSON.stringify(data)));
                onChange();
                closeForm();
                message.success({key: "index-delete", content: "Đã xoá"});
            },
            () => message.error({key: "index-delete", content: "Bản ghi không thể xoá"})
        );
    };

    //Xử lý import
    const handleImport = (rows: any) => {
        message.loading({key: "index-import", content: "Đang nhập"});
        importService(
            route,
            rows,
            responseData => {
                data.data = [...responseData.reverse(), ...data.data];
                setData(data);
                props.onChange();
                closeForm();
                message.success({key: "index-import", content: "Đã nhập"});
            },
            responseData => {
                setImportErrors(handleServerErrorImport(responseData.errors));
                message.error({key: "index-import", content: "Lỗi"});
            }
        );
    };

    //Xử lý copy
    const handleCopy = (index: number, values: any) => {
        values = preCopy ? preCopy(values) : values;
        message.loading({key: "index-copy", content: "Đang sao chép"});
        copyService(
            route,
            currentData.id,
            values,
            responseData => {
                data.data.unshift(responseData);
                setData(JSON.parse(JSON.stringify(data)));
                onChange();
                closeForm();
                message.success({key: "index-copy", content: "Đã sao chép"});
            },
            responseData => {
                setErrors(handleServerError(responseData.errors));
                message.error({key: "index-copy", content: "Lỗi"});
            },
        );
    };

    return (
        <>
            <PageHeader
                className="page-header"
                title={`Danh sách ${name.toLocaleLowerCase()}`}
                breadcrumb={<CustomBreadcrumb routes={routes} />}
                extra={
                    <>
                        {canCreate && Boolean(createFields) && (
                            <Button
                                onClick={() => setShowModal(ModalType.CREATE)}
                                icon={<PlusOutlined />}
                            >
                                Thêm mới
                            </Button>
                        )}
                        {props.importColumns.length > 0 && (
                            <Button
                                onClick={() => setShowModal(ModalType.IMPORT)}
                                icon={<FileAddFilled />}
                            >
                                Nhập danh sách
                            </Button>
                        )}
                        {props.buttons}
                        <Search onSearch={handleSearch} onClearSearch={handleClearSearch} />
                    </>
                }
            />

            <List
                tableProps={tableProps}
                data={handleFilter()}
                columns={columns}
                canCopy={canCopy}
                canEdit={canEdit}
                canDelete={canDelete}
                onUpdate={(record) => {
                    setDataIndex(record._originalIndex);
                    setShowModal(ModalType.EDIT);
                }}
                buttons={props.listButtons}
                onDelete={(record) => {
                    setDataIndex(record._originalIndex);
                    setShowModal(ModalType.DELETE);
                }}
                onCopy={(record) => {
                    setDataIndex(record._originalIndex);
                    setShowModal(ModalType.COPY);
                }}
            />

            <Modal
                title={`Thêm ${name.toLocaleLowerCase()}`}
                destroyOnClose
                centered
                visible={showModal === ModalType.CREATE}
                onCancel={closeForm}
                footer={
                    <Button key="back" onClick={closeForm}>
                        Đóng
                    </Button>
                }
            >
                {showModal === ModalType.CREATE && (
                    <Form
                        fields={createFields || []}
                        options={options}
                        errors={errors}
                        onFinish={handleInsert}
                    />
                )}
            </Modal>

            <Modal
                title={`Chỉnh sửa ${props.name.toLocaleLowerCase()}`}
                destroyOnClose
                centered
                visible={showModal === ModalType.EDIT}
                onCancel={closeForm}
                footer={
                    <Button key="back" onClick={closeForm}>
                        Đóng
                    </Button>
                }
            >
                <Form
                    fields={editFields}
                    options={options}
                    errors={errors}
                    initialValues={currentData}
                    onFinish={handleUpdate}
                />
            </Modal>

            <Modal
                title={`Xóa ${name.toLocaleLowerCase()}`}
                destroyOnClose
                centered
                visible={showModal === ModalType.DELETE}
                onCancel={closeForm}
                footer={[
                    <Button key="back" onClick={closeForm}>
                        Đóng
                    </Button>,
                    <Button
                        key="delete"
                        danger
                        onClick={() => handleDelete(dataIndex)}
                    >
                        Xóa
                    </Button>,
                ]}
            >
                Nhấn nút xóa để xác nhận xóa
            </Modal>

            <Modal
                title={`Nhập ${name.toLocaleLowerCase()}`}
                width={"100vw"}
                destroyOnClose
                centered
                visible={showModal === ModalType.IMPORT}
                onCancel={closeForm}
                footer={[]}
            >
                <Import
                    options={options}
                    errors={importErrors}
                    columns={importColumns}
                    onImport={handleImport}
                />
            </Modal>

            <Modal
                title={`Sao chép ${name.toLocaleLowerCase()}`}
                destroyOnClose
                centered
                visible={showModal === ModalType.COPY}
                onCancel={closeForm}
                footer={[
                    <Button key="back" onClick={closeForm}>
                        Đóng
                    </Button>,
                ]}
            >
                <Form
                    fields={copyFields}
                    options={options}
                    errors={errors}
                    initialValues={currentData}
                    onFinish={(values) => handleCopy(dataIndex, values)}
                />
            </Modal>
        </>
    );
};

Index.defaultProps = {
    route: "",
    name: "",
    params: {},
    buttons: [],
    listButtons: [],
    columns: [],
    importColumns: [],
    routes: [],
    preInsert: undefined,
    preUpdate: undefined,
    preCopy: undefined,
    createFields: undefined,
    updateFields: undefined,
    copyFields: undefined,
    canCopy: false,
    canCreate: true,
    canEdit: true,
    canDelete: true,
    onChange: () => {},
    tableProps: {},
};

export default Index;
