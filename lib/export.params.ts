import { ReportTypeNames } from '@/constants';
import { formatDateTime } from './utils';
import type { ExportTypeViewReturn, alignment } from '@/lib/exporter';

type ExportProps = {
	reportName: string;
	generateDate: Date;
};


export async function ExportTypeView(params: ExportProps) {
	if (params.reportName == ReportTypeNames.APPOIMENTSREPORT) {
		return ParamsAppoiment(params);
	} else {
		throw new Error('No se ha encontrado el tipo de reporte especificado.');
	}
}

export async function ParamsAppoiment(
	params: ExportProps
): Promise<ExportTypeViewReturn> {
	let sheetName = ReportTypeNames.APPOIMENTSREPORT;
	let infoHeader = [
		['Reporte:', params.reportName],
		['Generado el:', `${formatDateTime(params.generateDate).dateOnly}`],
	];
	let dataHeader = ['Nombres', 'Celular', 'Servicio', 'Costo', 'Fecha de cita'];
	let dataModel = [
		{
			key: 'name',
			width: 60,
			style: { alignment: { horizontal: 'left' as alignment } },
		},
		{
			key: 'phone',
			width: 30,
			style: { alignment: { horizontal: 'left' as alignment } },
		},
		{
			key: 'specialty',
			style: { alignment: { horizontal: 'left' as alignment } },
		},
		{
			key: 'cost',
			width: 15,
			style: { alignment: { horizontal: 'left' as alignment } },
		},
		{
			key: 'schedule',
			width: 25,
			style: { alignment: { horizontal: 'left' as alignment } },
		},
	];
	return {
		sheetName,
		infoHeader,
		dataHeader,
		dataModel,
	};
}
