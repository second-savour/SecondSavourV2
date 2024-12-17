import React from 'react'
import { HiArrowSmallRight } from "react-icons/hi2";
import lemon from   '../assets/lemon_man.png'

function BlogPage() {
  return (
    <div className='min-h-[80vh] flex py-[10%] px-[5%] bg-[#FFF5DB]'>

        <div className=' flex flex-col gap-[3%] '>
            <div className='w-[90%]'>
                <h3> Category of Article </h3>
                <h1 className='mt-[3%]' > Article Title </h1>
                <h3 className='mt-[3%]' >Nutritious, vitamin-filled, citrus delicacies hand-made from repurposed juiced oranges. Made to enjoy in class, on a drive, during study sessions, basically anywhere!
                </h3>

                <div className='group flex mt-[20%] group-hover: cursor-pointer w-[100%]'>
                <div className='opacity-100  ease-in-out duration-300 w-[100%]'>


                
                <div className='flex opacity-100  w-[20%]'><h3 className='mr-[2%]'>Scroll to Read</h3>
                <HiArrowSmallRight />
                </div>

                <div className=' border border-black w-[20%] opacity-0 group-hover:opacity-100  ease-in-out duration-300 translate-y-[4px] '></div>

                </div>
                </div>

                </div>
            </div>
            <img className='object-cover max-w-[50%]' src ={lemon} ></img> 

    </div>
  )
}

export default BlogPage
