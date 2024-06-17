import { Dispatch, SetStateAction, useState } from "react";
import { DismissIcon, PauseIcon, RecordIcon, ResumeIcon, StopIcon } from "./Icons";

interface RecordControlsProps {
  isPaused: boolean,
  isRecording: boolean,
  setIsPaused?: Dispatch<SetStateAction<boolean>>,
  setIsRecording?: Dispatch<SetStateAction<boolean>>,

  startRecording: VoidFunction,
  pauseRecording: VoidFunction,
  stopRecording: VoidFunction,
  cancelRecording: VoidFunction,
}

const RecordControls: React.FunctionComponent<RecordControlsProps> = ({
  isPaused,
  isRecording,
  setIsPaused,
  setIsRecording,
  startRecording,
  pauseRecording,
  stopRecording,
  cancelRecording
}) => {
  return (
    <>
      {!isRecording ? (
        <button className="animate-in rounded-full bg-blue-800 text-white flex justify-center items-center shadow-md shadow-blue-600/50 hover:shadow-xl hover:shadow-blue-600/25 cursor-pointer w-[120px] h-[120px] transition-[box-shadow] ease-out duration-300" onClick={startRecording}>
          <RecordIcon className="w-[64px] h-[64px]" />
        </button>
      ) : (
        <div className="animate-in flex flex-row items-center space-x-4">
          <button className="rounded-full bg-gray-100 text-blue-800 flex justify-center items-center shadow-md shadow-blue-600/50 hover:shadow-xl hover:shadow-blue-600/25 cursor-pointer w-[72px] h-[72px] transition-[box-shadow] ease-out duration-300" onClick={cancelRecording}>
            <DismissIcon className="w-[42px] h-[42px]" />
          </button>


          <button className="rounded-full bg-blue-800 text-white flex justify-center items-center shadow-md shadow-blue-600/50 hover:shadow-xl hover:shadow-blue-600/25 cursor-pointer  w-[120px] h-[120px] transition-[box-shadow] ease-out duration-300" onClick={stopRecording}>
            <StopIcon className="w-[64px] h-[64px]" />
          </button>

          
          <button className="rounded-full bg-gray-100 text-blue-800 flex justify-center items-center shadow-md shadow-blue-600/50 hover:shadow-xl hover:shadow-blue-600/25 cursor-pointer w-[72px] h-[72px] transition-[box-shadow] ease-out duration-300" onClick={pauseRecording}>
            {!isPaused ? (
              <PauseIcon className="w-[42px] h-[42px]" />
            ) : (
              <ResumeIcon className="w-[42px] h-[42px]" />
            )}
          </button>
        </div>
      )}
    </>
  )
}

export default RecordControls
