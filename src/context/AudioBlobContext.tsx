import { Dispatch, SetStateAction, createContext, useContext } from "react";
export type AudioBlobContent = {
  audioBlob: Blob | undefined;
  setAudioBlob: Dispatch<SetStateAction<Blob | undefined>>;
};
export const AudioBlobContext = createContext<AudioBlobContent>({
  audioBlob: undefined,
  setAudioBlob: () => {},
});
export const useAudioContext = () => useContext(AudioBlobContext);
