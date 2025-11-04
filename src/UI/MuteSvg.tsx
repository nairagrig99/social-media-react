type MuteSvgProps = {
    className?: string;
    mute: boolean,
    onClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
};
export default function MuteSvg(props: MuteSvgProps) {
    return (
        <>

            {!props.mute && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor"
                                className={`${props.className} w-6 h-6`} onClick={props.onClick}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M5.25 8.25v7.5h3L13.5 21V3l-5.25 4.5h-3zM16.5 8.25a4.5 4.5 0 010 7.5M18.75 6a7.5 7.5 0 010 12"/>
            </svg>}

            {props.mute &&
                <svg onClick={props.onClick} className={`${props.className} w-6 h-6`}
                     xmlns="http://www.w3.org/2000/svg"
                     width="24" height="24" viewBox="0 0 24 24" role="img"
                     aria-label="Mute (sound off)" fill="none" stroke="currentColor" strokeWidth="2"
                     strokeLinecap="round"
                     strokeLinejoin="round">
                    <title>Mute</title>
                    <desc>Speaker with a slash indicating muted</desc>
                    <path d="M11 5 L6 9 H3 v6 h3 l5 4 V5 z" fill="currentColor" opacity="0.15"/>
                    <path d="M11 5 L6 9 H3 v6 h3 l5 4 V5 z"/>
                    <line x1="19" y1="5" x2="5" y2="19"/>
                </svg>}
        </>
    )
}