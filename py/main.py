from pocketsphinx import LiveSpeech, AudioFile
import os

# Set paths to acoustic model, dictionary, and language model
# Ensure these files are downloaded and paths are correct
acoustic_model_path = "./en-us-phone.lm.bin"
dictionary_path = "cmudict-en-us.dict"

# Example: Speech-to-text on a live microphone stream (real-time)
speech = LiveSpeech(
    verbose=True,
    audio_device=None,  # Use the default audio device
    buffer_size=2048,  # Buffer size for real-time recognition
    sampling_rate=16000,  # Audio sampling rate (must match your mic/input)
    hmm=os.path.join(acoustic_model_path, 'en-us'),
    dic=os.path.join(dictionary_path, 'cmudict-en-us.dict')
)

# Listen and print transcriptions from the live microphone
for phrase in speech:
    print("Recognized Text:", phrase)

# Example: Transcribing an audio file (e.g., .wav format)
def transcribe_audio(audio_file_path):
    audio = AudioFile(
        audio_file=audio_file_path,
        hmm=os.path.join(acoustic_model_path, 'en-us'),
        dic=os.path.join(dictionary_path, 'cmudict-en-us.dict')
    )
    
    # Process the audio file and print recognized text
    for phrase in audio:
        print("Recognized Text:", phrase)
