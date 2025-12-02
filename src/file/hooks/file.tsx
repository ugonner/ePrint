import { useAsyncHelpersContext } from "../../shared/contexts/async-helpers";

export interface IUseFileHandler {
    downloadFile: (dto: {
        url: string;
        name: string;
        isLocal?: boolean;
    }) => void;
}

export const useFileHandler = (): IUseFileHandler => {
    const {setLoading, handleAsyncError} = useAsyncHelpersContext();

    const downloadFile = (dto: {
        url: string;
        name: string;
        isLocal?: boolean
    }) => {
        try{
            setLoading({isLoading: true, loadingMessage: "processing"})
            const anchor: HTMLAnchorElement = document.createElement("a");
            anchor.download = dto.name;
            anchor.href = dto.url;
            anchor.click();
            setLoading({isLoading: false, loadingMessage: ""})
        }catch(error){
            handleAsyncError(error, "Error downloading file")
        }
    }
    return {downloadFile}
}