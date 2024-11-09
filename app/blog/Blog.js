"use client"
import Image from 'next/image';
import blog1 from '../../public/blog1.jpg'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
export default function Blog({ newId }) {
    let [blogData, setBlogData] = useState([{
        Title: "",
        Description: "",
        Date: "",
        image: "",
    }])
    let [image, setImage] = useState(blog1);
    let id = newId;
    let [video,setVideo]=useState(false);
    // console.log(img)

    // console.log(id)
    useEffect(() => {
        async function fetchData() {
            let response = await fetch("http://localhost:5000/search?id=" + id)
            let data = await response.json();
            setBlogData(data)
            if(data[0].video_url==""){
                setVideo(false)
            } else{
                setVideo(true);
            }
            let blob = new Blob([new Uint8Array(data[0].image.data)], { type: "image/jpeg" })
            let src = URL.createObjectURL(blob)
            setImage(src);

        }
        fetchData()

    }, [])

    function extractVideoId(url) {
        // console.log(url)
        const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|https:\/\/youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
      }
    return (
        <>
            <div className='flex flex-col justify-center gap-4 items-center w-full my-8 p-2'>
                
                <div className='  grid grid-cols-1 max-w-[900px] gap-y-10'>
                    <div className='flex items-center'>
                        <Image
                            src={image}
                            alt="website Development"
                            className=" rounded-lg w-full"
                            width={200}
                            height={100}
                        />
                    </div>


                    <div className='text-left text-white  border-2 border-white p-4 max-w-[900px] rounded-xl'>
                        <h2 className='text-xl font-bold'>{blogData[0].Title}</h2>
                        <p className='font-semibold mb-4'>{blogData[0].Date}</p>
                        <p>{blogData[0].Description}</p>
                    </div>

                </div>

                
                {video && <div className='text-left text-white w-full border-2 border-white max-w-[900px] p-4  rounded-xl flex justify-center items-center'>
                        <iframe width="560" height="400" className='max-[597px]:w-full max-[597px]:h-[300px] max-[400px]:h-[200px]' src={"https://www.youtube.com/embed/"+extractVideoId(blogData[0].video_url?blogData[0].video_url:"")} title="YouTube video player" frameBorder="auto" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>}

                
            </div>
                    <Link href="http://localhost:3000" className="bg-white text-black fixed bottom-10 right-10 px-6 py-2 rounded-full font-bold">Go To Blog List</Link>
        </>
    )
}
