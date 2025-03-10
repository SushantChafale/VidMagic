
import React, { useState } from 'react';
import { generateVideo, BASE_URL } from '../services/api';
import { Rings } from 'react-loader-spinner'
function Account() {
  const [inputText, setInputText] = useState('');
  const [generatedVideo, setGeneratedVideo] = useState(null);
 const [loader,setLoader]=useState(false);
  const handleGenerateVideo = async () => {
    
    setGeneratedVideo(null);
   setLoader(true);
    try {
      const videoUrl = await generateVideo(inputText);
      setLoader(false);
      setGeneratedVideo(videoUrl);
      console.log("url",videoUrl);
    } catch (error) {
      setLoader(false);
      console.error('Error generating video:', error);
    }
  };
  return (
  <div className='w-full h-screen flex'>
    <div className='w-[50%] h-[100%] bg-[#ffffff]  flex justify-center items-center'>
        <div className="flex flex-col items-center text-black text-2xl">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className='px-10 p-10 border rounded-lg w-[600px] h-[400px] bg-gradient-to-r from-violet-300 to-violet-300'
            placeholder='Enter Text...'
          />
          <button
            onClick={handleGenerateVideo}
            className='w-[200px] h-[50px] bg-[#4ade80] border hover:bg-[#6d28d9] '
            type='submit'
          >
            Generate Video
          </button>
        </div>
        
    </div>
    <div className='w-[50%] h-[100%] flex justify-center items-center bg-gradient-to-r from-violet-600 to-violet-600'>
    <Rings
  visible={loader}
  height="150"
  width="150"
  color="white"
  ariaLabel="rings-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
        {generatedVideo && (
          <div>
            <video width='600' height='600'controls>
            <source src={`http://localhost:5000/static/final_video.mp4`}/>
            </video>
           
          </div>
        )}
    </div>
  </div>

  
  );
}

export default Account;





