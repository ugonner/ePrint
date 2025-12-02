import { IonItem, IonTextarea } from "@ionic/react";
import { HTMLAttributes, useState } from "react";

export interface ITextAreaInputProps extends  HTMLAttributes<HTMLIonTextareaElement> {
    onCompletion: (str: string) => void;
    placeHolder?: string;
}

export const TextAreaInput = ({onCompletion, placeHolder, ...textAreaProps}:  ITextAreaInputProps) => {
    const [TEXTAreaContent, setTEXTaREAContent] = useState<string>("");
    const textAreaCols = 70;
    const textAreaRows = TEXTAreaContent ? Math.trunc(TEXTAreaContent.length / textAreaCols) + 1: 1;

    return (
        
         <div style={{borderRadius: "20%"}}>
            <IonItem>
                <IonTextarea
                placeholder={placeHolder || "Type in text"}
                rows={textAreaRows}
                cols={textAreaCols}
                onIonInput={(evt) => {
                    setTEXTaREAContent(evt.detail.value as string)
                    onCompletion(evt.detail.value as string);
                }}
                {...(textAreaProps || {})}
                ></IonTextarea>
                </IonItem>
        </div>
    )
}
