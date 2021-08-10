import { addAlias } from 'module-alias'
import { resolve } from 'path'

addAlias('@', resolve('dist'))

/* Importar este arquivo no arquivo
// inicial da aplicação (@/main/api/index.ts) */
