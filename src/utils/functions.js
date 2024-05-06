const compareUserName = (name, surname) => {
  const nameControll = name ? name : '';
  const surnameControll = surname ? surname : '';

  return `${nameControll} ${surnameControll}`;
};

export {compareUserName};
