"use client"

import RecordControls from "@/components/RecordControls";
import TabBar from "@/components/TabBar";
import { useState, useRef, useEffect } from "react";

export default function AppPage() {
  const [tab, setTab] = useState("record")
  const tabs = [
		{
			key: "record",
			label: "Record Audio",
			onClick: (key: string) => setTab(key),
		},
		{
			key: "upload",
			label: "Upload Audio",
			onClick: (key: string) => setTab(key),
		},
	]


  const [stream, setStream] = useState<MediaStream>();
  const [isPaused, setIsPaused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorder = useRef(null);

  const startRecording = async () => {
    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      setStream(streamData);
      setIsRecording(true);
      setIsPaused(false);
      const media = new MediaRecorder(streamData);
      mediaRecorder.current = media;
      mediaRecorder.current.start();
      let localAudioChunks = [];
      mediaRecorder.current.ondataavailable = (event) => {
        if (typeof event.data === "undefined") return;
        if (event.data.size === 0) return;
        localAudioChunks.push(event.data);
      };
      setAudioChunks(localAudioChunks);
    } catch (err) {
      console.log(err.message);
    }
  };

  const pauseRecording = () => {
    if (!isPaused) {
      setIsPaused(true)
      mediaRecorder.current.pause();
    } else {
      setIsPaused(false)
      mediaRecorder.current.resume();
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      setAudioUrl(URL.createObjectURL(audioBlob));
      alert(audioUrl);
      setAudioChunks([]);
    };
    stream.getTracks()[0].stop();
  };

  const cancelRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    mediaRecorder.current.stop();
  };

  return (
      <div className="flex flex-col relative flex-grow justify-center items-center">
       
        {tab == "record" &&
          <RecordControls 
            isPaused={isPaused} 
            isRecording={isRecording} 
            startRecording={startRecording} 
            pauseRecording={pauseRecording} 
            stopRecording={stopRecording} 
            cancelRecording={cancelRecording} 
          />
        }
       
        {tab == "upload" &&
          <div className="animate-in space-y-3 flex flex-col items-center">
            <div className="w-[480px] aspect-[2] rounded-lg p-6 flex flex-col items-center justify-center border-2 border-blue-800">
              <span className="mb-3 text-lg">Drag and Drop Here</span>
              <button className="flex items-center justify-center bg-blue-800 text-white rounded-lg px-6 py-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
                Upload File
              </button>
              <span className="mt-6 text-sm">Max Size: 50 MB</span>
            </div>

            <span className="my-3 text-gray-500">or</span>

            <form method="POST" className="flex w-full">
              <input type="text" className="flex-grow px-6 py-2 border-2 border-gray-500 rounded-lg mr-3" placeholder="Enter Audio or YouTube URL" />
              <button type="submit" className="w-12 h-12 rounded-lg bg-blue-800 text-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-[28px]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
              </button>
            </form>
          </div>
        }

        <TabBar tabs={tabs} activeTab={tab} className="absolute bottom-0 flex flex-row text-lg space-x-2" tabClassName="rounded-b-none rounded-t-lg px-6 py-3" />
      </div>
  );
}
