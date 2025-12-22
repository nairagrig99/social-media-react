export default function useFile() {
    const fileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event?.target?.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file) {
                try {
                    return await new Promise<string>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result as string);
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                    });
                } catch (error) {
                    console.error("Compression failed", error);
                }
            }
        }
    };
    return {fileChange}
}