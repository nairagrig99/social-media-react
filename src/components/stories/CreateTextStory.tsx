interface ChildProps {
    textStory: (data: boolean) => void;
}

export default function CreateTextStory({textStory}: ChildProps) {

    return <div
        onClick={() => textStory(true)}
        className="cursor-pointer text-[25px] font-medium font-[cursive] text-white w-[350px] h-[360px] bg-[oklch(0.47_0.13_351.64)] rounded-[15px] flex items-center justify-center">
        Create a text story
    </div>
}