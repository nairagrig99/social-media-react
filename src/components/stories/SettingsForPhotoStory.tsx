export default function SettingsForPhotoStory() {

    const addTextToPhoto=()=>{

    }
    const addMusicToPhoto=()=>{

    }
    return <div className="flex flex-col gap-5 p-3">
        <div onClick={addTextToPhoto} className="flex items-center gap-3">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#E5E7EB"/>
                <text x="12" y="16"
                      textAnchor="middle"
                      fontSize="12" fontFamily="Arial" fill="#111827">Aa</text>
            </svg>
            Add Text
        </div>
        <div onClick={ addMusicToPhoto} className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                 width="40"
                 height="40"
                 fill="currentColor">
                <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/>
            </svg>
            Add Music
        </div>
    </div>
}