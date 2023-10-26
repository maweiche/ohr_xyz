import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; //

interface MetadataState {
  theVibe: string;
  longitude?: number;
  latitude?: number;
  timeStamp: string;
  uploadID: string;
  audioBlob: Blob | null;
}

interface MetadataStore {
  metadata: MetadataState;
  resetMetadata: () => void;
  setTheVibe: (theVibe: string) => void;
  setLongitude: (longitude: number) => void;
  setLatitude: (latitude: number) => void;
  setTimeStamp: (timeStamp: string) => void;
  setUploadID: (uploadID: string) => void;
  setAudioBlob: (audioBlob: Blob | null) => void;
}

const useMetadataStore = create<MetadataStore>()(
  devtools(
    (set) => ({
      metadata: {
        theVibe: "",
        longitude: undefined,
        latitude: undefined,
        timeStamp: "",
        uploadID: "",
        audioBlob: null,
      },
      resetMetadata: () =>
        set({
          metadata: {
            theVibe: "",
            longitude: undefined,
            latitude: undefined,
            timeStamp: "",
            uploadID: "",
            audioBlob: null,
          },
        }),
      setTheVibe: (theVibe: string) =>
        set((state) => ({
          ...state,
          metadata: { ...state.metadata, theVibe },
        })),
      setLongitude: (longitude: number) =>
        set((state) => ({
          ...state,
          metadata: { ...state.metadata, longitude },
        })),
      setLatitude: (latitude: number) =>
        set((state) => ({
          ...state,
          metadata: { ...state.metadata, latitude },
        })),
      setTimeStamp: (timeStamp: string) =>
        set((state) => ({
          ...state,
          metadata: { ...state.metadata, timeStamp },
        })),
      setUploadID: (uploadID: string) =>
        set((state) => ({
          ...state,
          metadata: { ...state.metadata, uploadID },
        })),
      setAudioBlob: (audioBlob: Blob | null) =>
        set((state) => ({
          ...state,
          metadata: { ...state.metadata, audioBlob },
        })),
    }),
    { name: "metadata-storage" }
  )
);

export default useMetadataStore;
