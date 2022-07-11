interface PointProps {
    semesterId: number;
}

interface PointThirdTitleContext {
    text: string;
    html: JSX.Element;
}

type PointActivity = Activity & {
    student_activity: StudentActivity;
}

type PointThirdTitle = Omit<ThirdTitle, "description"> & {
    point: number;
    type: "primary" | "secondary" | "third" | "sum";
    description: PointThirdTitleContext[];
    reason: PointThirdTitleContext[];
}

interface ServerSemesterStudent {
    primaryTitles: PrimaryTitle[];
    student: Student;
    semester: Semester;
}