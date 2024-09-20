import { Workbook } from 'exceljs';
export type alignment =
	| 'distributed'
	| 'justify'
	| 'center'
	| 'left'
	| 'right'
	| 'fill'
	| 'centerContinuous'
	| undefined;
export type ExportTypeViewReturn = {
	sheetName: string;
	infoHeader: string[][];
	dataHeader: string[];
	dataModel: {
		key: string;
		width?: number;
		style: {
			alignment: {
				horizontal: alignment;
			};
		};
	}[];
	data?: any[];
	rows?: number;
	align_header?: alignment;
	height?: number;
};

export function InitExport(type: string, exportParams: ExportTypeViewReturn) {
	let fileExported = null;
	switch (type) {
		case 'XLSX':
			fileExported = ExportXlsx(exportParams);
			break;
	}

	return fileExported;
}

function ExportXlsx(exportParams: ExportTypeViewReturn) {
	if (typeof exportParams.rows == 'undefined' || exportParams.rows == null) {
		exportParams.rows = 8;
	}
	if (
		typeof exportParams.height == 'undefined' ||
		exportParams.height == null
	) {
		exportParams.height = 35;
	}
	if (
		typeof exportParams.align_header == 'undefined' ||
		exportParams.align_header == null
	) {
		exportParams.align_header = 'center';
	}
	const workbook = new Workbook();
	let sheet = workbook.addWorksheet(exportParams.sheetName);
	let infoSheetHeader = exportParams.infoHeader;
	sheet.addRows(infoSheetHeader);
	sheet.getRow(exportParams.rows).height = exportParams.height;
	sheet.getRow(exportParams.rows).alignment = {
		vertical: 'middle',
		horizontal: exportParams.align_header,
	};
	sheet.getRow(exportParams.rows).font = { name: 'Calibri', size: 11 };
	sheet.getRow(exportParams.rows).values = exportParams.dataHeader;
	sheet.columns = exportParams.dataModel;
	if (exportParams.data) {
		sheet.addRows(exportParams.data);
	}
	sheet.getRow(exportParams.rows).alignment = {
		vertical: 'middle',
		horizontal: exportParams.align_header,
	};
	return workbook.xlsx.writeBuffer();
}
