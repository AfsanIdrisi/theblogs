"use client"
import Image from "next/image";
import blog1 from '../public/blog1.jpg'
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
export default function Home() {
  let [blogs,setBlogs]=useState([])
  useEffect(()=>{
    async function  fetchData(){
      let response= await fetch("http://localhost:5000/")
      let data=await response.json()
      if(response.ok){
        setBlogs(data);
      }
      else{
        console.log("error")
      }

    }


    // let id=1
    
    fetchData();
    // console.log("afs")
  },[])

  
  return (
    <>
    <Head>
      <title>Afsan</title>
    </Head>
    <main className="flex flex-col">
      <div className="bg-black text-white w-full flex justify-center h-screen items-center">
        <div className="flex justify-center max-w-[900px] ">
          <h1 className="text-center text-[150px] max-[570px]:text-[100px]">THE BLOGS</h1>
        </div>
      </div>

<div className="flex justify-center my-10 items-center ">
      <div className="blogContainer grid grid-cols-4 gap-5 p-6 w-full  max-w-[1200px] flex-wrap max-[1200px]:grid-cols-3 max-[900px]:grid-cols-2 max-[680px]:grid-cols-1 max-[1200px] items-center max-[650px]:px-12 max-[430px]:px-6 gap-y-10" >
      {/* <div className="blogContainer flex justify-center gap-5 w-full max-w-[1200px] flex-wrap max-[1200px]:flex-col max-[1200px] items-center max-[650px]:px-12 max-[430px]:px-6 gap-y-10" > */}
        {blogs.map((blog,i)=>{

          if(blog.status=="publish"){
            const blob = new Blob([new Uint8Array(blog.image.data)], { type: 'image/jpeg' });
          let src=URL.createObjectURL(blob);
            return <a href={`/blog?id=${blog.id}`}  key={i} className="blogpost bg-white w-full  h-full max-[1200px]:w-full  rounded-lg text-black p-4 max-[650px]:w-full">
          <div className="w-full">
         <Image
          src={src}
          alt="website Development"
          className=" rounded-lg w-full h-full" 
          width={20}
          height={200}
        /> 
          </div>
          <div>
            <p className="text-[0.9rem]">{blog.Date}</p>
            <h2 className="text-[1rem] font-bold">{blog.Title}</h2>
            <p className="text-[0.9rem] mt-4">{blog.Description.slice(0,100)+"..."}</p>
          </div>
          
        </a>
          }
        })}
          
    

        <a href="http://localhost:3000/admin" className="bg-white text-black fixed bottom-10 right-10 px-6 py-2 rounded-full font-bold">Admin</a>
        
      </div>
</div>
    </main>
    </>
  );
}
