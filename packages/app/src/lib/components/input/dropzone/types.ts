export type DropzoneValue = FileList | undefined
export type DropzoneValidate = ( v: DropzoneValue ) => Promise<boolean>
