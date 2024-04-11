export interface cliente {
		id_cliente?: number
		contribuyente: boolean
		razonSocial: string
		nacionalidad: number
		correo: string
		tipoContribuyente?: string
		tipoDocumento: string
		numeroDocumento: number
		numeroTelefono: number
		fechaNacimiento: string
		RUC?: string
		tipoOperacion: number
}