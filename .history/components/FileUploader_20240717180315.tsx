'use client';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { convertFileToUrl } from '@/lib/utils';

interface Props {
	files: File[] | undefined;
	onChange: (files: File[]) => void;
}

export const FileUploader = ({ files, onChange }: Props) => {
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			onChange(acceptedFiles);
		},
		[onChange]
	);
	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	return (
		<div {...getRootProps()} className="file-upload">
			<input {...getInputProps()} />
			{files && files?.length > 0 ? (
				<Image
					src={convertFileToUrl(files[0])}
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
					<div className="file-upload_label">
						<p className="text-14-regular">
							<span className="text-green-500">click para subir</span> o
							arrastra y suelta
						</p>
						<p>SVG, PNG, JPG o Gif (max 800x400)</p>
					</div>
				</>
			)}
		</div>
	);
};
