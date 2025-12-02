import {
  IonAvatar,
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonModal,
} from "@ionic/react";
import { IFileAndObjectUrl } from "./MultipleFiles";

import React, { useState, useRef } from "react";
import {
  checkmarkSharp,
  closeCircle,
  mic,
  micSharp,
  pauseSharp,
  playSharp,
  recordingSharp,
  stopSharp,
} from "ionicons/icons";
import { useAsyncHelpersContext } from "../../shared/contexts/async-helpers";

export const formatTimeInterval = (seconds: number): string => {
  let timeRemainder = 0;
  let hours = Math.trunc(seconds / (60 * 60));
  timeRemainder = seconds % (60 * 60);
  let minutes = Math.trunc(timeRemainder / 60);
  seconds = timeRemainder % 60;
  const minutesStr = `${minutes}`.padStart(2, "0");
  const houssStr = `${hours}`.padStart(2, "0");
  const secondsStr = `${seconds}`.padStart(2, "0");
  return `${houssStr}:${minutesStr}:${secondsStr}`;
};
export interface IVoiceInputProps {
  onCompletion: (fileObj: IFileAndObjectUrl) => void;
  onCancelAction?: () => void;
  label?: string;
}

export const VoiceInput: React.FC<IVoiceInputProps> = ({
  onCompletion,
  onCancelAction,
  label,
}: IVoiceInputProps) => {
  const { setLoading, handleAsyncError } = useAsyncHelpersContext();

  const durationRef = useRef<number>(0);
  const [durationTime, setDurationTime] = useState(0)
  const durationTimeoutRef = useRef<unknown>();

  const [showTimer, setShowTimer] = useState(true);
  const [openRecordTab, setOpenRecordTAB] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  /** START RECORDING **/
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      durationTimeoutRef.current = setInterval(() => {
        if (mediaRecorderRef.current?.state === "recording") {
          durationRef.current = durationRef.current +  1;
          setDurationTime(durationRef.current);;
        }
          
      }, 1000);

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        try {
          clearInterval(durationTimeoutRef.current as number);
          setDurationTime(0)
          const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          const url = URL.createObjectURL(blob);
          setAudioURL(url);

          // Convert to File
          const file = new File([blob], "voice_note.webm", {
            type: "audio/webm",
          });
          setAudioFile(file);
        } catch (error) {
          handleAsyncError(error, "Error stoping recording");
        }
      };

      // Waveform Setup
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;

      const source = audioContextRef.current.createMediaStreamSource(stream);
      sourceRef.current = source;

      source.connect(analyserRef.current);

      mediaRecorder.start();
      setIsRecording(true);

      drawWaveform();
    } catch (error) {
      handleAsyncError(error, "Error starting audio recording");
    }
  };

  /** PAUSE / RESUME **/
  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording && !isPaused) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  };

  /** STOP **/
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  const cancelRecording = () => {
    stopRecording();
    if (onCancelAction) onCancelAction();
  };

  /** PLAY AUDIO **/
  const playAudio = () => {
    if (audioURL) {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioURL);
      }
      audioRef.current.play();
      setIsPlaying(true);

      audioRef.current.onended = () => setIsPlaying(false);
    }
  };

  /** Waveform drawing **/
  const drawWaveform = () => {
    if (!canvasRef.current || !analyserRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!isRecording) return; // stop drawing when recording stops

      requestAnimationFrame(draw);

      analyserRef.current!.getByteTimeDomainData(dataArray);

      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = "#4ade80"; // Green waveform

      ctx.beginPath();
      const sliceWidth = (canvas.width * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0; // normalized around 1
        const y = (v * canvas.height) / 2;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    draw();
  };

  return (
    <div>
      <IonItem>
        <IonAvatar
          role="button"
          aria-label="open recording tab to record a voice note"
          aria-controls="recording-tab"
          aria-haspopup={true}
          aria-expanded={openRecordTab}
          onClick={() => setOpenRecordTAB(!openRecordTab)}
        >
          <IonIcon icon={mic} />
        </IonAvatar>
      </IonItem>

      <IonModal
        id="recording-tab"
        isOpen={openRecordTab}
        onDidDismiss={() => setOpenRecordTAB(false)}
      >
        <IonContent className="ion-padding">
          <IonItem>
            <IonIcon
              slot="end"
              role="button"
              aria-label="close"
              onClick={() => setOpenRecordTAB(false)}
              icon={closeCircle}
            />
          </IonItem>
          <h3>Record Voice Note</h3>
          <div>
            <div style={{ display: "flex" }}>
              <div style={{width: "80%"}}>
                <canvas
                  ref={canvasRef}
                  width={300}
                  height={80}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    background: "#000",
                    marginBottom: "12px",
                  }}
                />
              </div>
              <div>
                {/* AUDIO PLAYBACK */}
                {audioURL && !isPlaying && (
                  <IonButton
                    fill="clear"
                    aria-label="play voice note"
                    onClick={playAudio}
                  >
                    <IonIcon icon={playSharp} />
                  </IonButton>
                )}
                {audioFile && audioURL && (
                  <IonButton
                    fill="clear"
                    aria-label="add voice recording"
                    title="add voice recording"
                    onClick={() => {
                      setOpenRecordTAB(false);
                      onCompletion({
                        file: audioFile,
                        objectUrl: audioURL,
                      });
                    }}
                  >
                    <IonIcon icon={checkmarkSharp} />
                  </IonButton>
                )}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {/* RECORDING CONTROLS */}
              {!isRecording && (
                <IonButton
                  fill="clear"
                  aria-label="start recording voice note"
                  title="start recording voice note"
                  onClick={startRecording}
                >
                  <IonIcon icon={micSharp} />
                </IonButton>
              )}

              {isRecording && !isPaused && (
                <IonButton
                  fill="clear"
                  aria-label="pause recording"
                  title="pause voice recording"
                  onClick={pauseRecording}
                >
                  <IonIcon icon={pauseSharp} />
                </IonButton>
              )}

              {isRecording && isPaused && (
                <IonButton
                  fill="clear"
                  aria-label="resume recording"
                  title="resume recording"
                  onClick={resumeRecording}
                >
                  <IonIcon icon={recordingSharp} />
                </IonButton>
              )}

              {isRecording && (
                <IonButton
                  fill="clear"
                  aria-label="stop"
                  title="stop recording"
                  onClick={stopRecording}
                >
                  <IonIcon icon={stopSharp} />
                </IonButton>
              )}
            </div>
            <div>{formatTimeInterval(durationTime)}</div>
          </div>
        </IonContent>
      </IonModal>
    </div>
  );
};
