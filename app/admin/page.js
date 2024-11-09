"use client"
import React from 'react'
import '../globals.css'
import { useState,useEffect } from 'react'
import { resolve } from 'styled-jsx/css'
import Link from 'next/link'
export default function Admin() {
    let [showEdit,setShowEdit]=useState(false)
    let [showCreate,setShowCreate]=useState(false)
    // let [editData,setEditData]=useState({title:"",desc:"",date:"",image:""})
    // let [createData,setCreateData]=useState({title:"",desc:"",date:"",image:""})
    let [editData,setEditData]=useState({title:"",desc:"",date:"",image:"",metatitle:"",metadesc:"",video_url:"",tags:""})
    let [createData,setCreateData]=useState({title:"",desc:"",date:"",image:"",metatitle:"",metadesc:"",video_url:"",tags:""})
    let [image,setImage]=useState("website.jpg");
    let [saveAs,setSaveAs]=useState(false);
    let [isRequired,setRequired]=useState(true)
    let [tempBlog,setTempBlog]=useState([])
    async function  fetchData(){
        let response= await fetch("http://localhost:5000")
        let data=await response.json()
        if(response.ok){
          // console.log(data)
          setBlogs(data);
          setTempBlog(data)
        }
        else{
          console.log("error")
        }
  
      }

    async function createBlog(){
        console.log(image)
        let formData=new FormData();
        formData.append('title',createData.title);
        formData.append("desc",createData.desc);
        formData.append("image",image);
        formData.append('date',createData.date)
        formData.append('metatitle',createData.metatitle)
        formData.append('metadesc',createData.metadesc)
        formData.append('video_url',createData.video_url);
        formData.append('saveAs',saveAs)
        formData.append('tags',createData.tags)
        let response=await fetch("http://localhost:5000/upload",{
        // let response=await fetch("http://localhost:3000/api",{
            method:"POST",
            body:formData,
        })
        let data=await response.json();
        if(response.ok){
            console.log(data)
            fetchData()
        }
        else{
        }
    }

    function storeCreationData(e){
        e.preventDefault();
        setShowCreate(false)
        setCreateData({title:"",desc:"",date:"",image:"",metatitle:"",metadesc:"",video_url:"",tags:""})
        createBlog();


    }
    function handleImage(e){
        let file=e.target.files[0];
        console.log(file)
        setImage(file)
    }

    function fillBlogData(id){
        let data=blogs.find(blog => blog.id==id)
        // console.log(data)
        setEditData({title:data.Title?data.Title:"",desc:(data.Description)?data.Description:"",date:data.Date,id:id,metatitle:data.meta_title?data.meta_title:"",metadesc:data.meta_description?data.meta_description:"",video_url:data.video_url?data.video_url:"",tags:data.tags?data.tags:""})
        setImage(data.image)
        setRequired(false)
        // setEditData({...image,title:data.Title,desc:data.Description,data:data.date})
    }

    async function deleteBlog(id,i){
        // const response = await fetch(`/api?id=${id}`, {
        const response = await fetch(`http://localhost:5000?id=${id}`, {
            method: 'DELETE',
          });
        
          const data = await response.json();
          console.log(data)
          if (response.ok) {
            // console.log('Delete successful:', data);
            fetchData();
          } else {
            console.error('Delete failed:', data.message);
          }


        

        
    }
    async function storeEditableData(e){
        e.preventDefault();
        setShowEdit(false)
        // createBlog()
        let formData=new FormData();
        console.log(image)
        formData.append('title',editData.title);
        formData.append("desc",editData.desc);
        formData.append('image',image);
        formData.append('date',editData.date)
        formData.append('id',editData.id)
        formData.append('metatitle',editData.metatitle)
        formData.append('metadescription',editData.metadesc)
        formData.append("video_url",editData.video_url)
        formData.append("tags",editData.tags)
    
        // formData.append('editId',editId)
        // for(let data of formData){
        //     console.log(data[1])
        // }
        let response=await fetch("http://localhost:5000/edit",{
        // let response=await fetch("http://localhost:3000/api",{
            method:"PUT", 
            // body:JSON.stringify({...editData,image:"/_next/static/media/blog1.6f373601.jpg"})
            body:formData,
        })

        let data=await response.json();
        console.log(data)
        fetchData()
        setRequired(true);

        setEditData({title:"",desc:"",date:"",image:"",metatitle:"",metadesc:"",video_url:"",tags:""})
    }
    function setEditForm(e) {
        // console.log({...editData, // Spread the existing state

        //     [e.target.name]: e.target.value})
        // console.log(e.target.name)
        setEditData({
            ...editData, // Spread the existing state
            [e.target.name]: e.target.value // Dynamically update the key
        });
        // console.log({ ...editData, [e.target.name]: e.target.value });
    }
    function setCreateForm(e) {
        setCreateData({
            ...createData, // Spread the existing state
            [e.target.name]: e.target.value // Dynamically update the key
        });
    }


let [blogs,setBlogs]=useState([])
  useEffect(()=>{
    
    fetchData();
  },[])
    

  async function publishBlog(id){
    let response=await fetch("http://localhost:5000/publish?id="+id);
    let data=await response.json()
    if(response.ok){
        fetchData()
    }
  }

  async function draftBlog(id){
    let response=await fetch("http://localhost:5000/draft?id="+id);
    let data=await response.json()
    if(response.ok){
        fetchData()
    }
  }
  function filterBlog(e){
    console.log(tempBlog)
    // setBlogs(tempBlog)
    console.log(e.target.value)
    // if(e.target.value=="publish"){
        let filterd=tempBlog.filter((blog)=>{
            // fetchData()
            console.log(blog.status)
            if(e.target.value=="all"){
                return tempBlog;
            }
            else{
                return blog.status==e.target.value;

            }
        })
    
    setBlogs(filterd)
  }
  return (
    <>
    <div className='rounded-md flex justify-center h-screen items-center px-8 flex-col gap-y-5'>
    <select className="bg-white text-black px-6 py-2 rounded-full font-bold self-end" onChange={(e)=>{filterBlog(e)}}>
        <option value="">-- Filter --</option>
        <option value="publish">Publish</option>
        <option value="draft">Draft</option>
        <option value="all">All Blogs</option>
    </select>
        <table className='border-2 border-collapse w-full max-w-[1200px]' cellPadding={10}>
            <tbody>
                <tr className='border'>
                    <th className='border'>Blog Title</th>
                    <th className='border'>Created At</th>
                    <th className='border'>Status</th>
                    <th className='border'>Operations</th>
                </tr>
                {/* {console.log(editData)} */}
            {blogs.map((blog,i)=>{
                // {console.log(URL.createObjectURL(blog.))}
                return <tr key={i}>
                <td className='border text-center'>{blog.Title}</td>
                <td className='border text-center'>{blog.Date}</td>
                <td className='border text-center'>{(blog.status=="publish"?"Publised":"Draft")}</td>
                <td className='flex gap-4 border justify-center max-[900px]:flex-col'>
                    <button className='border p-4 py-1 rounded-full' onClick={()=>{setShowEdit(true); fillBlogData(blog.id)}}>Edit</button>
                    <button className='border p-4 py-1 rounded-full' onClick={()=>{deleteBlog(blog.id,i)}}>Delete</button>
                    <button className='border p-4 py-1 rounded-full' onClick={()=>{(blog.status=="publish")?draftBlog(blog.id):publishBlog(blog.id)}}>{(blog.status=="publish")?"Draft":"Publish"}</button>
                </td>
            </tr>
            })}
               
                <tr>
                    <td></td>
                    <td className='row-span-2 text-center addBtn' colSpan={1}>
                        <button className='border p-4 py-1 rounded-full ' onClick={()=>{setShowCreate(true)}}>Add</button>
                        
                    </td>
                </tr>
            </tbody>
        </table>
    </div>


    <div className={`editForm absolute top-1/2 left-1/2 transformCustom h-[80%] overflow-y-auto bg-black  border-2  p-6 rounded-lg border-white ${showEdit?"flex flex-col":"hidden"} w-full max-w-[600px]`}>
        <h3 className='text-center mb-4 text-[1.6rem]'>Editing Mode</h3>
        <form action="" className='flex flex-col gap-4' onSubmit={(e)=>{storeEditableData(e)}}>
        <input required type="text" name='title' id='title' placeholder='Enter Blog Title' onChange={(e)=>{setEditForm(e)}} value={editData.title}  className='p-2 text-white outline-none bg-transparent border-white border  px-6 rounded-md' />
        <input required type="text" name='desc' id='desc' placeholder='Enter Blog Description' onChange={(e)=>{setEditForm(e)}} value={editData.desc}  className='p-2 text-white outline-none bg-transparent border-white border  px-6 rounded-md' />
        <input required type="date" name='date' id='data' placeholder='' className='p-2 text-white outline-none bg-transparent border-white border  px-6 rounded-md' onChange={(e)=>{setEditForm(e)}} value={editData.date}  />
        <input required type="text" name='metatitle' onChange={(e)=>{setEditForm(e)}} value={editData.metatitle} id='title' placeholder='Enter Meta Title For Blog'  className='p-2 text-white outline-none bg-transparent border-white border  px-2 rounded-md' />
        <textarea required name='metadesc' rows="2" onChange={(e)=>{setEditForm(e)}} value={editData.metadesc} id='desc' placeholder='Enter Meta Description For Blog' className='p-2 text-white outline-none bg-transparent border-white border  px-2 rounded-md'></textarea>
        <input type="text" name='video_url' onChange={(e)=>{setEditForm(e)}} value={editData.video_url} id='title' placeholder='Enter youtube video url to add on blog'  className='p-2 text-white outline-none bg-transparent border-white border  px-2 rounded-md' />
        <input required type="text" name='tags' onChange={(e)=>{setEditForm(e)}} value={editData.tags} id='tags' placeholder='Enter Tags'  className='p-2 text-white outline-none bg-transparent border-white border  px-2 rounded-md' />
        <input  required={isRequired} hidden type="file" name='image1' id='image1' onChange={(e)=>{handleImage(e)}}  placeholder='' className='p-2 text-white outline-none bg-transparent border-white border  px-6 rounded-md'    />
        <label htmlFor="image1" className='p-2 text-white outline-none bg-transparent border-white border  px-6 rounded-md text-center'>{}{image?"Change Image":"Upload Image"}</label>
        <input required type="submit"  value={"Edit To Blog"} className='p-2 text-black font-bold outline-none bg-transparent border-white border  px-6 rounded-md bg-white' />
        <input required type="button"  value={"Close"} className='p-2 text-black font-bold outline-none bg-transparent border-white border  px-6 rounded-md bg-white' onClick={()=>{setShowEdit(false)}} />
        </form>
    </div> 







    <div className={`createForm fixed top-1/2 left-1/2 transformCustom h-[80%] overflow-y-auto bg-black  border-2  p-6 rounded-lg border-white ${showCreate?"flex flex-col":"hidden"} w-full max-w-[600px]`}>
        <h2 className='text-center mb-4 text-[1.6rem]'>Creating Mode</h2>
        <form action="" className='flex flex-col gap-2' onSubmit={(e)=>{storeCreationData(e)}}>
        <input required type="text" name='title' onChange={(e)=>{setCreateForm(e)}} value={createData.title} id='title' placeholder='Enter Blog Title'  className='p-2 text-white outline-none bg-transparent border-white border  px-2 rounded-md' />
        {/* <input required type="text" name='desc' onChange={(e)=>{setCreateForm(e)}} value={createData.desc} id='desc' placeholder='Enter Blog Description' className='p-2 text-white outline-none bg-transparent border-white border  px-6 rounded-md' /> */}
        <textarea required name='desc' rows="5" onChange={(e)=>{setCreateForm(e)}} value={createData.desc} id='desc' placeholder='Enter Blog Description' className='p-2 text-white outline-none bg-transparent border-white border  px-2 rounded-md'></textarea>
        <input required type="date" name='date' onChange={(e)=>{setCreateForm(e)}} value={createData.date} id='data' placeholder='' className='p-2 text-white outline-none bg-transparent border-white border  px-2 rounded-md' />
        <input required type="file" name='image' id="image2" onChange={(e)=>{handleImage(e)}} placeholder='' hidden className='  p-2 text-white outline-none bg-transparent border-white border  px-2 rounded-md' />
        <input required type="text" name='metatitle' onChange={(e)=>{setCreateForm(e)}} value={createData.metatitle} id='title' placeholder='Enter Meta Title For Blog'  className='p-2 text-white outline-none bg-transparent border-white border  px-2 rounded-md' />
        <textarea required name='metadesc' rows="2" onChange={(e)=>{setCreateForm(e)}} value={createData.metadesc} id='desc' placeholder='Enter Meta Description For Blog' className='p-2 text-white outline-none bg-transparent border-white border  px-2 rounded-md'></textarea>
        <input required type="text" name='video_url' onChange={(e)=>{setCreateForm(e)}} value={createData.video_url} id='title' placeholder='Enter youtube video url to add on blog'  className='p-2 text-white outline-none bg-transparent border-white border  px-2 rounded-md' />
        <input required type="text" name='tags' onChange={(e)=>{setCreateForm(e)}} value={createData.tags} id='tags' placeholder='Enter Tags'  className='p-2 text-white outline-none bg-transparent border-white border  px-2 rounded-md' />
        <label htmlFor="image2" className='p-2 text-white outline-none bg-transparent border-white border  px-6 rounded-md text-center'>{showEdit?"Change Image":"Upload image"}</label>

        <div className='flex justify-around gap-5 '>
        <input required type="submit"  value={"Publish"} className='p-2 text-black font-bold outline-none bg-transparent border-white border  px-6 rounded-md w-1/2 bg-white' onClick={()=>{setSaveAs(true)}} />
        <input required type="submit"  value={"Draft"} className='p-2 text-black font-bold outline-none bg-transparent border-white border bg-white  px-6 rounded-md w-1/2' onClick={()=>{setSaveAs(false)}}/>

        </div>
        <input required type="button"  value={"Close"} className='font-bold p-2 outline-none bg-transparent border-white border  px-6 rounded-md text-black bg-white' onClick={()=>{setShowCreate(false)}} />
        </form>
    </div> 

    {/* <Link href="http://localhost:3000" className="bg-white text-black fixed bottom-10 right-10 px-6 py-2 rounded-full font-bold">Blog</Link> */}
    <a href="http://localhost:3000" className="bg-white text-black fixed bottom-10 right-10 px-6 py-2 rounded-full font-bold">Blog</a>

    </>
  )
}
