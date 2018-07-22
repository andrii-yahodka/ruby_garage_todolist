$(document).ready(function() {
  create();

  $(document).on('click', '.btn-open-edit-project-modal-js', function() {
    let modal = $('#edit_project_modal');

    let form = $(this).closest('.edit-project-form-js');
    let project_name = form.closest('.project-container-js').find('.panel-title');
    let action = form.attr('action');
    $.ajax({
      url: action,
      type: 'GET',
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      },
      success: function (data) {
        modal.append(data.contents);

        $('.btn-update-project-js').click(function() {
          let new_project_name = $('input[name=update_project_name]').val();
          let action = $('.update-project-form-js').attr('action');
          let method = 'PUT';
          let data = {
            name: new_project_name
          };
          ajaxRequest(action, method, data, handleUpdateResponse(project_name, new_project_name, modal));
        });
        emptyHiddenModal(modal);
      }
    });
  });

  $(document).on('click', '.btn-destroy-project-js', function() {
    let form = $(this).closest('.destroy-project-form-js');
    let action = form.attr('action');
    let method = 'DELETE';
    let project_container = this.closest('.project-container-js');
    ajaxRequest(action, method, null, handleDestroyResponse(project_container));
  });
});

function create() {
  $('.btn-open-create-project-modal-js').click(function() {
    let action = $('.create-project-form-js').attr('action');
    let modal = $('#create_project_modal');
    $.ajax({
      url: action,
      type: 'GET',
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      },
      success: function (data) {
        modal.append(data.contents);
        store();
        $('.btn-store-project-js').on('click',function() {
          let projects_container = $('.todolist-projects-container-js');
          let project_name = $('input[name=store_project_name]').val();
          let action = $('.store-project-form-js').attr('action');
          $.ajax({
            url: action,
            type: 'POST',
            data: {
              name: project_name
            },
            headers: {
              'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (data) {
              projects_container.append(data.contents);
              hideModal(modal);
            }
          });
        });
        emptyHiddenModal(modal);
      }
    });
  });
}