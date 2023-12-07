"use client";

import type { DropzoneOptions } from "react-dropzone";
import type { StoreApi } from "zustand";
import type { InputHTMLAttributes } from "react";

import { useCallback, useEffect, useMemo, useState } from "react";
import { cx } from "class-variance-authority";
import { useDropzone } from "react-dropzone";
import { createStore } from "zustand";

export type FileInputState =
  | null
  | "DRAG_ACTIVE"
  | "FOCUSED"
  | "DRAG_ACCEPT"
  | "DRAG_REJECT"
  | "FILE_DIALOG_ACTIVE"
  | "FILE_BUFFER_CHANGE"
  | "FILE_CHANGE";

type FileBuffer = string | ArrayBuffer | null;
type FilesBuffers = NonNullable<FileBuffer>[];
type Files = File[];

type ValueOrUpdater<Value> = Value | ((value: Value) => Value);

type Store = {
  state: FileInputState;
  filesBuffers: FilesBuffers;
  files: Files;
  setState: (
    valueOrUpdater: ValueOrUpdater<FileInputState>,
    params?: { files?: Files; filesBuffers?: FilesBuffers },
  ) => void | Promise<void>;
};

type FileInputStoreApi = StoreApi<Store>;

export type FileInputProps = InputHTMLAttributes<HTMLInputElement> & {
  options?: DropzoneOptions;
  cb: (
    type: FileInputState,
    payload: {
      store: FileInputStoreApi;
      filesBuffers: FilesBuffers;
      files: Files;
    },
  ) => void | Promise<void>;
  canReadFilesBuffers: boolean;
};

export default function FileInput({
  options,
  cb,
  canReadFilesBuffers,
  ...props
}: FileInputProps) {
  const [store] = useState(
    createStore<Store>((set, get) => {
      return {
        state: null,
        filesBuffers: [],
        files: [],
        async setState(valueOrUpdater, params) {
          const currentStoreState = get();
          const newState =
            typeof valueOrUpdater === "function"
              ? valueOrUpdater(currentStoreState.state)
              : valueOrUpdater;
          const newFilesBuffers =
            typeof params?.filesBuffers === "undefined"
              ? currentStoreState.filesBuffers
              : params.filesBuffers;

          const newFiles =
            typeof params?.files === "undefined"
              ? currentStoreState.files
              : params.files;

          await cb(newState, {
            store,
            files: newFiles,
            filesBuffers: newFilesBuffers,
          });
          set({
            state: newState,
            files: newFiles,
            filesBuffers: newFilesBuffers,
          });
        },
      };
    }),
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const filesBuffers: FilesBuffers = [];

      if (canReadFilesBuffers) {
        acceptedFiles.forEach((file) => {
          const reader = new FileReader();

          reader.onabort = () => console.log("file reading was aborted");
          reader.onerror = () => console.log("file reading has failed");
          reader.onload = async () => {
            // Do whatever you want with the file contents
            const binaryStr = reader.result;
            // console.log(binaryStr);
            if (binaryStr) filesBuffers.push(binaryStr);
          };
          reader.readAsArrayBuffer(file);
        });
      }

      await store.getState().setState("FILE_BUFFER_CHANGE", {
        filesBuffers: filesBuffers.length > 0 ? filesBuffers : undefined,
        files: acceptedFiles,
      });
    },
    [store],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
    isFileDialogActive,
    acceptedFiles,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
  } = useDropzone({ onDrop, ...options });

  // const files = useMemo(
  //   () =>
  //     acceptedFiles.map((file) => (
  //       <li key={file.name}>
  //         {file.name} - {file.size} bytes
  //       </li>
  //     )),
  //   [acceptedFiles],
  // );

  const className = useMemo(
    () =>
      cx(
        "flex flex-col items-center p-5 border-[0.125rem] rounded-[0.125rem] outline-none border-gray-200 border-dashed bg-gray-100 text-gray-500 flex-grow transition-[border_.24s_ease-in-out]",
        isFocused && "border-[#2196f3]",
        isDragAccept && "border-[#00e676]",
        isDragReject && "border-[#ff1744]",
      ),
    [isFocused, isDragAccept, isDragReject],
  );

  useEffect(() => {
    const setState = store.getState().setState;

    if (isDragActive) void setState("DRAG_ACTIVE");
    if (isFocused) void setState("FOCUSED");
    if (isDragAccept) void setState("DRAG_ACCEPT");
    if (isDragReject) void setState("DRAG_REJECT");
    if (isFileDialogActive) void setState("FILE_DIALOG_ACTIVE");
  }, [
    store,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
    isFileDialogActive,
  ]);

  return (
    <fieldset className="flex flex-col gap-2">
      <section {...getRootProps({ className })}>
        <input type="file" {...getInputProps(props)} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>
            Drag &apos;n&apos; drop some files here, or click to select files
          </p>
        )}
      </section>
      {/* <aside className="flex flex-wrap">
        <strong className="font-semibold capitalize">files:</strong>
        &nbsp;<ul style={{ wordBreak: "break-all" }}>{files}</ul>{" "}
      </aside> */}
    </fieldset>
  );
}
