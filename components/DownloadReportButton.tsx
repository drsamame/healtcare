'use client';
import React from 'react';
import { Button } from './ui/button';
import { ReportTypeNames } from '@/constants';
import { ExportTypeView } from '@/lib/export.params';
import { InitExport } from '@/lib/exporter';
import { downloadFile, getServicesPrices } from '@/lib/utils';

export type IReportData = {
	specialty: string;
	schedule: Date;
	status: string;
	patient: {
		name: string;
		phone: string;
	};
};

export type IReportDataFiltered = IReportData & {
	cost: number;
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

			const filteredData: IReportDataFiltered[] = (dataTable ?? []).reduce(
				(filtered, option) => {
					if (option.status === 'scheduled') {
						const item = {
							...option,
							name: option?.patient.name,
							phone: option?.patient.phone,
							cost: getServicesPrices(option.specialty).price,
						};
						filtered.push(item);
					}
					return filtered;
				},
				[] as IReportDataFiltered[]
			);

			exportParams.data = filteredData;
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
