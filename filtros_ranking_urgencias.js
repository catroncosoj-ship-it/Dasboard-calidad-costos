// === FILTROS ACTUALIZADOS PARA RANKING DE URGENCIAS ===
// Reglas solicitadas:
// 1) Considerar SOLO lotes mayores a 1000050000.
// 2) En Ranking de urgencias NO mostrar filas cuyo comentario contenga "vencido".
// 3) Los vencidos por comentario quedan disponibles para verlos en otro filtro/apartado.

const normalizarNumero = (valor) => {
  if (valor === null || valor === undefined || valor === "") return 0;
  return Number(String(valor).replace(/\./g, "").replace(",", ".")) || 0;
};

const normalizarTexto = (valor) =>
  String(valor || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

// Detecta lote desde distintas columnas posibles
const obtenerLote = (row) => {
  return normalizarNumero(
    row["Lote"] ||
    row["Nº lote"] ||
    row["N° lote"] ||
    row["Batch"] ||
    row["LOTE"] ||
    0
  );
};

const obtenerComentario = (row) => {
  return normalizarTexto(
    row["Comentario"] ||
    row["Comentarios"] ||
    row["Texto"] ||
    row["Motivo"] ||
    ""
  );
};

// Base general del dashboard: elimina lotes antiguos
const filtrarLotesValidos = (data) => {
  return data.filter((row) => obtenerLote(row) > 1000050000);
};

// Ranking de urgencias: excluye lotes antiguos y comentarios con "vencido"
const filtrarRankingUrgencias = (data) => {
  return data.filter((row) => {
    const lote = obtenerLote(row);
    const comentario = obtenerComentario(row);

    const loteValido = lote > 1000050000;
    const comentarioVencido = comentario.includes("vencido");

    return loteValido && !comentarioVencido;
  });
};

// Filtro/apartado separado para revisar los vencidos por comentario
const filtrarSoloVencidosComentario = (data) => {
  return data.filter((row) => {
    const lote = obtenerLote(row);
    const comentario = obtenerComentario(row);

    return lote > 1000050000 && comentario.includes("vencido");
  });
};

// Ejemplo de uso:
// const datosValidos = filtrarLotesValidos(datosProcesados);
// const rankingUrgencias = filtrarRankingUrgencias(datosProcesados);
// const vencidosComentario = filtrarSoloVencidosComentario(datosProcesados);

export {
  filtrarLotesValidos,
  filtrarRankingUrgencias,
  filtrarSoloVencidosComentario,
  obtenerLote,
  obtenerComentario,
};
