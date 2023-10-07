const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const validateMail = (target, name, value) => {
  if (name === 'email' && value.length === 0) {
    target.setCustomValidity('');
    return false;
  } else if (name === 'email' && !re.test(value)) {
    target.setCustomValidity('Email введен неверно');
    return false;
  } else if (name === 'email' && re.test(value)) {
    target.setCustomValidity('');
    return true;
  }
}

const validateName = (target, name, value) => {
  if (name === 'name' && value.length === 0) {
    target.setCustomValidity('');
    return false;
  } else if (name === 'name' && value.length < 2) {
    target.setCustomValidity('Слишком короткое имя');
    return false;
  } else if (name === 'name' && value.length > 30) {
    target.setCustomValidity('Слишком длинное имя');
    return false;
  } else if (name === 'name' && value.length >= 2 && value.length <= 30) {
    target.setCustomValidity('');
    return true;
  }
}

const validatePassword = (target, name, value) => {
  if (name === 'password' && value.length === 0) {
    target.setCustomValidity('');
    return false;
  } else if (name === 'password' && value.length < 4) {
    target.setCustomValidity('Слишком короткий пароль');
    return false;
  } else if (name === 'password' && value.length >= 4) {
    target.setCustomValidity('');
    return true;
  }
}

export {validateMail, validateName, validatePassword}