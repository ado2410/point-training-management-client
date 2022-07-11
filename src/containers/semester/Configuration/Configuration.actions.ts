export const flattenTitles = (primaryTitles: PrimaryTitle[]) => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const convertedData: CustomThirdTitle[] = [];
    primaryTitles.forEach((primaryTitle: any, index) => {
        primaryTitle.type = "primary";
        primaryTitle.title = `${index+1}. ${primaryTitle.title}`;
        convertedData.push(primaryTitle as unknown as CustomThirdTitle);
        primaryTitle.secondary_titles?.forEach((secondaryTitle: any, index: number) => {
            secondaryTitle.title = `${alphabet.charAt(index)}. ${secondaryTitle.title}`;
            secondaryTitle.type = "secondary";
            convertedData.push(secondaryTitle as unknown as CustomThirdTitle);
            secondaryTitle.third_titles?.forEach((thirdTitle: any) => {
                thirdTitle.type = "third";
                convertedData.push(thirdTitle);
            });
            delete secondaryTitle.third_titles;
        });
        delete primaryTitle.secondary_titles;
    });
    return convertedData;
}