'use client'

import { useUserStore } from '../store/userStore'
import MenuDrawer from '../components/menu-drawer'
import Topbar from '../components/topbar';
import React, { useEffect, useRef, useState } from 'react';
import { userService } from '../../services/api/userService';
import { withRegistrationCheck } from '../components/withRegistrationCheck';

function ProfilePage() {
    const { organizer, setOrganizer, isRegistered, updateRegistered } = useUserStore();
    const modalRef = useRef<HTMLDialogElement | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);

            const objectUrl = URL.createObjectURL(e.target.files[0]);

            setPreviewUrl(objectUrl);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault()

        try {
            setLoading(true)

            if (previewUrl) {
                await handleUpload()
            }

            const response = !isRegistered
                ? await userService.create({
                    id: -2,
                    authId: organizer.authId,
                    name: organizer.name,
                    email: organizer.email || "",
                    photo: organizer.photo || ""
                })
                : await userService.update(organizer);

            updateRegistered(true)

            setOrganizer(response)

            setLoading(false)
            console.log(`register after  is ${isRegistered}`)

        } catch (error) {
            console.log('Failed to update user from page')
        }
    };

    async function getUser() {
        const person = await userService.get(organizer.id)

        if (!person) return;

        setOrganizer({
            ...organizer,
            name: person.name || "",
            email: person.email || "",
            photo: person.photo == "" ? "https://images.pexels.com/photos/1870376/pexels-photo-1870376.jpeg" : person.photo,
        });
    }

    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        setUploading(true);

        try {
            const { url, publicUrl } = await userService.getPresignedUrl();

            await userService.upload(file, url);

            organizer.photo = publicUrl

            await userService.update(organizer);

            setOrganizer(organizer)
        } catch (error) {
            console.log('Upload error:', error);
            alert('An error occurred while uploading');
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => {
        console.log(`register in profile is ${isRegistered}`)

        if (!isRegistered && modalRef.current) {
            modalRef.current.showModal();
        }
        if (organizer.id != -1) {
            getUser()
        }
    }, [isRegistered]);

    useEffect(() => {
        console.log(`previewUrl url is ${previewUrl}`)
    }, [previewUrl]);
    return (
        <>
            <dialog id="my_modal_3" className="modal" ref={modalRef}>
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Please complete registration to proceed</h3>
                </div>
            </dialog>

            <form onSubmit={handleSubmit}>
                <div className="min-h-screen bg-gray-100">
                    <Topbar pageName='Profile' toggleIsVisible={true} avatar={organizer.photo} />
                    <main>
                        <div className="max-w-7xl w-1/2 mx-auto py-6 sm:px-6 lg:px-8">
                            <div className="flex flex-col">
                                <div className="avatar m-4 bg-black opacity-100 hover:opacity-50 w-24 rounded-full">
                                    {previewUrl !== "" ? (
                                        <div className="w-24 rounded-full relative" style={{
                                            backgroundImage: `url(${previewUrl}`,
                                            backgroundSize: 'cover'
                                        }}>
                                            <input type="file" accept="image/*" onChange={handleFileChange} className='cursor-pointer opacity-0 w-24 rounded-full h-full' />
                                            <div className=" absolute z-10 flex items-center justify-center opacity-0 hover:opacity-100" style={{ top: '40px', right: '40px' }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                    <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>) :

                                        <div className="w-24 rounded-full relative" style={{
                                            backgroundImage: `url(${organizer.photo
                                                || "https://images.pexels.com/photos/1870376/pexels-photo-1870376.jpeg"})`,
                                            backgroundSize: 'cover'
                                        }}>
                                            <input type="file" accept="image/*" onChange={handleFileChange} className='cursor-pointer opacity-0 w-24 rounded-full h-full' />
                                            <div className=" absolute z-10 flex items-center justify-center opacity-0 hover:opacity-100" style={{ top: '40px', right: '40px' }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                    <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>}
                                </div>

                                <label className="input input-bordered flex items-center gap-2 m-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70">
                                        <path
                                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                    </svg>
                                    <input type="text" className="grow" placeholder="Username"
                                        value={organizer.name || ""}
                                        onChange={(e) => {
                                            setOrganizer({ ...organizer, name: e.target.value })
                                        }
                                        }
                                    />
                                </label>
                                <label className="input input-bordered flex items-center gap-2 m-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-4 w-4 opacity-70">
                                        <path
                                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                        <path
                                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                    </svg>
                                    <input type="text" className="grow" placeholder="Email" value={organizer?.email || ""}
                                        onChange={(e) => setOrganizer({ ...organizer, email: e.target.value })}
                                    />
                                </label>
                                {loading && <span className="loading loading-dots loading-lg"></span>}
                                <button type="submit" className="btn btn-primary m-4">{uploading
                                    ? 'Uploading...'
                                    : 'Save'}</button>
                            </div>
                            <MenuDrawer isDrawer={true} />
                        </div>
                    </main>
                </div>
            </form>
        </>)
}

export default withRegistrationCheck(ProfilePage);
