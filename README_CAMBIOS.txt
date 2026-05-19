CAMBIOS APLICADOS

1. Se excluyen todos los lotes menores o iguales a 1000050000.
   Ejemplo: lote 1000039552 NO se considera.

2. En el Ranking de urgencias se excluyen las filas donde el comentario contenga "vencido".
   Ejemplo: "Motivo: 1003 | Vencido" ya no aparecerá en urgencias.

3. Se deja un filtro separado para revisar esos casos:
   filtrarSoloVencidosComentario(data)

Dónde aplicarlo:
- Usa filtrarRankingUrgencias(datosProcesados) para la tabla Ranking de urgencias.
- Usa filtrarSoloVencidosComentario(datosProcesados) para un apartado/filtro llamado "Vencidos por comentario".
