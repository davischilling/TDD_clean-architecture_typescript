import { addAlias } from 'module-alias'
import { resolve } from 'path'

addAlias('@', resolve('dist'))

/* Importar este arquivo em (@/main/api/index.ts) */
