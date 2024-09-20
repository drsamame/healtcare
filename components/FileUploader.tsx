'use client';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

interface Props {
	files: File[] | undefined;
	onChange: (files: File[]) => void;
	formats?: string[] | undefined;
}

export const FileUploader = ({ files, onChange, formats }: Props) => {
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			onChange(acceptedFiles);
		},
		[onChange]
	);
	const acceptedFormats = formats?.reduce<Record<string, []>>(
		(result, item) => {
			result[item] = [];
			return result;
		},
		{}
	);
	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: acceptedFormats,
	});

	return (
		<div {...getRootProps()} className="file-upload">
			<input {...getInputProps()} />
			{files && files?.length > 0 ? (
				<>
					<Image
						src="/assets/icons/upload.svg"
						alt="upload"
						width={40}
						height={40}
					/>
					<div className="file-upload_label">
						<p className="text-14-regular">{files[0].name}</p>
					</div>
				</>
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
