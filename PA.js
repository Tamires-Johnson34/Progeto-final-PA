verificadorPa = (pas, pad);

fClassificacaoPa = verificadorPa => {
  if ((pas <= 120) & (pad <= 80)) {
    return 'Parabens voce não tem Hipertensão';
  } else if ((pas < 120 - 139) & (pad <= 80 - 89)) {
    return 'Fique em alerta!!! voce está Pré Hipertenso, mude seus hábitos alimentares';
  } else if ((pas >= 140 - 159) & (pad >= 90 - 99)) {
    return 'hiprtenso estagio I, procure um médico';
  } else if ((pas > 160) & (pad > 100)) {
    return 'Atenção!!! hipertenso estagio II, sua saude está muito comprometida';
  }
};

module.exports = async function (context, req) {
  let nomeUsuario = String(req.query.nome);
  let pasUsuario = Number(req.query.pas);
  let padUsuario = Number(req.query.pad);

  if (isNaN(pasUsuario) || isNaN(padUsuario)) {
    return context.res
      .status(400)
      .send(
        'Formato de dados incorreto, o campo pas e pad aceitam somente numeros.'
      );
  }

  let PressaoArterialUsuario = fverificadorPa(pasUsuario, padUsuario);
  let classificacaoPaUsuario = fClassificacaoPa(PressaoArterialUsuario);

  context.res.json({
    nome: nomeUsuario,
    pas: pasUsuario,
    pad: padUsuario,
    fClassificacaoPa: classificacaoPaUsuario,
  });
};
