// const BadRequest = require('../errors/BadRequest');

// const PlacaDuplicate = (payload) => {
//   const PlacaArray = [];

//   payload.forEach((element) => {
//     const { placa } = element;
//     if (PlacaArray.includes(placa)) {
//       throw new BadRequest('Conflict', `You are trying register a duplicated ${placa}.`);
//     }
//     PlacaArray.push(placa);
//   });
// };
// module.exports = PlacaDuplicate;
