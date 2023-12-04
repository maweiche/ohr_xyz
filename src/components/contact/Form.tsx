import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { toast } from "sonner";

interface FormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
  isChecked: boolean;
  setShowGDPR: Dispatch<SetStateAction<boolean>>;
}

export const Form: React.FC<FormProps> = ({
  handleSubmit,
  isLoading,
  setIsChecked,
  isChecked,
  setShowGDPR,
}) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleInvalidName = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    toast.error("Please fill out this field.");
  };

  const handleInvalidEmail = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    toast.error("Please enter a valid email address.");
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className="m-3 gap-2"
    >
      <div className=" w-full">
        <label className="flex flex-col mb-3 ">
          <p className="text-purple-200 text-sm">
            Name
            <span className="text-bigbang">*</span>
          </p>
          <input
            type="text"
            name="name"
            required
            onInvalid={handleInvalidName}
            className="input rounded-md w-full bg-purple-300/30 border-purple-300"
          />
        </label>
        <label className="flex flex-col mb-3 ">
          <p className="text-purple-200 text-sm">
            Telegram
            <span className="text-bigbang">*</span>
          </p>
          <input
            type="telegram"
            name="telegram"
            required
            onInvalid={handleInvalidName}
            className="input rounded-md w-full bg-purple-300/30 border-purple-300"
            placeholder="@"
          />
        </label>
      </div>
      <label className="flex flex-col text-left">
        <p className="text-purple-200 text-sm">
          Email
          <span className="text-bigbang">*</span>
        </p>
        <input
          type="email"
          name="email"
          required
          onInvalid={handleInvalidEmail}
          className="input rounded-md w-full bg-purple-300/30 border-purple-300"
        />
      </label>
      <div className="form-control md:mt-3">
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="checkbox border-purple-300 accent-transparent"
          />
          <span className="px-2 label-text text-sm text-purple-100">
            I am accepting the{" "}
            <button
              className="underline white"
              onClick={() => setShowGDPR(true)}
            >
              GDPR compliance
            </button>
          </span>
        </label>
      </div>
      <div className="flex justify-start">
        <button
          type="submit"
          disabled={isLoading}
          className="px-10 mt-4 text-lg w-full h-10 text-purple-100 btn primary-btn  rounded-md "
        >
          {isLoading ? <i>{"Sending"}</i> : "Send"}
        </button>
      </div>
    </form>
  );
};
