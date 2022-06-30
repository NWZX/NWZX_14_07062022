type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]];
type Join<K, P> = K extends string | number
    ? P extends string | number
        ? `${K}${'' extends P ? '' : '.'}${P}`
        : never
    : never;
export type Leaves<T, D extends number = 10> = [D] extends [never]
    ? never
    : T extends object
    ? { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T]
    : '';

export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    startDate: string;
    address: {
        street: string;
        city: string;
        zipCode: string;
        state: string;
    };
    department: string;
}

export interface IIconProps extends React.HTMLAttributes<HTMLOrSVGElement> {
    color?: string;
}
