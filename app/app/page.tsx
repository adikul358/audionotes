"use client"

import LoadingIcon from "@/components/Icons/LoadingIcon";
import RecordControls from "@/components/RecordControls";
import TabBar from "@/components/TabBar";
import addNote from "@/utils/supabase/addNote";
import { useRouter } from "next/navigation";
import { useState, useRef, DragEventHandler } from "react";

require('dotenv').config()

export default function AppPage() {
  const [tab, setTab] = useState("upload")
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

  const processAPI = async (audioBlob: Blob) => {
    const formData = new FormData()
    formData.append("file", audioBlob)

    const { title, transcript, summary, audio_url } = await (await fetch("/api/transcribe", {
      method: "POST",
      body: formData
    })).json()

    // const { title, transcript, summary, audio_url } = {
    //     title: "The Devastating Effects of Burnout on Productivity",
    //     transcript: "Burnout is a terrible thing that substantially lowers productivity.",
    //     summary: "Burnout is a detrimental condition that can have a significant impact on productivity levels.",
    //     audio_url: "https://audionotes358.s3.ap-south-1.amazonaws.com/1717055660471.wav"
    // }

    setProcessing("finish")

    const supabaseRes = await addNote({title, transcript, summary, audio_url})
    return supabaseRes[0].id
  }

  const [urlError, setUrlError] = useState("");
  const urlInputRef = useRef<HTMLInputElement>(null)
  const urlClient = async (e) => {
    e.preventDefault()
    var url = urlInputRef.current.value
    var audioBlob
    setProcessing("fetch")

    if (urlInputRef.current.value.toLowerCase().includes("youtube.com")) {
      audioBlob = await (await fetch("/api/fetch-youtube", {
        method: "POST",
        body: JSON.stringify({ url })
      })).blob()
    } else {
      var ext = url.split(".")[url.split(".").length - 1]
      console.log(ext)
      var type = ext == 'wav' ? 'audio/wav' : 'audio/mpeg'
      audioBlob = await (await fetch(url, {
        method: "GET",
      })).blob()
      audioBlob = new Blob([audioBlob], { type: type })
    }

    
    setTimeout(() => {
      setProcessing("process")
    }, 1500)

    const id = await processAPI(audioBlob)
    router.push(`/app/note/${id}`)
  }

  const [fileDragged, setFileDragged] = useState(false);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null)
  const fileDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    event.stopPropagation();
    event.preventDefault();
    setFileDragged(true)
  }
  const fileDragLeave: DragEventHandler<HTMLDivElement> = () => {
    setFileDragged(false)
  }
  const fileDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    setFileDragged(false)
    const file = e.dataTransfer.files[0];
    const fileSize = file.size;
    const fileType = file.type;
    let sizeInMB = (fileSize / (1024 * 1024));

    const fileTypes = ["audio/wav", "audio/mpeg"]

    // Check file type
    if (!fileTypes.includes(fileType)) {
      return setFileError("Only .wav and .mp3 files are allowed")
    }
    // Check file size
    if (sizeInMB > 50) {
      return setFileError("Maximum file size is 50 MB")
    }
    
    file.arrayBuffer().then((buff) => {
      const audioBlob = new Blob([buff], { type: fileType })
      processAPI(audioBlob)
    })
  }

  const [stream, setStream] = useState<MediaStream>();
  const [processing, setProcessing] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const mediaRecorder = useRef(null);
  const router = useRouter()

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
  const cancelRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    mediaRecorder.current.stop();
  };
  const stopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    var id;
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      setProcessing("upload")
      setTimeout(() => {
        setProcessing("process")
      }, 1500)
      id = await processAPI(audioBlob)
      setAudioChunks([]);
      stream.getTracks()[0].stop();
      router.push(`/app/note/${id}`)
    };
  };

  

  return processing == "" ? (
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
          <div 
            className={`transition-[background] ease duration-150 w-[480px] aspect-[2] rounded-lg p-6 flex flex-col items-center justify-center border-blue-800 border-[3px] ${fileDragged ? "text-white bg-blue-800/80" : " border-dashed"}`}
            onDragOver={fileDragOver}
            onDragLeave={fileDragLeave}
            onDrop={fileDrop}
          >
            <span className={`mb-3 text-lg ${fileDragged && "font-medium"}`}>Drag and Drop Here</span>
            {!fileDragged && (<>
              <button onClick={() => fileInputRef.current.click()} className="flex items-center justify-center bg-blue-800 text-white rounded-lg px-6 py-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
                Upload File
              </button>
              <span className="mt-6 text-sm">Max Size: 50 MB</span>
              {fileError !==  "" && 
                <span className="mt-2 font-semibold text-red-600">{fileError}</span>
              }
              <input type="file" hidden ref={fileInputRef} />
            </>)}
          </div>

          <span className="my-3 text-gray-500">or</span>

          <form onSubmit={urlClient} className="flex w-full">
            <input ref={urlInputRef} type="text" className="flex-grow px-6 py-2 border-2 border-gray-500 rounded-lg mr-3" placeholder="Enter Audio or YouTube URL" />
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
  ) : (
    <div className="flex flex-col relative flex-grow justify-center items-center">
      <LoadingIcon className="size-[72px] text-blue-800 mb-4" />
      {processing == "fetch" && 
        <span className="text-xl font-semibold">Fetching</span>
      }
      {processing == "upload" && 
        <span className="text-xl font-semibold">Uploading</span>
      }
      {processing == "process" && 
        <span className="text-xl font-semibold">Processing</span>
      }
      {processing == "finish" && 
        <span className="text-xl font-semibold">Finishing up</span>
      }
    </div>
  );
}
