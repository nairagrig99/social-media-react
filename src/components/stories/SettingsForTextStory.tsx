export default function SettingsForTextStory() {

    const addTextToPhoto=()=>{

    }
    const addMusicToPhoto=()=>{

    }
    return <div className="flex flex-col gap-5">
        <div onClick={addTextToPhoto}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#E5E7EB"/>
                <text x="12" y="16" text-anchor="middle" font-size="12" font-family="Arial" fill="#111827">Aa</text>
            </svg>
            Add Text
        </div>
        <div onClick={ addMusicToPhoto}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/>
            </svg>
            Add Music
        </div>
    </div>
}