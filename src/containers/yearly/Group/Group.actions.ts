export const getFullGroupOptions = (options: Group[] | undefined): any =>
    options?.map((option) => ({
        id: option.id,
        name: `${getFullCode(option)}: ${option?.name}`,
        children: getFullGroupOptions(option.children),
    }));

export const getFullCode = (group: Group | undefined) => {
    let code = "";
    while (group) {
        if (code === "") code = group.code;
        else code = `${group.code}_` + code;
        group = group.parent;
    }
    return code;
};