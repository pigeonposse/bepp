/**
 * Functions for variables.
 *
 * @description Functions for variables.
 */
import type {
	ErrorObject, JSONSchemaType, Schema, 
} from 'ajv'
import Ajv from 'ajv'

export class VarString {

	formatSpaces( string: string, spaceFormat: string = '--' ){
	
		return string.toLowerCase().replace( / /g, spaceFormat )
    
	}
	capitalizeFirstLetter( str: string ) {

		return str.substring( 0, 1 ).toUpperCase() + str.substring( 1 )
	
	}
	replacePlaceholders( inputString: string, replacements: {[key: string]: string} ) {

		// Crear una expresión regular para buscar todas las ocurrencias de '{{texto}}'
		const regex = /\{\{([^}]+)\}\}/g
    
		// Función de reemplazo que busca la cadena dentro de los corchetes dobles y la reemplaza
		const replacer = ( _: unknown, placeholder: string ) => replacements[placeholder] || ''
    
		// Realizar el reemplazo de todas las ocurrencias de '{{texto}}' en la cadena de entrada
		return inputString.replace( regex, replacer )
	
	}

}
export class VarObj {

	async validateWithSchema( data: unknown, schema: Schema | JSONSchemaType<unknown>, verbose: boolean = false ){

		const ajv      = new Ajv()
		const validate = ajv.compile( schema )
		const valid    = validate( data )
        
		if ( !valid ) {

			const errors = validate.errors?.map( ( error: ErrorObject ) => {
                
				return {
					instancePath : error.instancePath,
					message      : error.message,
				}
			
			} )

			const errorString = verbose ? JSON.stringify( validate.errors, null, 2 ) : JSON.stringify( errors )
			throw new Error( `Object validation error: ${errorString}` )
		
		}
        
	}

}

export class Vars {

	string = new VarString()
	object = new VarObj()

}
