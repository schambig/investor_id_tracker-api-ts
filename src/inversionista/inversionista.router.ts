import express, { query } from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as InversionistaService from "./inversionista.service";

export const inversionistaRouter = express.Router();

// GET: List of all Inversionistas
inversionistaRouter.get("/", async (request: Request, response: Response) => {
  try {
    const inversionistas = await InversionistaService.listInversionistas()
    return response.status(200).json(inversionistas)
  } catch (error: any) {
    return response.status(500).json(error.message)
  }
})

// GET: A single inversionista by id
inversionistaRouter.get("/:id", async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    const inversionista = await InversionistaService.getInversionista(id)
    if (inversionista) {
      return response.status(200).json(inversionista);
    }
    return response.status(404).json("Inversionista could not be found")
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
})

// POST: Create an Inversionista
// Params: nombre, apPaterno, apMaterno, nroDocumento, pep
// We will check our Params using express-validator
inversionistaRouter.post(
  "/",
  body("nombre").isString(),
  body("apPaterno").isString,
  body("apMaterno").isString,
  body("nroDocumento").isNumeric,
  body("pep").isBoolean,
  async(request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const inversionista = request.body
      const newInversionista = await InversionistaService.createInversionista(inversionista)
      return response.status(201).json(newInversionista)
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  })
