function delete_task(task_id) {
    let url = "/" + task_id;
    $.ajax({
        url: url,
        type: 'DELETE',
        success: function () {
            window.location.reload();
        }
    });
}

function edit_task(task_id) {
    //lock delete button
    let identifier_delete = '#delete_' + task_id;
    $(identifier_delete).remove();

    //replace edit with button "save
    let identifier_edit = "#edit_" + task_id;
    let save_tag = "<button id='save_" + task_id + "'>Save</button>";
    $(identifier_edit).html(save_tag);
    let property_save_tag = "update_task(" + task_id + ")";
    $(identifier_edit).attr("onclick", property_save_tag);

    let current_tr_element = $(identifier_edit).parent().parent();
    let children = current_tr_element.children();
    let td_description = children[1];
    td_description.innerHTML = "<input id='input_description_" + task_id + "' type='text' value='" + td_description.innerHTML + "'>";

    let td_status = children[2];
    let status_id = "#select_status_" + task_id;
    let status_current_value = td_status.innerHTML;
    td_status.innerHTML = getDropdownStatusHTML(task_id);
    $(status_id).val(status_current_value).change();
}

function getDropdownStatusHTML(task_id) {
    let status_id = "select_status_" + task_id;
    return "<label for='status'></label>"
    + "<select id=" + status_id + " name='status'>"
    + "<option value='IN_PROGRESS'>IN_PROGRESS</option>"
    + "<option value='DONE'>DONE</option>"
    + "<option value='PAUSED'>PAUSED</option>"
    + "</select>"
}

function update_task(task_id) {
    let url = "/" + task_id;

    let value_description = $('#input_description_' + task_id).val();
    let value_status = $("#select_status_" + task_id).val();

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        async: false,
        data: JSON.stringify({"description": value_description, "status": value_status})
    });

    setTimeout(() => {
        document.location.reload();
    }, 300);
}

function add_task() {
    let value_description = $("#description_new").val();
    let value_status = $("#status_new").val();

    $.ajax({
        url: "/",
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        async: false,
        data: JSON.stringify({"description": value_description, "status": value_status})
    });

    setTimeout(() => {
        document.location.reload();
    }, 300);
}

















