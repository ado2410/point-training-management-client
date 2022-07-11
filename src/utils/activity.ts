export const getActivityType = (id: number) => {
    switch (id) {
        case 1: return "hoạt động";
        case 2: return "khen thưởng";
        case 3: return "vi phạm";
        default: return "không biết";
    }
}

export const getActivityTypeAction = (id: number) => {
    switch (id) {
        case 1: return "tham gia";
        case 2: return "nhận khen thưởng";
        case 3: return "vi phạm";
        default: return "không biết";
    }
}