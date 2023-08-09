const deleteProduct = (btn) => {
  const productId = btn.parentNode.querySelector('[name=productId]').value;
  const csrfToken = btn.parentNode.querySelector('[name=_csrf]').value;

  fetch(`/admin/product/${productId}`, {
    method: 'DELETE',
    headers: { 'csrf-token': csrfToken },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
};
