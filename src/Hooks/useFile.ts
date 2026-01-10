export default function useFile() {
    const fileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event?.target?.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file) {
                return new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                }).then(async (response) => {
                    return await convertBase64ToURL(response);
                })

            }
        }
    };

    return {fileChange}
}

const IMGBB_API_KEY = 'cc2dabcc1ecf2c9224408ea5fef366cd';

const convertBase64ToURL = async (base64String: any) => {
    const base64Data = base64String.includes('base64,')
        ? base64String.split('base64,')[1]
        : base64String;

    const formData = new FormData();
    formData.append('image', base64Data);

    const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {method: 'POST', body: formData}
    );

    const data = await response.json();
    return data.data.url;
};
