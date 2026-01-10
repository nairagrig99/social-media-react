import {useEffect, useState} from "react";

type DateProps = {
    date: string,
}

export default function DateStructr({date}: DateProps) {

    const dateConvert = new Date(date);

    const currentDate = new Date();

    const [dateStr, setDateStr] = useState<string>(dateConvert.toLocaleDateString());

    useEffect(() => {

        const today = dateConvert.getDate() === currentDate.getDate();

        if (today && dateConvert.getMinutes() === currentDate.getMinutes()) {
            setDateStr('Just Now');
        }

        if (dateConvert.getMinutes() < currentDate.getMinutes() && dateConvert.getHours() === currentDate.getHours()) {
            setDateStr(`${Math.abs(dateConvert.getMinutes() - currentDate.getMinutes())} min ago `);
        }

        if (dateConvert.getMinutes() > currentDate.getMinutes() && currentDate.getHours() > dateConvert.getHours()) {
            setDateStr(`${Math.abs(dateConvert.getHours() - currentDate.getHours())} hour ago`);
        }

        if (currentDate.getDate() > dateConvert.getDate()) {
            setDateStr(currentDate.toDateString());
        }

    }, []);
    return <>
        {dateStr}
    </>
}