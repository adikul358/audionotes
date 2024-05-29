"use client"

import RecordControls from "@/components/RecordControls";
import { createClient } from "@/utils/supabase/server";
import { useState, useRef, useEffect } from "react";

export default function AppPage() {
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [isPaused, setIsPaused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const mediaRecorder = useRef(null);

  const startRecording = async () => {
    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      setPermission(true);
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
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
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
      <div className="flex flex-grow justify-center items-center">
        <RecordControls 
          isPaused={isPaused} 
          isRecording={isRecording} 
          startRecording={startRecording} 
          pauseRecording={pauseRecording} 
          stopRecording={stopRecording} 
          cancelRecording={cancelRecording} 
        />
      </div>
  );
}
