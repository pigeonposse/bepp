
import {
	createLiteralObjectValues, validate, 
} from '../_shared/validate'
import { factsLang } from './const'

// @ts-ignore
// const langIdQuerySchema = validate.enum( Object.values( webFactLang ) )
export const langId = createLiteralObjectValues( factsLang )
const params = validate.object( {
	lang : langId
		.optional()
		.default( factsLang.en )
		.describe( `Select language ${Object.values( factsLang )}` ),
} )

const webFactDataSchema = validate.object( {
	phrase : validate.string(),
	link   : validate.string(),
} )

export const random = {
	params,
	response : webFactDataSchema,
}
export const allData = validate.object( {
	[factsLang.es] : validate.array( webFactDataSchema ),
	[factsLang.ca] : validate.array( webFactDataSchema ),
	[factsLang.en] : validate.array( webFactDataSchema ),
} )
export const all = {
	params,
	response : validate.array( webFactDataSchema ),
}
