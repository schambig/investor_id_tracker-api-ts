import { db } from "../utils/db.server";

type Inversionista = {
  id: number,
  nombre: string,
  apPaterno: string,
  apMaterno: string,
  nroDocumento: number,
  pep: boolean
}

// to exclude a property cast it as any inside select object:
// nombre: <any>true,

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
      id, // this is the same than id: id, because we use tha same word as parameter
    }
    // select: {
    //   id: true,
    //   nombre: true,
    //   apPaterno: true,
    //   apMaterno: true,
    //   nroDocumento: true,
    //   pep: true
    // }
  })
}

export const createInversionista = async(inversionista: Omit<Inversionista, "id">): Promise<Inversionista> => {
  const { nombre, apPaterno, apMaterno, nroDocumento, pep } = inversionista;
  return db.inversionista.create({
    data: {
      nombre,
      apPaterno,
      apMaterno,
      nroDocumento,
      pep
    },
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

export const updateInversionista = async (inversionista: Omit<Inversionista, "id">, id: number): Promise<Inversionista> => {
  const { nombre, apPaterno, apMaterno, nroDocumento, pep} = inversionista;
  return db.inversionista.update({
    where: {
      id,
    },
    data: {
      nombre,
      apPaterno,
      apMaterno,
      nroDocumento,
      pep
    },
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

export const deleteInversionista  = async (id: number): Promise<void> => {
  await db.inversionista.delete({
    where: {
      id,
    }
  })
}
