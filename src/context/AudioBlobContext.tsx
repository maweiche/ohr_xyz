import { Dispatch, SetStateAction, createContext, useContext } from "react";
export type AudioBlobContent = {
  audioBlob?: Blob;
  setAudioBlob: Dispatch<SetStateAction<Blob | undefined>>;
  uploadId?: string;
  setUploadId: Dispatch<SetStateAction<string | undefined>>;
};
export const AudioBlobContext = createContext<AudioBlobContent>({
  audioBlob: undefined,
  setAudioBlob: () => {},
  uploadId: undefined,
  setUploadId: () => {},
});
export const useAudioContext = () => useContext(AudioBlobContext);
