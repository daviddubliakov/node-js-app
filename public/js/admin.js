const deleteProduct = (btn) => {
  const productId = btn.parentNode.querySelector('[name=productId]').value;
  const csrfToken = btn.parentNode.querySelector('[name=_csrf]').value;
  const proudctElement = btn.closest('article');

  fetch(`/admin/product/${productId}`, {
    method: 'DELETE',
    headers: { 'csrf-token': csrfToken },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      proudctElement.parentNode.removeChild(proudctElement);
    })
    .catch((err) => console.log(err));
};
