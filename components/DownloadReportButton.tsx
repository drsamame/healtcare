'use client';
import React from 'react';
import { Button } from './ui/button';
import { ReportTypeNames } from '@/constants';
import { ExportTypeView } from '@/lib/export.params';
import { InitExport } from '@/lib/exporter';
import { downloadFile } from '@/lib/utils';

export type IReportData = {
	specialty: string;
	schedule: Date;
	status: string;
	patient: {
		name: string;
		phone: string;
	};
};

function DownloadReportButton({
	dataTable,
}: {
	dataTable: Array<IReportData> | undefined;
}) {
	const downloadPDF = async () => {
		try {
			let exportParams = await ExportTypeView({
				reportName: ReportTypeNames.APPOIMENTSREPORT,
				generateDate: new Date(),
			});
			console.log(dataTable)
			exportParams.data = dataTable;
			exportParams.rows = 4;
			let file = await InitExport('XLSX', exportParams);
			await downloadFile(
				`${ReportTypeNames.APPOIMENTSREPORT}.xlsx`,
				new Blob([file!])
			);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="flex w-full justify-start">
			<Button
				variant="secondary"
				className="shad-gray-btn"
				onClick={downloadPDF}
			>
				Descargar Reporte
			</Button>
		</div>
	);
}

export default DownloadReportButton;
