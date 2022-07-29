interface CustomThirdTitleContent {
    html: JSX.Element,
    text: string,
}

interface CustomThirdTitle extends Omit<ThirdTitle, "description"> {
    type: string;
    description: CustomThirdTitleContent[];
}

interface CustomTitleActivity extends TitleActivity {
    type: string;
    delete: number[];
}