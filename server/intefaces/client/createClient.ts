export interface cliente {
		id_cliente?: number
		contribuyente: boolean
		razon_social: string
		pais: number
		correo_electronico: string
		tipo_contribuyente?: string
		documento_tipo: string
		nro_documento: number
		celular: number
		fecha_nacimiento: string
		RUC?: string
		tipo_operacion: number
		fantasia: string
}

export interface fichaCliente {
		fecha: string
		nombreServicio: string
		precio: number
}