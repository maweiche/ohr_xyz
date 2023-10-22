import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; //

interface MetadataState {
  theVibe: string;
  longitude?: string;
  latitude?: string;
  timeStamp: string;
  uploadID: string;
  audioBlob: Blob | null;
}

interface MetadataStore {
  metadata: MetadataState;
  setMetadata: (metadata: Partial<MetadataState>) => void;
  resetMetadata: () => void;
  setTheVibe: (theVibe: string) => void;
  setLongitude: (longitude: string) => void;
  setLatitude: (latitude: string) => void;
  setTimeStamp: (timeStamp: string) => void;
  setUploadID: (uploadID: string) => void;
  setAudioBlob: (audioBlob: Blob | null) => void;
}

const useMetadataStore = create<MetadataStore>()(
  devtools(
    persist(
      (set) => ({
        metadata: {
          theVibe: "",
          longitude: "",
          latitude: "",
          timeStamp: "",
          uploadID: "",
          audioBlob: null,
        },
        setMetadata: (metadata: Partial<MetadataState>) =>
          set((state) => ({ metadata: { ...state.metadata, ...metadata } })),
        resetMetadata: () =>
          set({
            metadata: {
              theVibe: "",
              longitude: "",
              latitude: "",
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
        setLongitude: (longitude: string) =>
          set((state) => ({
            ...state,
            metadata: { ...state.metadata, longitude },
          })),
        setLatitude: (latitude: string) =>
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
  )
);

export default useMetadataStore;
