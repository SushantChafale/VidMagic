import openai
import re
import os
import urllib.request
import shutil
from gtts import gTTS
from moviepy.editor import *
from flask import Flask, request, jsonify, send_file, send_from_directory
from flask_cors import CORS  
from api_key import API_KEY


app = Flask(__name__)
CORS(app)

# Set your OpenAI API key
openai.api_key = API_KEY

@app.route('/generate-video', methods=['POST'])
def generate_video():
    try:
        data = request.get_json()
        text_prompt = data.get('text_prompt', '')

        paragraphs = re.split(r"[,.]", text_prompt)

        os.makedirs("audio", exist_ok=True)
        os.makedirs("images", exist_ok=True)
        os.makedirs("videos", exist_ok=True)

        i = 1
        for para in paragraphs[:-1]:
            print(f"Processing paragraph: {para}")
            
            response = openai.Image.create(
                prompt=para.strip(),
                n=1,
                size="1024x1024"
            )
            image_url = response['data'][0]['url']
            urllib.request.urlretrieve(image_url, f"images/image{i}.jpg")
            print(f"Saved image to: images/image{i}.jpg")

            tts = gTTS(text=para, lang='en', slow=False)
            tts.save(f"audio/voiceover{i}.mp3")
            print(f"Saved audio to: audio/voiceover{i}.mp3")

            audio_clip = AudioFileClip(f"audio/voiceover{i}.mp3")
            audio_duration = audio_clip.duration

            image_clip = ImageClip(f"images/image{i}.jpg").set_duration(audio_duration)
            text_clip = TextClip(para, fontsize=25, color="white", bg_color="black")
            text_clip = text_clip.set_pos('bottom').set_duration(audio_duration)
            

            clip = image_clip.set_audio(audio_clip)
            video = CompositeVideoClip([clip, text_clip])

            video_path = f"videos/video{i}.mp4"
            video = video.write_videofile(video_path, fps=24)
            print(f"Saved video to: {video_path}")
            
            i += 1

        clips = []
        l_files = os.listdir("videos")
        for file in l_files:
            clip = VideoFileClip(f"videos/{file}")
            clips.append(clip)

        final_video_path ="final_video.mp4"
        
        final_video = concatenate_videoclips(clips, method="compose")
        final_video = final_video.write_videofile(final_video_path)
        print(f"Saved final video to: {final_video_path}")

        shutil.rmtree("audio")
        shutil.rmtree("images")
        shutil.rmtree("videos")
        
        print("Video Path:", final_video_path)
        return jsonify({'videoUrl': final_video_path})
    


    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)})

@app.route('/static/final_video.mp4')
def serve_static():
    base_directory = os.path.abspath(os.path.join(os.path.dirname(__file__)))
    return send_from_directory(base_directory, 'final_video.mp4')

if __name__ == '__main__':
    app.run(debug=True)



#-----------------------------------------------------

# import openai
# import re
# import os
# import urllib.request
# from gtts import gTTS
# from moviepy.editor import *
# from api_key import API_KEY
# from moviepy.config import change_settings
# from requests import get
# import shutil

# # Set your OpenAI API key
# openai.api_key = API_KEY

# # Specify the path to the ImageMagick binary
# image_magick_path = r"C:\Program Files\ImageMagick-7.1.1-Q16\convert.exe"  # Update this path

# # Use the change_settings function to set the ImageMagick binary path
# change_settings({"IMAGEMAGICK_BINARY": image_magick_path})

# # Get user input for the text prompt
# text_prompt = input("What topic do you want to write about: ")

# # # Set the model to use
# # model_engine = "gpt-3.5-turbo-instruct"

# # # Generate text using the GPT-3 model
# # completions = openai.Completion.create(
# #     engine=model_engine,
# #     prompt=text_prompt,
# #     max_tokens=1024,
# #     n=1,
# #     stop=None,
# #     temperature=0.5,
# # )

# # # Print the generated text
# # generated_text = completions.choices[0].text

# # # Save the text in a file
# # with open("generated_text.txt", "w") as file:
# #     file.write(generated_text.strip())

# # print("The Text Has Been Generated Successfully!")

# # # Read the text file
# # with open("generated_text.txt", "r") as file:
# #     text = file.read()

# # Split the text by , and .
# paragraphs = re.split(r"[,.]", text_prompt) #text

# # Create Necessary Folders
# os.makedirs("audio")
# os.makedirs("images")
# os.makedirs("videos")

# # Loop through each paragraph and generate an image for each
# i = 1
# for para in paragraphs[:-1]:
#     response = openai.Image.create(
#         prompt=para.strip(),
#         n=1,
#         size="1024x1024"
#     )
#     print("Generate New AI Image From Paragraph...")
#     image_url = response['data'][0]['url']
#     urllib.request.urlretrieve(image_url, f"images/image{i}.jpg")
#     print("The Generated Image Saved in Images Folder!")

#     # Create gTTS instance and save to a file
#     tts = gTTS(text=para, lang='en', slow=False)
#     tts.save(f"audio/voiceover{i}.mp3")
#     print("The Paragraph Converted into VoiceOver & Saved in Audio Folder!")

#     # Load the audio file using moviepy
#     print("Extract voiceover and get duration...")
#     audio_clip = AudioFileClip(f"audio/voiceover{i}.mp3")
#     audio_duration = audio_clip.duration

#     # Load the image file using moviepy
#     print("Extract Image Clip and Set Duration...")
#     image_clip = ImageClip(f"images/image{i}.jpg").set_duration(audio_duration)

#     # Use moviepy to create a text clip from the text
#     print("Customize The Text Clip...")
#     text_clip = TextClip(para, fontsize=50, color="white")
#     text_clip = text_clip.set_pos('center').set_duration(audio_duration)

#     # Use moviepy to create a final video by concatenating
#     # the audio, image, and text clips
#     print("Concatenate Audio, Image, Text to Create Final Clip...")
#     clip = image_clip.set_audio(audio_clip)
#     video = CompositeVideoClip([clip, text_clip])

#     # Save the final video to a file
#     video = video.write_videofile(f"videos/video{i}.mp4", fps=24)
#     print(f"The Video{i} Has Been Created Successfully!")
    
#     i += 1

# clips = []
# l_files = os.listdir("videos")
# for file in l_files:
#     clip = VideoFileClip(f"videos/{file}")
#     clips.append(clip)

# print("Concatenate All The Clips to Create a Final Video...")
# final_video = concatenate_videoclips(clips, method="compose")
# final_video = final_video.write_videofile("final_video.mp4")

# # Delete directories
# shutil.rmtree("audio")
# shutil.rmtree("images")
# shutil.rmtree("videos")

# print("The Final Video Has Been Created Successfully!")