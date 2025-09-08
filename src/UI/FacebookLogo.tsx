export default function FacebookLogo({size = 40, color = "#1877F2"}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={color}
        >
            <path
                d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.034 4.388 11.045 10.125 11.958v-8.457H7.078v-3.501h3.047V9.414c0-3.007 1.792-4.669 4.532-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.492 0-1.955.929-1.955 1.884v2.259h3.328l-.532 3.501h-2.796v8.457C19.612 23.118 24 18.107 24 12.073z"/>
        </svg>
    );
}