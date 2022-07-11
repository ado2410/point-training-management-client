import { Tag } from "antd";
import { Link } from "react-router-dom";
import { getFullGroupOptions } from "./Group.actions";

export const groupRoutes: CustomBreadCrumbRoute[] = [
    {name: "Quản lý ngành học", path: "/majors"},
];

export const groupTableColumns = [
    {
        title: "Mã nhóm",
        dataIndex: "code",
        key: "code",
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
        render: (_text: string, record: Group) => record.group_users.map(userGroup => <Tag>{userGroup.user.first_name} {userGroup.user.last_name}</Tag>),
    },
];

export const groupFormFields = (group: Group | undefined): CustomFormField<Group>[] => [
    {
        label: "Mã nhóm",
        name: "code",
    },
    {
        label: "Tên nhóm",
        name: "name",
    },
    {
        label: "Thuộc nhóm",
        name: "group_id",
        type: "treeselect",
        showSearch: true,
        options: "groups",
        initialValue: group ? group.id : null,
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