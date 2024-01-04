export const removeDiacritics = async (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export const  removeSpacesBetweenWords= async (str) => {
  return str.replace(/\s/g, '');
}

