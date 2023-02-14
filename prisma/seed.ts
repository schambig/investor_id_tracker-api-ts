import { db } from "../src/utils/db.server";

type Inversionista = {
  nombre: string,
  apPaterno: string,
  apMaterno: string,
  nroDocumento: number,
  pep: boolean
};

type DocumentoId = {
  tipoDoc: string,
  descripcion: string
};

// this function creates all of our inversionistas
async function seed() {
  await Promise.all(
    getInversionista().map((inversionista) => {
      return db.inversionista.create({
        data: {
          nombre: inversionista.nombre,
          apPaterno: inversionista.apPaterno,
          apMaterno: inversionista.apMaterno,
          nroDocumento: inversionista.nroDocumento,
          pep: inversionista.pep
        }
      })
    })
  )
  const inversionista = await db.inversionista.findFirst({
    where: {
      nombre: "James",
    }
  })

  await Promise.all(
    getDocumentoId().map((documentoId) => {
      const { tipoDoc, descripcion } = documentoId;
      return db.documentoId.create({
        data: {
          tipoDoc,
          descripcion,
          inversionistaId: inversionista?.id
        },
      })
    })
  )
};

seed();

function getInversionista(): Inversionista[] {
  return [
    {
      nombre: "James",
      apPaterno: "Holden",
      apMaterno: "Smith",
      nroDocumento: 90524684,
      pep: true
    },
    {
      nombre: "Naomi",
      apPaterno: "Nagata",
      apMaterno: "Beltalo",
      nroDocumento: 98568471,
      pep: true
    },
    {
      nombre: "Amos",
      apPaterno: "Burton",
      apMaterno: "Brave",
      nroDocumento: 72589756,
      pep: false
    }
  ];
};

function getDocumentoId(): DocumentoId[] {
  return [
    {
      tipoDoc: "dni",
      descripcion: ""
    },
    {
      tipoDoc: "carnet de extranjeria",
      descripcion: ""
    },
    {
      tipoDoc: "pasaporte",
      descripcion: ""
    }
  ];
};
