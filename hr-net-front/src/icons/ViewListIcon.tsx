import { IIconProps } from 'util/Interface';

const ViewListIcon = (props: IIconProps): JSX.Element => {
    return (
        <svg viewBox="0 0 48 48" {...props} fill={props.color}>
            <path
                d="M6 38V10h36v28Zm3-19.65h5.3V13H9Zm8.3 0H39V13H17.3Zm0 8.3H39v-5.3H17.3Zm0 8.35H39v-5.35H17.3ZM9 35h5.3v-5.35H9Zm0-8.35h5.3v-5.3H9Z"
                fill={props.color as string | undefined}
            />
        </svg>
    );
};

export default ViewListIcon;
