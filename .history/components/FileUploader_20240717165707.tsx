'use client';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

interface Props {
	files: File[] | undefined;
	onChange: (files: File[]) => void;
}

export const FileUploader = ({ files, onChange }: Props) => {
	const onDrop = useCallback((acceptedFiles: File[]) => {
		onChange(acceptedFiles);
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<div {...getRootProps()} className="file-upload">
			<input {...getInputProps()} />
			{files && files?.length > 0 ? (
				<Image
					// src={convertFileToUrl(files[0])}
					width={1000}
					height={1000}
					alt="upload image"
					className="max-h-[400px] overflow-hidden object-cover"
				/>
			) : (
				<>
					<Image
						src="/assets/icons/upload.svg"
						alt="upload"
						width={40}
						height={40}
					/>
				</>
			)}
			{isDragActive ? (
				<p>Drop the files here ...</p>
			) : (
				<p>Drag 'n' drop some files here, or click to select files</p>
			)}
		</div>
	);
};
