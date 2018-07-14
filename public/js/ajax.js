function ajaxRequest(action, method, data, handleResponse, field = null) {
  $.ajax({
    url: action,
    type: method,
    data: data,
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    },
    success: function (data) {
      handleResponse;
    }
  });
}

function hideModal(modal_id) {
  $(modal_id).empty();
  $(modal_id).modal('hide');
}

function emptyHiddenModal(modal_id) {
  $(modal_id).on('hidden.bs.modal', function () {
    $(modal_id).empty();
  });
}
