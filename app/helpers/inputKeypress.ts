

export const handleKeypress = (e: KeyboardEvent, type = "numeric") => {
  const keyCode = e.which ? e.which : e.keyCode;
  switch (type) {
    case "numeric":
      if (!(keyCode >= 48 && keyCode <= 57)) e.preventDefault();
      break;
    case "character":
      if (keyCode >= 48 && keyCode <= 57) e.preventDefault();
      break;
    case "regex": {
      const regex = /^[A-Za-z0-9]+$/;
      const isValid = regex.test(String.fromCharCode(keyCode));
      if (!isValid) e.preventDefault();
      break;
    }
  }
};