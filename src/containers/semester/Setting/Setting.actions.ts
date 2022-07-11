export const getIdFromFullCode = (codeOrder: string[], rootGroups: Group[] | undefined): number | undefined => {   
    if (!codeOrder || codeOrder.length === 0) return undefined;
    if (rootGroups === undefined) return undefined;
    const group = rootGroups?.find(group => group.code === codeOrder[0]);
    if (group) {
        if (group.children && group.children.length > 0 && codeOrder.length > 1) {
            codeOrder.shift();
            return getIdFromFullCode(codeOrder, group?.children);
        } else {
            return group.id;
        }
    } else {
        return undefined;
    }
}