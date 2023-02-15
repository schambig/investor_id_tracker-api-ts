import { db } from "../utils/db.server";

type Inversionista = {
  id: number,
  nombre: string,
  apPaterno: string,
  apMaterno: string,
  nroDocumento: number,
  pep: boolean
}

export const listInversionistas = async (): Promise<Inversionista[]> => {
  return db.inversionista.findMany({
    select: {
      id: true,
      nombre: true,
      apPaterno: true,
      apMaterno: true,
      nroDocumento: true,
      pep: true
    }
  })
}

export const getInversionista = async (id: number): Promise<Inversionista | null> => {
  return db.inversionista.findUnique({
    where: {
      id, // this is tha same that id: id,
    },
    // select: { we could select only the properties that we want
    //   id: true,
    //   nombre: true,
    //   apPaterno: true,
    //   apMaterno: true,
    //   nroDocumento: true,
    //   pep: true
    // }
  })
}
