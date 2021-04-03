/* eslint-disable no-undef */
import { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faTimes } from "@fortawesome/free-solid-svg-icons"
import { NavLink } from 'react-router-dom'
import api from '../../services/productAPI'
import cogoToast from 'cogo-toast'

import {useForm} from 'react-hook-form'

const AddProduct = () => {

    document.title = 'Add new product'

    // เรียกใช้ hook สำหรับการอ่านข้อมูลจากฟอร์ม
    const { register, handleSubmit, reset, errors } = useForm()

    // สร้างตัวแปรไว้เก็บ path รูปที่เลือก
    const [imgUrl, setImgUrl] = useState('')

    // สร้างตัวแปรไว้เก็บข้อมูลที่รับใน FormData
    let mydata = {}

    // สร้างฟังก์ชัน onSubmit
    const onSubmit = (data) => {

        console.log(data)

        mydata.title = data.title
        mydata.slug = data.slug
        mydata.description = data.description
        mydata.price = data.price
        mydata.qty = data.qty
        mydata.category = data.category
        mydata.users = data.users

        // สร้าง object formData ไว้สำหรับรับข้อมูลไฟล์
        const formData = new FormData()
        formData.append('data',JSON.stringify(mydata))

        if(data.uploadimg.length){
            formData.append('files.image', data.uploadimg[0])
        }

        // ==========================================================================
        // ส่วนของการบันทึกข้อมูลเข้า API
        // ==========================================================================
        api.addNewProduct(formData).then(res=>{
            console.log(res)

            // Reset field
            reset()

            // Reset Image Field
            setImgUrl('')

            // Show Message 
            cogoToast.success('เพิ่มข้อมูลเรียบร้อยแล้ว', {position: 'top-center', heading:'สถานะการเพิ่มข้อมูล'})
        })

    }

    // ฟังก์ชันแสดงรูปตัวอย่างเมื่อเลือก
    const onImageChange = (e) => {
        const reader = new FileReader()
        reader.onload = e => {
            setImgUrl(e.target.result)
        }
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0])
            console.log(e.target.files[0])
        }
    }

    return (
        <>
            <div className="flex my-6">
                <h1 className="text-2xl text-black pb-6">Add Product</h1>
                <p className="flex-1 text-right">
                    <NavLink to='/reststrapi' className="border-0 px-2 py-1 mb-2 hover:text-blue-600 text-xl"> <FontAwesomeIcon icon={faChevronLeft} /> Back</NavLink>
                </p>
            </div>

            <div className="full">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <form className="p-5 bg-white rounded" onSubmit={handleSubmit(onSubmit)}>
                        <div className="sm:grid sm:grid-cols-5 sm:gap-4">

                            <div className="sm:col-span-4">

                                <div className="px-4 pt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                   <dt className="text-sm font-medium text-gray-500">Title</dt> 
                                   <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <input className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="title" name="title" type="text"
                                        ref={(e) => {
                                            register(e, {required: true})
                                        }}
                                        />
                                        {errors.title && <p className="text-red-500 mt-2">This field is required</p>}
                                    </dd>
                                </div>

                                <div className="px-4 pt-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Slug</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <input className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="slug" name="slug" type="text" ref={(e) => {
                                            register(e, {required: true})
                                        }}
                                        />
                                        {errors.slug && <p className="text-red-500 mt-2">This field is required</p>}
                                    </dd>
                                </div>

                                <div className="px-4 pt-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Description</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <textarea className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" rows="6" id="description" name="description" type="text" ref={() => {register()}}></textarea>
                                    </dd>
                                </div>

                                <div className="px-4 pt-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Price</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <input className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="price" name="price" type="number" ref={(e) => {
                                            register(e, {required: true})
                                        }}
                                        />
                                        {errors.price && <p className="text-red-500 mt-2">This field is required</p>}
                                    </dd>
                                </div>

                                <div className="px-4 pt-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Qty</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <input className="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" id="qty" name="qty" type="number" ref={(e) => {
                                            register(e, {required: true})
                                        }}
                                        />
                                        {errors.qty && <p className="text-red-500 mt-2">This field is required</p>}
                                    </dd>
                                </div>

                                <div className="px-4 pt-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Category</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" name="category" id="category" ref={register({ required: true })}>
                                            <option value="">Select Category</option>
                                            <option value="1">Electronic</option>
                                            <option value="2">Cloth</option>
                                            <option value="3">Mum & Kit</option>
                                        </select>
                                        {errors.category && <p className="text-red-500 mt-2">This field is required</p>}
                                    </dd>
                                </div>

                                <div className="px-4 pt-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Create by</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"  name="users" id="users" ref={register({ required: true })}>
                                            <option value="">Select User</option>
                                            <option value="1">iamsamit</option>
                                            <option value="2">john</option>
                                            <option value="3">sean</option>
                                        </select>
                                        {errors.users && <p className="text-red-500 mt-2">This field is required</p>}
                                    </dd>
                                </div>

                                <div className="px-4 pt-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                    &nbsp;
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <button type="submit" className="bg-green-500 rounded-md px-4 py-2 my-2 text-white hover:bg-green-600 text-xl">บันทึกข้อมูล</button>&nbsp;
                                    </dd>
                                </div>

                            </div>

                            <div className="sm:col-span-1">
                                <div className="mt-5 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">

                                    <div className="space-y-1 text-center">
                                        
                                        {
                                            imgUrl !== '' ?
                                            <div>
                                                <button type="button" className="text-md mb-2 w-full text-right hover:text-red-500" onClick={()=>setImgUrl('')}>
                                                        <FontAwesomeIcon icon={faTimes} /> remove
                                                </button>
                                                <img className="w-full mx-auto rounded-md" id="target" src={imgUrl} alt=""/>
                                            </div>
                                            :
                                            <span></span>
                                        }

                                         <div className="text-sm text-gray-600">
                                             <label htmlFor="uploadimg" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">

                                                {
                                                    imgUrl === '' ?
                                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    :
                                                    <span></span>
                                                }

                                                <div className="w-full my-2 mx-auto">Upload Image</div>

                                                <input id="uploadimg" name="uploadimg" type="file" accept='images/*' className="sr-only" onChange={onImageChange} ref={(e)=>{
                                                    register(e)
                                                    uploadimg.current = e
                                                }}/>

                                            </label>
                                         </div>
                                         <p className="text-xs text-gray-500">
                                            PNG, JPG, GIF up to 2MB
                                        </p>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>


        </>
    )
}

export default AddProduct
