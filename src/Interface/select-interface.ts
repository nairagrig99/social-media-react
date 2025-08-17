export interface SelectInterface {
    options: string[],
    name:string,
    value?:string;
    errors?:string;
    disable?: boolean,
    className?: string,
    onChange?: (value:string) => void
}

export interface Country {
    cities: string[],
    country: string;
}