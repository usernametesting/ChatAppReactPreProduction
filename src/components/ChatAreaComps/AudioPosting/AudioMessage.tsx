import React, { useState, useRef } from 'react';
import './AudioMessage.css';
import { AudioMessageProps } from '../../../types/Messages/AudioMessageProps';

const AudioMessage: React.FC<AudioMessageProps> = ({ audioUrl, setAudioUrl }) => {
    const [isRecording, setIsRecording] = useState(false);
    // const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioUrl(audioUrl);
                audioChunksRef.current = [];
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (err) {
            console.error('Mikrofon izni alınamadı:', err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            audioChunksRef.current = [];
            setAudioUrl(null);
        }
    };
    const CancelRecording = () => {
        setIsRecording(false);
        audioChunksRef.current = [];
        setAudioUrl(null);

    };



    return (
        <div>
            {!isRecording && !audioUrl &&
                <button onClick={startRecording}>
                    <i className="fa fa-microphone"></i>
                </button>}
            {isRecording && !audioUrl &&
                <button onClick={stopRecording}>
                    <i className="fa fa-stop" style={{ color: 'green', fontSize: '25px' }}></i>
                </button>
            }


            {audioUrl && (
                <div style={{ display: 'flex', }}>
                    <audio controls src={audioUrl}></audio>
                    <button
                        onClick={CancelRecording}
                        style={{ backgroundColor: 'transparent', border: '0' }}
                        className="glyphicon glyphicon-remove">
                    </button>

                </div>
            )}
        </div>
    );
};

export default AudioMessage;
