import { Tag } from "antd";
import { Link } from "react-router-dom";

export const groupRoutes: CustomBreadCrumbRoute[] = [
    {name: "Quản lý nhóm", path: "/majors"},
];

export const groupTableColumns = [
    {
        title: "Mã nhóm",
        dataIndex: "full_code",
        key: "full_code",
        width: 150,
    },
    {
        title: "Tên nhóm",
        dataIndex: "name",
        key: "name",
        render: (text: string, record: Group) => (
            <Link to={`/groups?group=${record.id}`}>{text}</Link>
        ),
    },
    {
        title: "Quyền truy cập",
        dataIndex: "user_groups",
        key: "user_groups",
        render: (_text: string, record: Group) => record.group_users.map((userGroup, index) => <Tag key={index}>{userGroup.user.first_name} {userGroup.user.last_name}</Tag>),
    },
];

export const groupFormFields = (groupId: string | undefined): CustomFormField<Group>[] => [
    // {
    //     label: "Thuộc nhóm",
    //     name: "group_id",
    //     type: "treeselect",
    //     showSearch: true,
    //     options: "groups",
    //     initialValue: group ? group.id : null,
    // },
    {
        label: '',
        name: "group_id",
        type: "hidden",
        initialValue: groupId,
    },
    {
        label: "Mã nhóm",
        name: "code",
    },
    {
        label: "Tên nhóm",
        name: "name",
    },
    {
        label: "Quyền truy cập",
        name: "user_ids",
        type: "select",
        multiple: true,
        showSearch: true,
        options: "users",
        initialValue: (row) => row.group_users?.map(groupUser => groupUser.user_id),
    },
];