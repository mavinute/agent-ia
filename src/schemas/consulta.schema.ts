import { z } from 'zod';

export const consultaSchema = z.object({
  paciente: z.object({
    nome: z.string().optional(),
    idade: z.number().int().min(1).max(120),
    peso: z.number().optional(),
    alergias: z.array(z.string()).default([]),
    comorbidades: z.array(z.string()).default([]),
    gestante: z.boolean().default(false),
  }),
  queixa_principal: z.string().min(5, 'Descreva a queixa principal'),
  possivel_diagnostico: z.string().min(3),
  regiao_afetada: z.string().optional(),
  ja_fez_tratamento: z.boolean().default(false),
  observacoes: z.string().optional(),
})

export type ConsultaInput = z.infer<typeof consultaSchema>