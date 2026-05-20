'use client'
import React, { useState } from 'react';
import { CustomModal } from '@/app/component/Modal';
import { userProfile, profilePhoto } from '@/store/store';
import { IoClose } from 'react-icons/io5';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import Cookies from 'js-cookie';
import verify from '../../asset/verify.svg';

interface FileProps {
  name: string;
  type: string;
  size: number;
  base64: string;
}

export const PhotoUpload = () => {
  const { setProfile, profile } = userProfile((state) => ({
    setProfile: state.setProfile,
    profile: state.profile,
  }));
  const userToken = Cookies.get('token') as string;

  const [files, setFiles] = useState<FileProps[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        // Additional validation to reject SVG and GIF files
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        const fileExtension = file.name.toLowerCase().split('.').pop();
        const isAllowedExtension = ['jpg', 'jpeg', 'png'].includes(fileExtension || '');
        
        if (!allowedTypes.includes(file.type) || !isAllowedExtension) {
          alert(`File ${file.name} is not supported. Only PNG, JPG, and JPEG files are allowed.`);
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          setFiles([
            {
              name: file.name,
              type: file.type,
              size: file.size,
              base64: reader.result as string,
            },
          ]);
        };
        reader.readAsDataURL(file);
      });
    },
    noClick: true,
    noKeyboard: true,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxSize: 1 * 1024 * 1024, // 1MB limit
    minSize: 1024, // 1KB minimum
    onDropRejected: (rejectedFiles) => {
      rejectedFiles.forEach(({ file, errors }) => {
        errors.forEach((error) => {
          if (error.code === 'file-too-large') {
            alert(`File ${file.name} is too large. Maximum size is 1MB.`);
          } else if (error.code === 'file-too-small') {
            alert(`File ${file.name} is too small. Minimum size is 1KB.`);
          } else if (error.code === 'file-invalid-type') {
            alert(`File ${file.name} has an invalid type. Only images are allowed.`);
          } else {
            alert(`Error with file ${file.name}: ${error.message}`);
          }
        });
      });
    },
  });

  const closeModal = () => {
    if (profile) setProfile();
    setFiles([]);
    setUploadSuccess(false);
    setApiError(null);
  };


  const { profileurl, setProfileurl } = profilePhoto((state) => ({
    profileurl: state.profileurl,
    setProfileurl: state.setProfileurl,
  }));

  const uploadImage = async () => {
    if (files.length === 0) return;

    const base64Image = files[0].base64;
    setUploading(true);
    setApiError(null); // Clear any previous errors

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/change_profile_image/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${userToken}`,
        },
        body: JSON.stringify({
          profile_image: base64Image,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setUploadSuccess(true);
        setProfileurl(responseData?.profile_image_url);
      } else {
        // Handle API errors
        const errorMessage = responseData?.message || responseData?.error || `Upload failed with status: ${response.status}`;
        setApiError(errorMessage);
        console.error('Failed to upload image:', responseData);
      }
    } catch (error) {
      // Handle network errors
      const errorMessage = error instanceof Error ? error.message : 'Network error occurred';
      setApiError(errorMessage);
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
      setFiles([]);
    }
  };

  return (
    <CustomModal isOpen={profile}>
      {uploadSuccess ? (
        <div className="flex min-h-[280px] flex-col items-center justify-center gap-6 px-4 py-8 text-center">
          <Image src={verify} width={60} height={60} alt="Success" />
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-[#353131]">Photo updated</h2>
            <p className="text-sm leading-6 text-[#353131]">
              Your profile photo has been uploaded successfully.
            </p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="w-full max-w-xs rounded-md bg-[#FCDFD4] p-4 hover:bg-[#F25E26] hover:text-white"
          >
            Done
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-end">
            <IoClose className="cursor-pointer text-xl" onClick={closeModal} />
          </div>
          <label htmlFor="upload" {...getRootProps()}>
            <input {...getInputProps()} id="upload" />
            <div className="flex w-full flex-col items-center justify-center align-middle">
              <p>
                <span className="brand1">Click to upload</span> or drag and drop
              </p>
              <p className="text-sm text-gray-300">PNG, JPG, JPEG (max 1MB, min 1KB)</p>
            </div>
            <div className="my-4 flex w-full items-center justify-center gap-3">
              <hr className="w-full" />
              <p className="text-gray-300">OR</p>
              <hr className="w-full" />
            </div>

            {files.length > 0 && (
              <div className="mt-4 text-center">
                <div className="mb-4">
                  <Image
                    src={files[0].base64}
                    alt="Preview"
                    width={192}
                    height={192}
                    className="mx-auto max-h-48 max-w-48 rounded-lg object-cover"
                  />
                </div>
                <div className="text-sm text-gray-400">
                  {files[0].name} ({(files[0].size / 1024).toFixed(1)} KB)
                </div>
              </div>
            )}

            <div className="my-2 flex w-full flex-col items-center justify-center">
              <button
                onClick={files.length === 0 ? open : uploadImage}
                disabled={uploading}
                type="button"
                className="rounded-md bg-[#f25e26] px-8 py-4 text-white disabled:opacity-60"
              >
                {uploading ? 'Uploading...' : files.length === 0 ? 'Browse files' : 'Upload'}
              </button>
            </div>
          </label>

          {apiError && (
            <div className="mt-4 text-center">
              <p className="text-sm text-red-600">{apiError}</p>
            </div>
          )}
        </>
      )}
    </CustomModal>
  );
};
