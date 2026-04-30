import { z } from 'zod';

export const schemaConsulte = z.object({
    pacient: z.object({
        nome: z.array(z.string()).default([]),
        idade: z.number().int().min(1).max(120),
        peso: z.number().optional(),
        sexo: z.array(z.string()).default([]),
        comorbilidade: z.array(z.string()).default([])
    }),
    queixa_principla: z.string().min(5, "Descreva a comorbilidade"),
    possivel_diagnostico: z.string().min(5),
    regiao_afetada: z.string().min(5),
    ja_fez_tratamento: z.string().min(5),
    observacao: z.string().optional()
})

// Tipo TypeScript inferido automaticamente do schema Zod

export type ConsultaInput = z.infer<typeof schemaConsulte>